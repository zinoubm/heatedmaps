import pytest

import factory
from heatedmaps.models import Site
from .user import UserFactory


@pytest.mark.django_db
class SiteFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Site
        django_get_or_create = ("owner", "name", "url", "description")

    owner = factory.SubFactory(UserFactory)
    name = factory.Faker("name")
    url = factory.Faker("url")
    description = "Some fake description for testing."
