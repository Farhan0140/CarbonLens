from django.db import models
from django.conf import settings
from datetime import date


class Activity(models.Model):
    CATEGORY_CHOICES = [
        ("food_waste", "Food Waste"),
        ("plastic_bottle", "Plastic Bottle"),
        ("cooking_gas", "Cooking (Gas)"),
        ("water_usage", "Water Usage"),
        ("other", "Other"),
    ]

    # Default emission factors & units
    DEFAULT_FACTORS = {
        "food_waste": {"emission_factor": 2.5, "unit": "kg"},
        "plastic_bottle": {"emission_factor": 0.1, "unit": "bottle"},
        "cooking_gas": {"emission_factor": 2.0, "unit": "hour"},
        "water_usage": {"emission_factor": 0.5, "unit": "liter"},
        "other": {"emission_factor": 0.5, "unit": "unit"},
    }

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    unit = models.CharField(max_length=50, editable=False)
    emission_factor = models.FloatField(editable=False)  # kg CO₂ per unit

    class Meta:
        unique_together = ('name', 'category')

    def __str__(self):
        return f"{self.name} ({self.category})"

    def save(self, *args, **kwargs):
        """Auto-assign unit and emission_factor based on category."""
        if self.category in self.DEFAULT_FACTORS:
            data = self.DEFAULT_FACTORS[self.category]
            self.unit = data["unit"]
            self.emission_factor = data["emission_factor"]
        else:
            self.unit = "unit"
            self.emission_factor = 0.0

        super().save(*args, **kwargs)


class ActivityRecord(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="activity_records"
    )
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name="records")
    date = models.DateField(default=date.today)
    quantity = models.FloatField(default=0.0)
    co2_emission = models.FloatField(default=0.0)

    class Meta:
        unique_together = ('user', 'activity', 'date')

    def __str__(self):
        return f"{self.user.username} - {self.activity.name} ({self.date})"

    def save(self, *args, **kwargs):
        """Auto-calculate CO₂ emission before saving."""
        self.co2_emission = round(self.quantity * self.activity.emission_factor, 3)
        super().save(*args, **kwargs)
