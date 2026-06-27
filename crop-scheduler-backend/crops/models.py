from django.db import models


class Crop(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class CropStage(models.Model):
    crop = models.ForeignKey(
        Crop,
        on_delete=models.CASCADE,
        related_name="stages",
    )
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "name"]
        unique_together = ("crop", "name")

    def __str__(self) -> str:
        return f"{self.crop.name} - {self.name}"


class Problem(models.Model):
    crop_stage = models.ForeignKey(
        CropStage,
        on_delete=models.CASCADE,
        related_name="problems",
    )
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "name"]
        unique_together = ("crop_stage", "name")

    def __str__(self) -> str:
        return f"{self.crop_stage} - {self.name}"
