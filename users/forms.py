from django import forms
from django.contrib.auth.forms import UserCreationForm

import re

from users import models as mdl
from core.forms import For_Mixin


class Guest_User_Form( forms.ModelForm ):
    class Meta:
        model = mdl.Guest_User
        fields = '__all__'


class User_Register_Form( For_Mixin, forms.ModelForm ):
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Enter Your Password'})
    )
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Confirm Your Password'})
    )

    class Meta:
        model = mdl.User
        fields = ['email', 'first_name', 'last_name', 'district', 'password', 'confirm_password']

    def clean_password(self):
        user_password = self.cleaned_data.get('password')
        errors = []

        if len(user_password) < 8:
            errors.append("Password must contain at least 8 characters")
        if not re.search(r'\d', user_password):
            errors.append("Password must contain at least one digit")
        if not re.search(r'[a-z]', user_password):
            errors.append("Password must contain at least one lowercase letter")
        if not re.search(r'[A-Z]', user_password):
            errors.append("Password must contain at least one uppercase letter")
        if not re.search(r'\W', user_password):
            errors.append("Password must contain at least one special character (!@£$%^&*()_+=}{?:~[]])")
        if re.search(r'\s', user_password):
            errors.append("Password must not contain whitespace")

        if errors:
            raise forms.ValidationError(errors)
        
        return user_password
    
    def clean(self):
        cln_data = super().clean()
        password = cln_data.get('password')
        c_password = cln_data.get('confirm_password')

        if password != c_password:
            raise forms.ValidationError("Password Don't Match")
        
        return cln_data
    
    
    def clean_email(self):
        email_from_user = self.cleaned_data.get('email')
        email_from_db = mdl.User.objects.filter(email = email_from_user).exists()

        if email_from_db:
            raise forms.ValidationError("This email already exist chose another")
        
        return email_from_user
    