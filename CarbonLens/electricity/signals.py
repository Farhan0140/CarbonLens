from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import ElectricityBill, DeviceUsage


@receiver([post_save, post_delete], sender=ElectricityBill)
def update_user_emission_from_bills(sender, instance, **kwargs):
    """
    Update user total CO₂ when ElectricityBill changes.
    """
    instance.user.update_total_co2()


@receiver([post_save, post_delete], sender=DeviceUsage)
def update_user_emission_from_device_usage(sender, instance, **kwargs):
    """
    Update user total CO₂ when DeviceUsage changes.
    """
    instance.device.user.update_total_co2()
