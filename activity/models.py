# from django.db import models
# from users.models import User, Guest_User
# from activity import transports as t_dtl    # Transport Details



# class Transport( models.Model ):
#     user = models.ForeignKey(
#         User,
#     )

#     vehicle = models.CharField(max_length=100, choices=t_dtl.VEHICLES, default="BICYCLE")
#     distance = models.FloatField(help_text="Distance traveled in km", default=0.0)
#     co2_emission = models.FloatField(blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)


