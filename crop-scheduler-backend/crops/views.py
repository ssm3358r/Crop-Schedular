from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Crop, CropStage
from .serializers import CropSerializer, CropStageSerializer, ProblemSerializer


class CropViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Crop.objects.filter(is_active=True)
    serializer_class = CropSerializer

    @action(detail=True, methods=["get"], url_path="stages")
    def stages(self, request, pk=None):
        crop = self.get_object()
        serializer = CropStageSerializer(crop.stages.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CropStageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CropStage.objects.select_related("crop").all()
    serializer_class = CropStageSerializer

    @action(detail=True, methods=["get"], url_path="problems")
    def problems(self, request, pk=None):
        stage = self.get_object()
        serializer = ProblemSerializer(stage.problems.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
