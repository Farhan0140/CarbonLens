from django.contrib import admin
from electricity.models import ElectricityBill, ElectricDevice, DeviceUsage

admin.site.register(ElectricityBill)
admin.site.register(ElectricDevice)
admin.site.register(DeviceUsage)
