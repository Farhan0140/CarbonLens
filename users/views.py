from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.tokens import default_token_generator

from users.forms import Guest_User_Form, User_Register_Form
from users.models import Guest_User, User


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


def User_SignUp( request ):
    form = User_Register_Form()

    if request.method == "POST":
        form = User_Register_Form(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.set_password(form.cleaned_data['password'])
            user.save()
            messages.success(request, "A confirmation mail send to your mail..")
            return redirect("Test")

    context = {
        'form': form,
    }

    return render(request, "registration/sign_up.html", context)


def Activate_User(request, user_id, token):
    user = User.objects.get(id=user_id)

    try:
        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            messages.success(request, "Your Account Activated Successfully, Log-In")
            return redirect('Test')
        else:
            print('This Account Already Activate')
    except:
        print('User Not Found')
