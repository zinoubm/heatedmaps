import pytest
from tests.fixtures import api_client

from tests.factories import UserFactory, ProductFactory


@pytest.mark.django_db
class TestProductListCreateAPIView:

    def setup_method(self, method):
        self.url = "http://localhost:8000/api/products/"
        self.seller = UserFactory()
        self.seller_product = ProductFactory(seller=self.seller)

    def test_create_product(self, api_client):
        data = {
            "title": "gaming mouse",
            "description": "fast gaming mouse",
            "price": 25,
        }

        api_client.force_authenticate(user=self.seller)
        response = api_client.post(
            self.url,
            data,
            format="json",
        )

        assert response.status_code == 201

    def test_list_products(self, api_client):
        api_client.force_authenticate(user=self.seller)
        response = api_client.get(self.url)

        products = response.data

        assert response.status_code == 200
        assert products, "Products list Is empty!"
        assert all(product["seller"] == self.seller.id for product in products)
