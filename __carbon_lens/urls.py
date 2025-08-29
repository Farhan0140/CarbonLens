
from django.contrib import admin
from django.urls import path, include
from debug_toolbar.toolbar import debug_toolbar_urls


from activity.views import Dashboard

urlpatterns = [
    path('', Dashboard, name='dashboard'),
    path('admin/', admin.site.urls),
    path('user/', include("users.urls"))
] + debug_toolbar_urls()

