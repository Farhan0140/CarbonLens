from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .models import ElectricityBill, ElectricDevice, DeviceUsage
from .serializers import (
    ElectricityBillSerializer,
    ElectricDeviceSerializer,
    DeviceUsageSerializer,
)


class ElectricityBillViewSet(viewsets.ModelViewSet):
    serializer_class = ElectricityBillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # ✅ Prevent crash when Swagger loads (AnonymousUser)
        if not user or user.is_anonymous:
            return ElectricityBill.objects.none()
        return ElectricityBill.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ElectricDeviceViewSet(viewsets.ModelViewSet):
    serializer_class = ElectricDeviceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # ✅ Prevent crash when Swagger loads (AnonymousUser)
        if not user or user.is_anonymous:
            return ElectricDevice.objects.none()
        return ElectricDevice.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DeviceUsageViewSet(viewsets.ModelViewSet):
    queryset = DeviceUsage.objects.all()
    serializer_class = DeviceUsageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # ✅ If Swagger (AnonymousUser) is generating docs, return empty queryset
        if not user or user.is_anonymous:
            return DeviceUsage.objects.none()
        # ✅ Otherwise filter normally for logged-in user
        return self.queryset.filter(device__user=user)
