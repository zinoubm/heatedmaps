import pytest
from tests.fixtures import api_client

from tests.factories import UserFactory, SiteFactory


@pytest.mark.django_db
class TestSiteListCreateAPIView:
    def setup_method(self, method):
        self.url = "http://localhost:8000/api/sites/"
        self.owner = UserFactory()
        self.site = SiteFactory(owner=self.owner)

    def test_create_site(self, api_client):
        data = {
            # owner will be figured out by backend
            "name": "My Site",
            "url": "https://mysite.com",
            "description": "A dummy site for testing",
        }

        api_client.force_authenticate(user=self.owner)
        response = api_client.post(
            self.url,
            data,
            format="json",
        )

        assert response.status_code == 201

    def test_list_sites(self, api_client):
        api_client.force_authenticate(user=self.owner)
        response = api_client.get(self.url)

        sites = response.data

        assert response.status_code == 200
        assert sites, "Sites list Is empty!"
        assert all(site["owner"] == self.owner.id for site in sites)
