from django.db import models
from django.contrib.auth.models import AbstractUser


class Country(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class District(models.Model):
    name = models.CharField(max_length=200)

    country = models.ForeignKey(
        Country, 
        on_delete=models.CASCADE,
        related_name="district"
    )

    def __str__(self):
        return self.name
    

class User(AbstractUser):
    country = models.ForeignKey(
        Country,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users"
    )

    district = models.ForeignKey(
        District,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users"
    )

    def __str__(self):
        return self.get_full_name()
