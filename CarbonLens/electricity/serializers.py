from rest_framework import serializers
from .models import ElectricityBill, ElectricDevice, DeviceUsage

EMISSION_FACTOR = 0.475

class DeviceUsageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeviceUsage
        fields = ['id', 'device', 'date', 'hours_used', 'kwh_used', 'co2_emission']
        read_only_fields = ['kwh_used', 'co2_emission']
        validators = []

    def validate_device(self, value):
        """
        Ensure the selected device belongs to the authenticated user.
        Safe for swagger schema generation (AnonymousUser).
        """
        request = self.context.get('request', None)
        user = getattr(request, 'user', None)

        # ✅ Skip validation during schema generation or unauthenticated access
        if not user or user.is_anonymous:
            return value

        # ✅ Normal API validation
        if value.user != user:
            raise serializers.ValidationError("This device does not belong to you.")
        return value
    
    def create(self, validated_data):
        device = validated_data['device']
        date = validated_data['date']
        hours_used = validated_data['hours_used']

        # Check for an existing record with same device/date
        existing_usage = DeviceUsage.objects.filter(device=device, date=date).first()

        if existing_usage:
            # Merge usage — add hours and recalculate
            existing_usage.hours_used += hours_used
            existing_usage.kwh_used = round((device.wattage * existing_usage.hours_used) / 1000, 3)
            existing_usage.co2_emission = round(existing_usage.kwh_used * EMISSION_FACTOR, 3)
            existing_usage.save()
            return existing_usage

        # If not found, create a new record
        return super().create(validated_data)
    

class ElectricDeviceSerializer(serializers.ModelSerializer):
    usages = DeviceUsageSerializer(many=True, read_only=True)

    class Meta:
        model = ElectricDevice
        fields = ['id', 'name', 'wattage', 'description', 'usages']


class ElectricityBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElectricityBill
        fields = ['id', 'bill_date', 'total_kwh', 'total_co2']
        read_only_fields = ['total_co2']

    def create(self, validated_data):
        bill = ElectricityBill.objects.create(**validated_data)
        bill.calculate_emission()
        return bill
