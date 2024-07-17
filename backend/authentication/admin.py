from django.contrib import admin
from .models import User


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
    )
