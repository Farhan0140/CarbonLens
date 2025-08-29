from django.shortcuts import render, redirect

from .forms import Dashboard_Form
from .transports import FUEL_TYPES, MILEAGES, EMISSION_FACTORS
from users.models import User

def Dashboard( request ):
    form = Dashboard_Form()

    if request.method == "POST":
        form = Dashboard_Form(request.POST)
        
        if form.is_valid():
            cln_data = form.cleaned_data
            user = User.objects.get(id=1)

            vehicle_obj = form.save(commit=False)
            vehicle_obj.user = user

            fuel_type = FUEL_TYPES.get(vehicle_obj.vehicle)
            mileage = MILEAGES.get(vehicle_obj.vehicle)
            emission_factor = EMISSION_FACTORS.get(fuel_type)
            distance = cln_data['distance']

            vehicle_obj.co2_emission = round(((distance / mileage) * emission_factor), 2)

            vehicle_obj.save()
            # print(f"--> {vehicle_obj.co2_emission}")
            return redirect("dashboard")

    context = {
        'form': form,
    }
    
    return render(request, "dashboard.html", context)
