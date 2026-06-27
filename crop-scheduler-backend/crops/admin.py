from django.contrib import admin

from .models import Crop, CropStage, Problem


@admin.register(Crop)
class CropAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "is_active", "created_at")
    list_filter = ("is_active",)
    search_fields = ("name",)


@admin.register(CropStage)
class CropStageAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "crop", "order", "created_at")
    list_filter = ("crop",)
    search_fields = ("name", "crop__name")
    ordering = ("crop", "order", "name")


@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "crop_stage", "order", "created_at")
    list_filter = ("crop_stage__crop", "crop_stage")
    search_fields = ("name", "crop_stage__name", "crop_stage__crop__name")
    ordering = ("crop_stage", "order", "name")
