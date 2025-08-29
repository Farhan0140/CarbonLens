
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.tokens import default_token_generator
from django.conf import settings
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from users.models import Guest_User, User

@receiver(post_save, sender=Guest_User)
def set_guest_user_name(sender, instance, created, **kwargs):
    if created:
        instance.name = f"guestUser_{instance.pk}"
        instance.save(update_fields=['name'])


# @receiver(post_save, sender=User)
# def send_activation_mail(sender, instance, created, **kwargs):
#     if created:
#         token = default_token_generator.make_token(instance)
#         activation_url = f"{settings.FRONTEND_URL}/user/activate/{instance.id}/{token}/"
#         subject = 'Activate Your Account By Clicking The Given Link'
#         message = f"Hi! {instance.first_name} {instance.last_name} <br><br> please activate your account by clicking the link below\n{activation_url}\n\nThank You...."

#         try:
#             send_mail(
#                 subject,
#                 message,
#                 settings.EMAIL_HOST_USER,
#                 [instance.email],
#                 fail_silently = False,
#             )
#         except Exception as e:
#             print(f"Failed To Send Email To {instance.email}: {str(e)}")


@receiver(post_save, sender=User)
def send_activation_mail(sender, instance, created, **kwargs):
    if created:
        token = default_token_generator.make_token(instance)
        activation_url = f"{settings.FRONTEND_URL}/user/activate/{instance.id}/{token}/"

        context = {
            "user": instance,
            "activation_url": activation_url,
            "year": 2025,
            "protocol": "https",
            "domain": settings.FRONTEND_URL,
        }

        html_content = render_to_string("mail/activation_mail.html", context)
        text_content = strip_tags(html_content)

        subject = "Activate Your Account"
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [instance.email]

        try:
            email = EmailMultiAlternatives(subject, text_content, from_email, recipient_list)
            email.attach_alternative(html_content, "text/html")
            email.send()
        except Exception as e:
            print(f"Failed to send email to {instance.email}: {str(e)}")