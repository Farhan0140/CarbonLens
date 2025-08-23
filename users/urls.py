
from django.urls import path, include

from users import views as view

urlpatterns = [
    path('sign-up/', view.User_SignUp, name='sign_up'),
]

