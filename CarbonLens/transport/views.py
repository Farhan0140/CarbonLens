from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Vehicle, VehicleUsage, VEHICLE_TYPES, FUEL_TYPES
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
    
    @action(detail=False, methods=['get'], url_path='fuel_type', permission_classes=[AllowAny])
    def fuel_type(self, request):
        return Response([
            {"key": key, "label": label}
            for key, label in FUEL_TYPES
        ])
    
    @action(detail=False, methods=['get'], url_path='vehicle_type', permission_classes=[AllowAny])
    def vehicle_type(self, request):
        return Response([
            {"key": key, "label": label}
            for key, label in VEHICLE_TYPES
        ])


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
