from rest_framework import serializers

from app.url.models import Url


class UrlSerializer(serializers.ModelSerializer):
    """`Url` serializer."""

    class Meta:
        """Meta class for the `Url` model."""

        model = Url
        fields = ["id", "url"]
        read_only_fields = ["id"]
