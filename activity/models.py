from django.db import models
from django.core.validators import MinValueValidator


from users.models import User, Guest_User
from activity import transports as t_dtl    # Transport Details



class Transport( models.Model ):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

    vehicle = models.CharField(max_length=100, choices=t_dtl.VEHICLES, default="BICYCLE")
    distance = models.FloatField(default=0.0, validators=[MinValueValidator(0.0, message="Distance Can\'t Be Negative")])
    co2_emission = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.first_name} using {self.vehicle} - {self.distance} km"
