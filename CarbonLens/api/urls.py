from rest_framework.routers import DefaultRouter
from django.urls import path, include
from users.views import CountryViewSet, DistrictViewSet, UserViewSet

router = DefaultRouter()

router.register('countries', CountryViewSet)
router.register('districts', DistrictViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
