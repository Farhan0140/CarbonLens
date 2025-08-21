
from django.db.models.signals import post_save
from django.dispatch import receiver

from users.models import Guest_User

@receiver(post_save, sender=Guest_User)
def set_guest_user_name(sender, instance, created, **kwargs):
    if created:
        instance.name = f"guestUser_{instance.pk}"
        instance.save(update_fields=['name'])