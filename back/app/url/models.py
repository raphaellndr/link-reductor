import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _


class Url(models.Model):
    """Model to store urls."""

    id = models.UUIDField(
        _("URL identifier"), primary_key=True, default=uuid.uuid4, editable=False
    )
    url = models.TextField(_("Original URL"))

    class Meta:
        """Meta class for the `Url` model."""

        verbose_name = "url"
        verbose_name_plural = "urls"

    def __str__(self) -> str:
        return f"Url {self.id} ({self.url})"
