from .models import Guest_User

def guest_user(request):
    guest = None
    guest_id = request.session.get("guest_user_id")
    if guest_id:
        try:
            guest = Guest_User.objects.get(id=guest_id)
        except Guest_User.DoesNotExist:
            pass
    return {
        "guest_user": guest
    }
