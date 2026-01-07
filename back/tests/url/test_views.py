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

    def test_create_url_with_custom_slug(self, api_client) -> None:
        """Tests that creating a URL with custom slug works."""
        data = {"url": "https://www.amazon.com/product", "slug": "my-link"}
        response = api_client.post("/api/urls/", data)

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["slug"] == "my-link"
        assert Url.objects.count() == 1

    def test_create_url_with_reserved_slug(self, api_client) -> None:
        """Tests that reserved slugs are rejected."""
        data = {"url": "https://example.com", "slug": "admin"}
        response = api_client.post("/api/urls/", data)

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "slug" in response.data

    def test_create_url_invalid(self, api_client) -> None:
        """Tests that creating URL with invalid data does not work."""
        response = api_client.post("/api/urls/", {})

        assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
class TestRedirect:
    def test_redirect_by_uuid(self, client) -> None:
        """Tests that redirecting with valid UUID is successful."""
        url_obj = Url.objects.create(url="https://example.com")
        response = client.get(f"/api/urls/u/{url_obj.id}/")

        assert response.status_code == 301
        assert response.url == "https://example.com"

    def test_redirect_by_custom_slug(self, client) -> None:
        """Tests that redirecting with custom slug is successful."""
        Url.objects.create(url="https://example.com", slug="my-link")
        response = client.get("/api/urls/s/my-link/")

        assert response.status_code == 301
        assert response.url == "https://example.com"

    def test_redirect_invalid_uuid(self, client) -> None:
        """Tests that redirecting with non-existent UUID does not work."""
        response = client.get("/api/urls/u/00000000-0000-0000-0000-000000000000/")

        assert response.status_code == 404

    def test_redirect_invalid_slug(self, client) -> None:
        """Tests that redirecting with non-existent slug does not work."""
        response = client.get("/api/urls/s/nonexistent/")

        assert response.status_code == 404
