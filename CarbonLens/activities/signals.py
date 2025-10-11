from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import ActivityRecord


@receiver([post_save, post_delete], sender=ActivityRecord)
def update_user_activity_emission(sender, instance, **kwargs):
    """
    Automatically update user's total CO₂ emissions when an activity record changes.
    """
    user = instance.user
    user.update_total_co2()
