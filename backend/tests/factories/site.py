import pytest

import factory
from heatedmaps.models import Site
from .user import UserFactory


@pytest.mark.django_db
class SiteFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Site
        django_get_or_create = ("owner", "name", "url")

    owner = factory.SubFactory(UserFactory)
    name = "My Site"
    url = "https://mysite.com"
