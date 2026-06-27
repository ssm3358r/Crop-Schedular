from django.urls import path

from .views import AdminLoginView, AuthTokenRefreshView, FarmerLoginView, FarmerSignupView, HealthCheckView, MeView


urlpatterns = [
    path("health/", HealthCheckView.as_view(), name="health-check"),
    path("auth/farmers/signup/", FarmerSignupView.as_view(), name="farmer-signup"),
    path("auth/farmers/login/", FarmerLoginView.as_view(), name="farmer-login"),
    path("auth/admin/login/", AdminLoginView.as_view(), name="admin-login"),
    path("auth/token/refresh/", AuthTokenRefreshView.as_view(), name="token-refresh"),
    path("auth/me/", MeView.as_view(), name="auth-me"),
]
