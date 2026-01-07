import pytest
from rest_framework import status

from app.url.models import Url


@pytest.mark.django_db
class TestUrlAPI:
    def test_create_url_success(self, api_client) -> None:
        """Tests that creating a shortened URL is successful."""
        data = {"url": "https://www.amazon.com/very-long-product-link"}
        response = api_client.post("/api/urls/", data)

        assert response.status_code == status.HTTP_201_CREATED
        assert "id" in response.data
        assert response.data["url"] == data["url"]
        assert Url.objects.count() == 1

    def test_create_url_invalid(self, api_client) -> None:
        """Tests that creating URL with invalid data does not work."""
        response = api_client.post("/api/urls/", {})

        assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
class TestRedirect:
    def test_redirect_valid_uuid(self, client) -> None:
        """Tests that redirecting with valid UUID is successfull."""
        url_obj = Url.objects.create(url="https://example.com")
        response = client.get(f"/api/urls/{url_obj.id}/")

        assert response.status_code == 301
        assert response.url == "https://example.com"

    def test_redirect_invalid_uuid(self, client) -> None:
        """Tests that redirecting with non-existent UUID does not work."""
        response = client.get("/api/urls/00000000-0000-0000-0000-000000000000/")

        assert response.status_code == 404
