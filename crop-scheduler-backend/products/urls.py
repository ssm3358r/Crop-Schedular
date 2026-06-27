from django.urls import path

from .views import ProductViewSet


product_list = ProductViewSet.as_view({"get": "list"})

urlpatterns = [
    path("products/", product_list, name="product-list"),
]
