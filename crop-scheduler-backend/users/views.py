from django.db import connection
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenRefreshView

from .serializers import (
    AdminLoginSerializer,
    FarmerLoginSerializer,
    FarmerSignupSerializer,
    build_health_payload,
    build_token_payload,
)


class HealthCheckView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        data = build_health_payload()
        status_code = status.HTTP_200_OK if data["status"] == "ok" else status.HTTP_503_SERVICE_UNAVAILABLE
        return Response(data, status=status_code)


class FarmerSignupView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = FarmerSignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, _farmer = serializer.save()
        return Response(build_token_payload(user), status=status.HTTP_201_CREATED)


class FarmerLoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = FarmerLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(build_token_payload(serializer.validated_data["user"]), status=status.HTTP_200_OK)


class AdminLoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(build_token_payload(serializer.validated_data["user"]), status=status.HTTP_200_OK)


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(build_token_payload(request.user)["user"], status=status.HTTP_200_OK)


class AuthTokenRefreshView(TokenRefreshView):
    authentication_classes = []
    permission_classes = []
