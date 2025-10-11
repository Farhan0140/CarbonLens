from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from .models import Vehicle, VehicleUsage
from .serializers import VehicleSerializer, VehicleUsageSerializer


class VehicleViewSet(viewsets.ModelViewSet):
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user or user.is_anonymous:
            return Vehicle.objects.none()
        return Vehicle.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class VehicleUsageViewSet(viewsets.ModelViewSet):
    serializer_class = VehicleUsageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user or user.is_anonymous:
            return VehicleUsage.objects.none()

        # ✅ Nested route support: /vehicles/<vehicle_id>/usages/
        vehicle_id = self.kwargs.get("vehicle_pk")
        queryset = VehicleUsage.objects.filter(vehicle__user=user)
        if vehicle_id:
            queryset = queryset.filter(vehicle_id=vehicle_id)
        return queryset

    def perform_create(self, serializer):
        """
        Auto-link usage to the vehicle if accessed via nested route.
        """
        vehicle_id = self.kwargs.get("vehicle_pk")
        if vehicle_id:
            serializer.save(vehicle_id=vehicle_id)
        else:
            serializer.save()
