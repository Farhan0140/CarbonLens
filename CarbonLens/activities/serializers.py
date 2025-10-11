from rest_framework import serializers
from .models import Activity, ActivityRecord


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'name', 'category', 'unit', 'emission_factor']


class ActivityRecordSerializer(serializers.ModelSerializer):
    activity_name = serializers.ReadOnlyField(source='activity.name')
    unit = serializers.ReadOnlyField(source='activity.unit')

    class Meta:
        model = ActivityRecord
        fields = ['id', 'activity', 'activity_name', 'unit', 'date', 'quantity', 'co2_emission']
        read_only_fields = ['co2_emission', 'activity_name', 'unit']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
