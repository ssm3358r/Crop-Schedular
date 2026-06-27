from django.conf import settings
from django.db import models

from crops.models import Crop


class Farmer(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="farmer_profile",
        blank=True,
        null=True,
    )
    name = models.CharField(max_length=150, blank=True)
    phone = models.CharField(max_length=20, unique=True)
    area = models.CharField(max_length=150, blank=True)
    state = models.CharField(max_length=100, blank=True)
    district = models.CharField(max_length=100, blank=True)
    village = models.CharField(max_length=100, blank=True)
    land_area = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    crop = models.ForeignKey(
        Crop,
        on_delete=models.SET_NULL,
        related_name="farmers",
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.name or self.phone or f"Farmer {self.pk}"
