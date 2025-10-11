from rest_framework import viewsets, permissions
from .models import Vehicle, VehicleUsage
from .serializers import VehicleSerializer, VehicleUsageSerializer

class VehicleViewSet(viewsets.ModelViewSet):
    serializer_class = VehicleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user or user.is_anonymous:
            return Vehicle.objects.none()
        return Vehicle.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class VehicleUsageViewSet(viewsets.ModelViewSet):
    serializer_class = VehicleUsageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user or user.is_anonymous:
            return VehicleUsage.objects.none()
        return VehicleUsage.objects.filter(vehicle__user=user)
