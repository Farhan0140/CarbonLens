from rest_framework import serializers
from .models import Country, District, User

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ['id', 'name']

class CountryWithUserDistrictSerializer(serializers.ModelSerializer):
    district = serializers.SerializerMethodField()

    class Meta:
        model = Country
        fields = ['id', 'name', 'district']

    def get_district(self, obj):
        user = self.context.get('user')
        if user and user.district and user.district.country == obj:
            return DistrictSerializer(user.district).data
        return None

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']

class DistrictCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ['id', 'name', 'country']

class UserSerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'country', 'is_staff']
        read_only_fields = ['is_staff', 'country']

    def get_country(self, obj):
        return CountryWithUserDistrictSerializer(
            obj.country,
            context={'user': obj}
        ).data
