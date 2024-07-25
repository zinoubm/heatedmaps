from django.conf import settings
from django.http import HttpResponseRedirect
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, UserDetailsView
from .serializers import (
    UserRegisterSerializer,
    UserLoginSerializer,
    GoogleLoginSerializer,
    CustomUserDetailsSerializer,
)


class UserRegisterViwe(RegisterView):
    serializer_class = UserRegisterSerializer


class UserLoginView(LoginView):
    serializer_class = UserLoginSerializer


class GoogleLoginView(LoginView):
    serializer_class = GoogleLoginSerializer


class CustomUserDetailsView(UserDetailsView):
    serializer_class = CustomUserDetailsSerializer
    parser_classes = (MultiPartParser, FormParser)


def email_confirm_redirect(request, key):
    return HttpResponseRedirect(f"{settings.EMAIL_CONFIRM_REDIRECT_BASE_URL}{key}/")


def password_reset_confirm_redirect(request, uidb64, token):
    return HttpResponseRedirect(
        f"{settings.PASSWORD_RESET_CONFIRM_REDIRECT_BASE_URL}{uidb64}/{token}/"
    )
