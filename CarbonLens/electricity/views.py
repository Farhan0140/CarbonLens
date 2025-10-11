from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated

from .models import ElectricityBill, ElectricDevice, DeviceUsage
from .serializers import (
    ElectricityBillSerializer,
    ElectricDeviceSerializer,
    DeviceUsageSerializer,
)


class ElectricityBillViewSet(viewsets.ModelViewSet):
    serializer_class = ElectricityBillSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # ✅ Prevent crash when Swagger loads (AnonymousUser)
        if not user or user.is_anonymous:
            return ElectricityBill.objects.none()
        return ElectricityBill.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ElectricDeviceViewSet(viewsets.ModelViewSet):
    serializer_class = ElectricDeviceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # ✅ Prevent crash when Swagger loads (AnonymousUser)
        if not user or user.is_anonymous:
            return ElectricDevice.objects.none()
        # ✅ Only show devices belonging to the logged-in user
        return ElectricDevice.objects.filter(user=user)

    def perform_create(self, serializer):
        # ✅ Auto-assign current user to created device
        serializer.save(user=self.request.user)


class DeviceUsageViewSet(viewsets.ModelViewSet):
    serializer_class = DeviceUsageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user or user.is_anonymous:
            return DeviceUsage.objects.none()

        # ✅ Handle nested route: /devices/<device_id>/usages/
        device_id = self.kwargs.get('device_pk')
        queryset = DeviceUsage.objects.filter(device__user=user)

        if device_id:
            queryset = queryset.filter(device_id=device_id)

        return queryset

    def perform_create(self, serializer):
        """
        ✅ Automatically attach device from the nested route (if present)
        and ensure only the current user can add usage for their own devices.
        """
        device_id = self.kwargs.get('device_pk')
        if device_id:
            serializer.save(device_id=device_id)
        else:
            serializer.save()
