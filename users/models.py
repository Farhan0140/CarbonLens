from django.db import models
from django.contrib.auth.models import AbstractUser


from users.managers import CustomUserManager
from users import districts as dis


class User( AbstractUser ):
    username = None
    email = models.EmailField(unique=True)
    district = models.CharField(max_length=20, choices=dis.DISTRICT_CHOICES, default="DHAKA")

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []   

    def __str__(self):
        full_name = f"{self.first_name} {self.last_name}"
        return full_name 


class Guest_User(models.Model):
    name = models.CharField(max_length=200, blank=True, editable=False)
    district = models.CharField(max_length=20, choices=dis.DISTRICT_CHOICES, default="DHAKA")

    def __str__(self):
        return self.name
