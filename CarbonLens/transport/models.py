
from django.db import models
from django.conf import settings
from datetime import date
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

EMISSION_FACTORS = {
    'petrol': 2.31,
    'diesel': 2.68,
    'cng': 2.75,
    'electric': 0.475,
    'hybrid': 1.20,
}

FUEL_TYPES = [
    ('petrol', 'Petrol'),
    ('diesel', 'Diesel'),
    ('cng', 'CNG'),
    ('electric', 'Electric'),
    ('hybrid', 'Hybrid'),
]

VEHICLE_TYPES = [
    ('car', 'Car'),
    ('bike', 'Bike'),
    ('bus', 'Bus'),
    ('truck', 'Truck'),
    ('others', 'Others'),
]


class Vehicle(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='vehicles'
    )
    name = models.CharField(max_length=100)
    vehicle_type = models.CharField(max_length=20, choices=VEHICLE_TYPES)
    fuel_type = models.CharField(max_length=20, choices=FUEL_TYPES)
    mileage = models.FloatField(help_text="Km per liter or per kWh", default=15.0)
    total_co2_emission = models.FloatField(default=0.0)

    class Meta:
        unique_together = ('user', 'name', 'mileage')  # prevent duplicates
        verbose_name = "Vehicle"
        verbose_name_plural = "Vehicles"

    def __str__(self):
        return f"{self.name} ({self.fuel_type})"

    def update_total_emission(self):
        """Recalculate total CO₂ for this vehicle"""
        total = self.usages.aggregate(models.Sum('co2_emission'))['co2_emission__sum'] or 0
        self.total_co2_emission = round(total, 3)
        self.save(update_fields=['total_co2_emission'])


class VehicleUsage(models.Model):
    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        related_name='usages'
    )
    date = models.DateField(default=date.today)
    distance_km = models.FloatField(help_text="Distance traveled (km)")
    fuel_used = models.FloatField(default=0.0)
    co2_emission = models.FloatField(default=0.0)

    class Meta:
        unique_together = ('vehicle', 'date')  # prevent duplicates

    def __str__(self):
        return f"{self.vehicle.name} - {self.date}"

    def save(self, *args, **kwargs):
        factor = EMISSION_FACTORS.get(self.vehicle.fuel_type, 0)
        self.fuel_used = round(self.distance_km / self.vehicle.mileage, 3)
        self.co2_emission = round(self.fuel_used * factor, 3)
        super().save(*args, **kwargs)


# --- SIGNALS ---

@receiver([post_save, post_delete], sender=VehicleUsage)
def update_vehicle_and_user_emissions(sender, instance, **kwargs):
    vehicle = instance.vehicle
    user = vehicle.user

    # Update vehicle total
    vehicle.update_total_emission()

    # Update user's total
    user.update_total_co2()
