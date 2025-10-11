from rest_framework.routers import DefaultRouter
from django.urls import path, include
from users.views import CountryViewSet, DistrictViewSet
from electricity.views import ElectricityBillViewSet, ElectricDeviceViewSet, DeviceUsageViewSet
from transport.views import VehicleViewSet, VehicleUsageViewSet

router = DefaultRouter()

router.register('countries', CountryViewSet)
router.register('districts', DistrictViewSet)

router.register('electricity-bills', ElectricityBillViewSet, basename='electricity-bill')
router.register('devices', ElectricDeviceViewSet, basename='device')
router.register('device-usages', DeviceUsageViewSet, basename='device-usage')

router.register('vehicles', VehicleViewSet, basename='vehicle')
router.register('vehicle-usages', VehicleUsageViewSet, basename='vehicle-usage')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
