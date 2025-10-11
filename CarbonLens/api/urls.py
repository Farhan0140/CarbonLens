from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from django.urls import path, include
from users.views import CountryViewSet, DistrictViewSet, UserViewSet
from electricity.views import ElectricityBillViewSet, ElectricDeviceViewSet, DeviceUsageViewSet
from transport.views import VehicleViewSet, VehicleUsageViewSet
from activities.views import ActivityViewSet, ActivityRecordViewSet


# router.register('electricity-bills', ElectricityBillViewSet, basename='electricity-bill')   ---> Use it if needed


# router.register('activities', ActivityViewSet, basename='activity')
# router.register('activity-records', ActivityRecordViewSet, basename='activity-record')

router = routers.SimpleRouter()
router.register('countries', CountryViewSet, basename='countries')
router.register('devices', ElectricDeviceViewSet, basename='devices')
router.register('vehicles', VehicleViewSet, basename='vehicle')
router.register('activities', ActivityViewSet, basename='activity')

countries_router = routers.NestedSimpleRouter(router, 'countries', lookup='country')
countries_router.register('districts', DistrictViewSet, basename='country-districts')
countries_router.register('users', UserViewSet, basename='country-users')

districts_router = routers.NestedSimpleRouter(countries_router, 'districts', lookup='district')
districts_router.register('users', UserViewSet, basename='district-users')

devices_router = routers.NestedSimpleRouter(router, 'devices', lookup='device')
devices_router.register('usages', DeviceUsageViewSet, basename='device-usages')

vehicles_router = routers.NestedSimpleRouter(router, 'vehicles', lookup='vehicle')
vehicles_router.register('usages', VehicleUsageViewSet, basename='vehicle-usages')

activities_router = routers.NestedSimpleRouter(router, 'activities', lookup='activity')
activities_router.register('records', ActivityRecordViewSet, basename='activity-records')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),

    path('', include(countries_router.urls)),
    path('', include(districts_router.urls)),

    path('', include(devices_router.urls)),

    path('', include(vehicles_router.urls)),
    
    path('', include(activities_router.urls)),
]
