from rest_framework import viewsets, permissions
from users.models import Country, District
from users.models import User
from users.serializers import CountrySerializer, DistrictSerializer
from users.serializers import UserSerializer
from core.permissions import IsAdminOrReadOnly


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [IsAdminOrReadOnly]


class DistrictViewSet(viewsets.ModelViewSet):
    serializer_class = DistrictSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        """
        If accessed via /countries/<country_id>/districts/,
        only return districts in that country.
        """
        country_id = self.kwargs.get('country_pk')
        if country_id is not None:
            return District.objects.filter(country__id=country_id)
        return District.objects.all()

    def perform_create(self, serializer):
        """
        Automatically set the country if we're in a nested route.
        """
        country_id = self.kwargs.get('country_pk')
        if country_id:
            serializer.save(country_id=country_id)
        else:
            serializer.save()


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Filters users based on nested routes:
        - /countries/<country_id>/users/
        - /countries/<country_id>/districts/<district_id>/users/
        """
        queryset = User.objects.all()
        country_id = self.kwargs.get('country_pk')
        district_id = self.kwargs.get('district_pk')

        if country_id:
            queryset = queryset.filter(country_id=country_id)
        if district_id:
            queryset = queryset.filter(district_id=district_id)
        return queryset

    def perform_create(self, serializer):
        """
        Automatically assign country/district from nested route.
        """
        country_id = self.kwargs.get('country_pk')
        district_id = self.kwargs.get('district_pk')
        serializer.save(country_id=country_id, district_id=district_id)
