from rest_framework import viewsets
from .models import Country, District
from .serializers import (CountrySerializer, DistrictSerializer, DistrictCreateSerializer,)
from core.permissions import IsAdminOrReadOnly



class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [IsAdminOrReadOnly]


class DistrictViewSet(viewsets.ModelViewSet):
    queryset = District.objects.select_related('country').all()
    permission_classes = [IsAdminOrReadOnly]

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return DistrictSerializer
        return DistrictCreateSerializer
