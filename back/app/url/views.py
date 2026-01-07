from uuid import UUID

from django.http import HttpResponsePermanentRedirect
from django.shortcuts import get_object_or_404, redirect
from rest_framework import status
from rest_framework.views import APIView, Request, Response, View

from app.url.models import Url
from app.url.serializers import UrlSerializer


class UrlView(APIView):
    """API endpoint for creating shortened URLs."""

    def post(self, request: Request) -> Response:
        """Creates a shortened URL or returns existing one."""
        serializer = UrlSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        url = serializer.validated_data["url"]
        slug = serializer.validated_data.get("slug")

        if slug:
            url_obj, created = Url.objects.get_or_create(
                slug=slug, defaults={"url": url}
            )

            if not created and url_obj.url != url:
                return Response(
                    {"slug": ["This slug is already used for a different URL."]},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            url_obj, created = Url.objects.get_or_create(
                url=url, slug__isnull=True, defaults={"url": url}
            )

        response_serializer = UrlSerializer(url_obj)
        status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response(response_serializer.data, status=status_code)


class RedirectByUuidView(View):
    """Redirects user to original URL using UUID."""

    def get(self, request: Request, uuid: UUID) -> HttpResponsePermanentRedirect:
        """Redirects to the original URL by UUID."""
        url = get_object_or_404(Url, id=uuid)
        return redirect(url.url, permanent=True)


class RedirectBySlugView(View):
    """Redirects user to original URL using custom slug."""

    def get(self, request: Request, slug: str) -> HttpResponsePermanentRedirect:
        """Redirects to the original URL by slug."""
        url = get_object_or_404(Url, slug=slug)
        return redirect(url.url, permanent=True)
