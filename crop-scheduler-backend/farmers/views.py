from rest_framework import mixins, viewsets

from .models import Farmer
from .serializers import FarmerSerializer


class FarmerViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Farmer.objects.select_related("crop", "user").all()
    serializer_class = FarmerSerializer
