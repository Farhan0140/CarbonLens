from django import forms

from .models import Transport
from core.forms import For_Mixin


class Dashboard_Form( For_Mixin, forms.ModelForm ):
    class Meta:
        model = Transport
        fields = ['vehicle', 'distance']
