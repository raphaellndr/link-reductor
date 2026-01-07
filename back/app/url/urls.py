"""URL mappings for the Url app."""

from django.urls import path

from app.url.views import RedirectBySlugView, RedirectByUuidView, UrlView

urlpatterns = [
    path("", UrlView.as_view(), name="url-list"),
    path("s/<str:slug>/", RedirectBySlugView.as_view(), name="redirect-by-slug"),
    path("u/<uuid:uuid>/", RedirectByUuidView.as_view(), name="redirect-by-uuid"),
]
