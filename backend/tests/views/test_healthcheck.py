import pytest
from tests.fixtures import api_client


@pytest.mark.django_db
def test_health_check(api_client):
    response = api_client.get("http://localhost:8000/api/healthcheck/")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
