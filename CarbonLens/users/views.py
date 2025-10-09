from rest_framework import viewsets
from .models import Country, District, User
from .serializers import (
    CountrySerializer,
    DistrictSerializer,
    DistrictCreateSerializer,
    UserSerializer
)

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class DistrictViewSet(viewsets.ModelViewSet):
    queryset = District.objects.select_related('country').all()

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return DistrictSerializer
        return DistrictCreateSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.select_related('country', 'district').all()
    serializer_class = UserSerializer
