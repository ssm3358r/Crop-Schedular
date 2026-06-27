from django.db import models

from crops.models import Problem
from products.models import Product


class Solution(models.Model):
    problem = models.OneToOneField(
        Problem,
        on_delete=models.CASCADE,
        related_name="solution",
    )
    cause = models.TextField()
    recommendation = models.TextField()
    dosage = models.CharField(max_length=255)
    application_method = models.TextField()
    tips = models.TextField(blank=True)
    products = models.ManyToManyField(Product, related_name="solutions", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["problem__name"]

    def __str__(self) -> str:
        return f"Solution for {self.problem.name}"
