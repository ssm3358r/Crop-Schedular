from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("crops.urls")),
    path("api/", include("recommendations.urls")),
    path("api/", include("farmers.urls")),
    path("api/", include("products.urls")),
    path("api/", include("users.urls")),
]
