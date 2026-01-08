import uuid

from django.core.validators import RegexValidator
from django.db import models
from django.utils.translation import gettext_lazy as _


class Url(models.Model):
    """Model to store URLs."""

    id = models.UUIDField(
        _("URL identifier"),
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        max_length=30,
    )
    url = models.URLField(_("Original URL"), max_length=2048)
    slug = models.CharField(
        _("URL slug"),
        max_length=30,
        unique=True,
        null=True,
        blank=True,
        db_index=True,
        validators=[
            RegexValidator(
                regex=r"^[a-zA-Z0-9_-]+$",
                message=_(
                    "Slug can only contain letters, numbers, hyphens, and underscores."
                ),
            )
        ],
    )

    class Meta:
        """Meta class for the `Url` model."""

        verbose_name = _("url")
        verbose_name_plural = _("urls")

    def __str__(self) -> str:
        return f"Url {self.get_slug()} -> {self.url}"

    def get_slug(self) -> str:
        """Returns custom slug if exists, otherwise returns UUID."""
        return self.slug or str(self.id)
