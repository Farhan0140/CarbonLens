
from django.urls import path, include

from users import views as view

urlpatterns = [
    path('sign-up/', view.User_SignUp, name='sign_up'),
    path('sign-in/', view.Sign_In, name="sign_in"),
    path('sign-out/', view.Sign_Out, name="sign_out"),
    path('activate/<int:user_id>/<str:token>/', view.Activate_User)
]

