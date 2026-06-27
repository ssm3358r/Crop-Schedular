from rest_framework import serializers

from .models import Crop, CropStage, Problem


class CropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields = ["id", "name", "description", "is_active"]


class CropStageSerializer(serializers.ModelSerializer):
    crop_id = serializers.IntegerField(source="crop.id", read_only=True)
    crop_name = serializers.CharField(source="crop.name", read_only=True)

    class Meta:
        model = CropStage
        fields = ["id", "crop_id", "crop_name", "name", "description", "order"]


class ProblemSerializer(serializers.ModelSerializer):
    crop_stage_id = serializers.IntegerField(source="crop_stage.id", read_only=True)
    crop_stage_name = serializers.CharField(source="crop_stage.name", read_only=True)

    class Meta:
        model = Problem
        fields = ["id", "crop_stage_id", "crop_stage_name", "name", "description", "order"]
