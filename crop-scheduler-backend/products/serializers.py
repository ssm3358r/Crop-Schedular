from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "name", "description", "manufacturer", "image_url"]

    def get_image_url(self, obj):
        if not obj.image:
            return None
        return getattr(obj.image, "url", None)
