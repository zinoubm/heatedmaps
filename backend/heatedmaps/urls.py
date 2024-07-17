from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from .views import (
    ProductListCreateAPIView,
)

urlpatterns = [
    path("api/auth/", include("authentication.urls")),
    path("admin/", admin.site.urls),
    path(
        "schema/",
        SpectacularAPIView.as_view(),
        name="schema",
    ),
    path(
        "docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="documentation",
    ),
    path(
        "api/products/",
        ProductListCreateAPIView.as_view(),
        name="products-list",
    ),
    # Include your views paths here
]
