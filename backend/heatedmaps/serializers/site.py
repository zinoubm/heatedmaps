from rest_framework import serializers
from heatedmaps.models import Site


class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = "__all__"
        read_only_fields = ["owner"]
