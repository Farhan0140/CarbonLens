from rest_framework import viewsets
from .models import Country, District
from .serializers import (
    CountrySerializer,
    DistrictSerializer,
    DistrictCreateSerializer,
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
