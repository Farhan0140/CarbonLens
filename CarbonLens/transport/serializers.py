from rest_framework import serializers
from .models import Vehicle, VehicleUsage

class VehicleUsageSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleUsage
        fields = ['id', 'vehicle', 'date', 'distance_km', 'fuel_used', 'co2_emission']
        read_only_fields = ['fuel_used', 'co2_emission']
        validators = []  # disable default unique_together check to handle merging manually

    def validate_vehicle(self, value):
        user = self.context['request'].user
        if value.user != user:
            raise serializers.ValidationError("This vehicle does not belong to you.")
        return value

    def create(self, validated_data):
        vehicle = validated_data['vehicle']
        date = validated_data['date']
        distance_km = validated_data['distance_km']

        existing_usage = VehicleUsage.objects.filter(vehicle=vehicle, date=date).first()
        if existing_usage:
            # merge usage
            existing_usage.distance_km += distance_km
            existing_usage.save()
            return existing_usage

        return super().create(validated_data)


class VehicleSerializer(serializers.ModelSerializer):
    usages = VehicleUsageSerializer(many=True, read_only=True)

    class Meta:
        model = Vehicle
        fields = ['id', 'name', 'vehicle_type', 'fuel_type', 'mileage', 'total_co2_emission', 'usages']
        read_only_fields = ['total_co2_emission']


    def validate(self, attrs):
        user = self.context['request'].user
        name = attrs.get('name')
        mileage = attrs.get('mileage')

        # ✅ Case-insensitive check for duplicates
        if Vehicle.objects.filter(
            user=user,
            mileage=mileage,
            name__iexact=name  # <-- this ignores case
        ).exists():
            raise serializers.ValidationError(
                "You already have a vehicle with this name (case-insensitive) and mileage."
            )
        return attrs

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        # Optional: normalize name capitalization
        validated_data['name'] = validated_data['name'].strip().title()
        return super().create(validated_data)
