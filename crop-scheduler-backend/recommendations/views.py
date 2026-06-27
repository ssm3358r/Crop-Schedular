from django.http import Http404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from crops.models import Problem

from .serializers import SolutionSerializer


class ProblemViewSet(viewsets.GenericViewSet):
    queryset = Problem.objects.select_related("crop_stage", "crop_stage__crop").all()

    @action(detail=True, methods=["get"], url_path="solution")
    def solution(self, request, pk=None):
        problem = self.get_object()
        try:
            solution = problem.solution
        except Problem.solution.RelatedObjectDoesNotExist as exc:
            raise Http404("Solution not found for this problem.") from exc

        serializer = SolutionSerializer(solution)
        return Response(serializer.data, status=status.HTTP_200_OK)
