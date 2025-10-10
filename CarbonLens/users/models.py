from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

class Country(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Countries"
        ordering = ['name']


class District(models.Model):
    name = models.CharField(max_length=200)

    country = models.ForeignKey(
        Country, 
        on_delete=models.CASCADE,
        related_name="district"
    )

    class Meta:
        unique_together = ('name', 'country')
        ordering = ['name']

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
    
    def clean(self):
        # Optional: case-insensitive uniqueness
        if District.objects.filter(
            name__iexact=self.name.strip(),
            country=self.country
        ).exclude(pk=self.pk).exists():
            raise ValidationError(f"District '{self.name}' already exists in {self.country.name}.")
