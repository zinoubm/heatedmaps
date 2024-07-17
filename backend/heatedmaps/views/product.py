from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser


from heatedmaps.models import Product
from heatedmaps.serializers import ProductSerializer


class ProductListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(seller=self.request.user)

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)
