import pytest

import factory
from heatedmaps.models import Product
from .user import UserFactory


@pytest.mark.django_db
class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product
        django_get_or_create = ("title", "seller")

    title = "Gaming mouse"
    seller = factory.SubFactory(UserFactory)
