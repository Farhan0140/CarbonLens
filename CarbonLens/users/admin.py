from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Country, District


class CustomUserAdmin( UserAdmin ):
    model = User
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'country', 'district', 'total_co2_emission')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ("Important Date's", {'fields': ('last_login', 'date_joined')})
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'country', 'district', 'password1', 'password2', 'is_staff', 'is_active'),
        }),
    )

    list_display = (
        'username',
        'first_name',
        'last_name',
        'is_staff',
        'is_active'
    )

    search_fields = (
        'username',
        'first_name',
        'last_name',
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(Country)
admin.site.register(District)