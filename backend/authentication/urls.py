from dj_rest_auth.views import LogoutView

# from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView
from dj_rest_auth.registration.views import (
    ResendEmailVerificationView,
    VerifyEmailView,
)
from dj_rest_auth.views import (
    PasswordResetConfirmView,
    PasswordResetView,
)

from authentication.views import (
    UserRegisterViwe,
    UserLoginView,
    GoogleLoginView,
    CustomUserDetailsView,
    email_confirm_redirect,
    password_reset_confirm_redirect,
)
from django.urls import path


urlpatterns = [
    path(
        "register/",
        UserRegisterViwe.as_view(),
        name="rest_register",
    ),
    path(
        "login/",
        UserLoginView.as_view(),
        name="rest_login",
    ),
    path(
        "logout/",
        LogoutView.as_view(),
        name="rest_logout",
    ),
    path(
        "user/",
        CustomUserDetailsView.as_view(),
        name="rest_user_details",
    ),
    path("register/verify-email/", VerifyEmailView.as_view(), name="rest_verify_email"),
    path(
        "register/resend-email/",
        ResendEmailVerificationView.as_view(),
        name="rest_resend_email",
    ),
    path(
        "account-confirm-email/<str:key>/",
        email_confirm_redirect,
        name="account_confirm_email",
    ),
    path(
        "account-confirm-email/",
        VerifyEmailView.as_view(),
        name="account_email_verification_sent",
    ),
    path("password/reset/", PasswordResetView.as_view(), name="rest_password_reset"),
    path(
        "password/reset/confirm/<str:uidb64>/<str:token>/",
        password_reset_confirm_redirect,
        name="password_reset_confirm",
    ),
    path(
        "password/reset/confirm/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path(
        "google/login/",
        GoogleLoginView.as_view(),
        name="google_login",
    ),
]
