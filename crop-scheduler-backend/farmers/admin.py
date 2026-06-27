from django.contrib import admin

from .models import Farmer


@admin.register(Farmer)
class FarmerAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "phone", "area", "state", "district", "crop", "user", "created_at")
    search_fields = ("name", "phone", "area", "district", "village", "user__username")
    list_filter = ("state", "district", "crop")
