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
    
    def clean(self):
        # Optional: case-insensitive uniqueness
        if District.objects.filter(
            name__iexact=self.name.strip(),
            country=self.country
        ).exclude(pk=self.pk).exists():
            raise ValidationError(f"District '{self.name}' already exists in {self.country.name}.")
    

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

    total_co2_emission = models.FloatField(default=0.0)

    total_from_electricity = models.FloatField(default=0.0)
    total_from_vehicles = models.FloatField(default=0.0)
    total_from_activities = models.FloatField(default=0.0)

    def __str__(self):
        return self.get_full_name()
    
    def update_total_co2(self):
        """
        Recalculate user's total CO₂ emission
        based on ElectricityBill and DeviceUsage models.
        """
        from electricity.models import ElectricityBill, DeviceUsage 
        from transport.models import VehicleUsage
        from activities.models import ActivityRecord
        from django.db.models import Sum

        total_from_bills = ElectricityBill.objects.filter(user=self).aggregate(Sum('total_co2'))['total_co2__sum'] or 0
        total_from_usages = DeviceUsage.objects.filter(device__user=self).aggregate(Sum('co2_emission'))['co2_emission__sum'] or 0
        total_from_electricity = total_from_bills + total_from_usages

        total_from_vehicles = VehicleUsage.objects.filter(vehicle__user=self).aggregate(Sum('co2_emission'))['co2_emission__sum'] or 0
        
        total_from_activities = ActivityRecord.objects.filter(user=self).aggregate(Sum('co2_emission'))['co2_emission__sum'] or 0

        self.total_from_electricity = round(total_from_electricity, 3)
        self.total_from_vehicles = round(total_from_vehicles, 3)
        self.total_from_activities = round(total_from_activities, 3)

        self.total_co2_emission = round(total_from_bills + total_from_usages + total_from_vehicles + total_from_activities, 3)
        self.save(update_fields=[
            'total_from_electricity',
            'total_from_vehicles',
            'total_from_activities',
            'total_co2_emission'
        ])
