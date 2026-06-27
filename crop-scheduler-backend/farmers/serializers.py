from rest_framework import serializers

from .models import Farmer


class FarmerSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source="user.id", read_only=True)

    class Meta:
        model = Farmer
        fields = [
            "id",
            "user_id",
            "name",
            "phone",
            "area",
            "state",
            "district",
            "village",
            "land_area",
            "crop",
            "created_at",
        ]
        read_only_fields = ["id", "user_id", "created_at"]
