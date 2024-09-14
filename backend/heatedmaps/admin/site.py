from django.contrib import admin
from heatedmaps.models import Site


@admin.register(Site)
class SiteAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "url",
        "description",
    )