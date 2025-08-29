from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import login, logout, authenticate

from users.forms import Guest_User_Form, User_Register_Form, Login_Form
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


def User_SignUp(request):
    user_form = User_Register_Form()
    guest_user_form = Guest_User_Form()

    if request.method == "POST":
        # Check which form is submitted (using a hidden input or button name)
        if "user_submit" in request.POST:
            user_form = User_Register_Form(request.POST)
            if user_form.is_valid():
                user = user_form.save(commit=False)
                user.is_active = False
                user.set_password(user_form.cleaned_data['password'])
                user.save()
                messages.success(request, "A confirmation mail has been sent to your email.")
                return redirect("sign_in")

        elif "guest_submit" in request.POST:
            guest_user_form = Guest_User_Form(request.POST)
            if guest_user_form.is_valid():
                guest_user = guest_user_form.save()
                request.session["guest_user_id"] = guest_user.id
                messages.success(request, "Guest user created successfully!")
                return redirect("deshboard")

    context = {
        "form": user_form,
        "guest_user_form": guest_user_form,
    }
    return render(request, "registration/sign_up.html", context)




def Activate_User(request, user_id, token):
    user = User.objects.get(id=user_id)

    try:
        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            messages.success(request, "Your Account Activated Successfully, Log-In")
            return redirect('sign_in')
        else:
            print('This Account Already Activate')
    except:
        print('User Not Found')


def Sign_In(request):
    form = Login_Form()

    if request.method == "POST":
        form = Login_Form(data=request.POST)

        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect("dashboard")
        
    return render(request, "registration/sign_in.html", {"form": form})


def Sign_Out(request):
    if request.method == "POST":
        logout(request)
        return redirect("sign_in")
    
    return redirect("sign_in")