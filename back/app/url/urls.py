"""URL mappings for the Url app."""

from django.urls import path

from app.url.views import RedirectUserView, UrlView

urlpatterns = [
    path("", UrlView.as_view(), name="url-list"),
    path("<uuid:uuid>/", RedirectUserView.as_view(), name="user-redirect"),
]
