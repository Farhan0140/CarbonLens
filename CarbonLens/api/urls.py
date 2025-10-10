from rest_framework.routers import DefaultRouter
from django.urls import path, include
from users.views import CountryViewSet, DistrictViewSet

router = DefaultRouter()

router.register('countries', CountryViewSet)
router.register('districts', DistrictViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
