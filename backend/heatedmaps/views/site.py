from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser


from heatedmaps.models import Site
from heatedmaps.serializers import SiteSerializer


class SiteListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SiteSerializer

    def get_queryset(self):
        return Site.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SiteRetrieveAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SiteSerializer

    queryset = Site.objects.all()