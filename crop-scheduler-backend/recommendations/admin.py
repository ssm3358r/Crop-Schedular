from django.contrib import admin

from .models import Solution


@admin.register(Solution)
class SolutionAdmin(admin.ModelAdmin):
    list_display = ("id", "problem", "dosage", "created_at")
    search_fields = ("problem__name", "recommendation", "cause")
    filter_horizontal = ("products",)
