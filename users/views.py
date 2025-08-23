from django.shortcuts import render, redirect

from users.forms import Guest_User_Form
from users.models import Guest_User


def test(request):
    return render(request, 'registration/sign_up.html')

def get_current_guest_user(request):
    guest_id = request.session.get("guest_user_id")
    if guest_id:
        try:
            return Guest_User.objects.get(id=guest_id)
        except Guest_User.DoesNotExist:
            return None
    return None



def test_guest_user( request ):
    form = Guest_User_Form()
    current_guest_user = get_current_guest_user(request)

    if request.method == "POST":
        form = Guest_User_Form(request.POST)

        if form.is_valid():
            guest_user = form.save()
            print(guest_user)
            request.session["guest_user_id"] = guest_user.id
            return redirect("Test")


    context = {
        'form': form,
        'guest_user': current_guest_user,
    }
    
    return render(request, "guest_user_login.html", context)
