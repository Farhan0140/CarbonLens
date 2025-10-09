from django import forms
from .models import User

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'country', 'district', 'password']

    def clean(self):
        cleaned_data = super().clean()
        country = cleaned_data.get("country")
        district = cleaned_data.get("district")

        if district and country and district.country != country:
            raise forms.ValidationError("District does not belong to the selected country.")
