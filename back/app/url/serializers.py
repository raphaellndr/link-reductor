import re
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
        """Validates slug format and prevents reserved slugs."""
        if value:
            if not re.match(r"^[a-zA-Z0-9_-]+$", value):
                raise serializers.ValidationError(
                    "Slug can only contain letters, numbers, hyphens, and underscores."
                )

            if value.lower() in RESERVED_SLUGS:
                raise serializers.ValidationError(
                    "This slug is reserved and cannot be used."
                )

        return value
