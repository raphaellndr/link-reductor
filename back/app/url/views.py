from uuid import UUID

from django.http import HttpResponsePermanentRedirect
from django.shortcuts import get_object_or_404, redirect
from rest_framework import status
from rest_framework.views import APIView, Request, Response, View

from app.url.models import Url
from app.url.serializers import UrlSerializer


class UrlView(APIView):
    """API endpoint for creating shortened URLs."""

    def get(self, request: Request) -> Response:
        """Lists all URLs."""
        urls = Url.objects.all()
        serializer = UrlSerializer(urls, many=True)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        """Creates a shortened URL."""
        serializer = UrlSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RedirectUserView(View):
    """Redirects user to original URL."""

    def get(self, request: Request, uuid: UUID) -> HttpResponsePermanentRedirect:
        """Redirects to the original URL."""
        url = get_object_or_404(Url, id=uuid)
        return redirect(url.url, permanent=True)
