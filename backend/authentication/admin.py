from django.contrib import admin
from allauth.account.models import EmailAddress

# from .models import User
from django.contrib.auth import get_user_model

User = get_user_model()


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_filter = [
        # specify filters, example:
        # "email"
    ]
    list_display = (
        "first_name",
        "email",
        "is_superuser",
        "email_verified",
    )

    def email_verified(self, obj):
        try:
            email_address = EmailAddress.objects.get(user=obj, primary=True)
            return email_address.verified
        except EmailAddress.DoesNotExist:
            return False

    email_verified.boolean = True


# admin.site.unregister(User)
# admin.site.register(User, UserAdmin)
