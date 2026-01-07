from typing import Final

from rest_framework import serializers

from app.url.models import Url

RESERVED_SLUGS: Final = ["s", "u", "admin", "api"]


class UrlSerializer(serializers.ModelSerializer):
    """`Url` serializer."""

    class Meta:
        """Meta class for the `Url` model."""

        model = Url
        fields = ["id", "url", "slug"]
        read_only_fields = ["id"]
        extra_kwargs = {
            "slug": {"validators": []},  # Remove default uniqueness validator
        }

    def validate_slug(self, value):
        """Prevents reserved slugs that conflict with URL patterns."""
        if value and value.lower() in RESERVED_SLUGS:
            raise serializers.ValidationError(
                "This slug is reserved and cannot be used."
            )
        return value
