from rest_framework import serializers
from .models import Country, District, User
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer

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


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'country', 'district','password']
        ref_name = 'CustomUserCreateSerializer'


class UserSerializer( BaseUserSerializer ):
    class Meta( BaseUserSerializer.Meta ):
        ref_name = 'CustomUser'
        fields = ['id', 'username', 'first_name', 'last_name', 'country', 'district', 'is_staff', 'total_from_electricity', 'total_from_vehicles', 'total_co2_emission']
        read_only_fields = ['is_staff', 'username', 'country', 'district', 'total_co2_emission', 'total_from_electricity', 'total_from_vehicles']
        ref_name = 'CustomUserSerializer'