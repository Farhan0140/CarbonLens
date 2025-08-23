from django import forms

from users import models as mdl

class Guest_User_Form( forms.ModelForm ):
    class Meta:
        model = mdl.Guest_User
        fields = '__all__'