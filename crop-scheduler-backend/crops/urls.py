from django.urls import path

from .views import CropStageViewSet, CropViewSet


crop_list = CropViewSet.as_view({"get": "list"})
crop_stages = CropViewSet.as_view({"get": "stages"})
stage_problems = CropStageViewSet.as_view({"get": "problems"})

urlpatterns = [
    path("crops/", crop_list, name="crop-list"),
    path("crops/<int:pk>/stages/", crop_stages, name="crop-stages"),
    path("stages/<int:pk>/problems/", stage_problems, name="stage-problems"),
]
