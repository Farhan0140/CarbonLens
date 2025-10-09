
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import api_root_view

schema_view = get_schema_view(
   openapi.Info(
      title="Carbon Lens",
      default_version='v1',
      description="This project calculates a person's carbon emissions and tracks their daily data, and gives suggestions on how to reduce the emissions. ",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="djangomama11@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', api_root_view),
    path('api/v1/', include("api.urls"), name='api-root'),
    path('api-auth/', include('rest_framework.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
