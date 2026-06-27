from cloudinary.models import CloudinaryField
from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=150, unique=True)
    description = models.TextField(blank=True)
    manufacturer = models.CharField(max_length=150, blank=True)
    image = CloudinaryField("image", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name
