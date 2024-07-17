from django.db import models
from django.contrib.auth.models import AbstractUser
from authentication.managers import UserManager


class User(AbstractUser):
    username = None
    google_profile_image = models.URLField(max_length=255, blank=True)
    email = models.EmailField(max_length=250, null=True, unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = UserManager()
