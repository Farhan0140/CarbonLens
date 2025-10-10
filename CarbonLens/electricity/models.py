from django.db import models
from django.conf import settings
from datetime import date

# Emission factor (kg CO₂ per kWh)
EMISSION_FACTOR = 0.475


class ElectricityBill(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="electricity_bills"
    )
    bill_date = models.DateField(help_text="Month or billing period date")
    total_kwh = models.FloatField(default=0.0)
    total_co2 = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.user.username} - {self.bill_date.strftime('%B %Y')}"

    def calculate_emission(self):
        self.total_co2 = round(self.total_kwh * EMISSION_FACTOR, 3)
        self.save(update_fields=['total_co2'])


class ElectricDevice(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="devices"
    )
    name = models.CharField(max_length=100)
    wattage = models.FloatField(help_text="Device power rating in watts")
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.wattage}W)"


class DeviceUsage(models.Model):
    device = models.ForeignKey(
        ElectricDevice,
        on_delete=models.CASCADE,
        related_name="usages"
    )
    date = models.DateField(default=date.today)
    hours_used = models.FloatField(help_text="Total hours used this day")
    kwh_used = models.FloatField(default=0.0)
    co2_emission = models.FloatField(default=0.0)

    class Meta:
        unique_together = ('device', 'date')  # prevent duplicate entries per day

    def __str__(self):
        return f"{self.device.name} - {self.date}"

    def save(self, *args, **kwargs):
        self.kwh_used = round((self.device.wattage * self.hours_used) / 1000, 3)
        self.co2_emission = round(self.kwh_used * EMISSION_FACTOR, 3)
        super().save(*args, **kwargs)
