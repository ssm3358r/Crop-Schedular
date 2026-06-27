from django.urls import path

from .views import FarmerViewSet


farmer_create = FarmerViewSet.as_view({"post": "create"})

urlpatterns = [
    path("farmers/", farmer_create, name="farmer-create"),
]
