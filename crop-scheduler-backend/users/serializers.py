from django.contrib.auth import authenticate, get_user_model
from django.db import connection, transaction
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from crops.models import Crop, CropStage, Problem
from farmers.models import Farmer
from products.models import Product
from recommendations.models import Solution

User = get_user_model()


class FarmerProfileSerializer(serializers.ModelSerializer):
    crop_name = serializers.CharField(source="crop.name", read_only=True)

    class Meta:
        model = Farmer
        fields = [
            "id",
            "name",
            "phone",
            "area",
            "state",
            "district",
            "village",
            "land_area",
            "crop",
            "crop_name",
        ]


class AuthenticatedUserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    farmer_profile = FarmerProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "is_staff", "is_superuser", "role", "farmer_profile"]

    def get_role(self, user):
        if user.is_staff or user.is_superuser:
            return "admin"
        if hasattr(user, "farmer_profile"):
            return "farmer"
        return "user"


class FarmerSignupSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    phone = serializers.CharField(max_length=20)
    password = serializers.CharField(write_only=True, min_length=6)
    area = serializers.CharField(max_length=150, required=False, allow_blank=True)
    state = serializers.CharField(max_length=100, required=False, allow_blank=True)
    district = serializers.CharField(max_length=100, required=False, allow_blank=True)
    village = serializers.CharField(max_length=100, required=False, allow_blank=True)
    land_area = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, allow_null=True)
    crop = serializers.PrimaryKeyRelatedField(queryset=Crop.objects.filter(is_active=True), required=False, allow_null=True)

    def validate_phone(self, value):
        if Farmer.objects.filter(phone=value).exists() or User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A farmer account with this phone number already exists.")
        return value

    @transaction.atomic
    def create(self, validated_data):
        phone = validated_data["phone"]
        name = validated_data["name"]
        password = validated_data.pop("password")

        user = User.objects.create_user(
            username=phone,
            password=password,
            first_name=name,
        )
        farmer = Farmer.objects.create(user=user, **validated_data)
        return user, farmer


class FarmerLoginSerializer(serializers.Serializer):
    phone = serializers.CharField(max_length=20)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(username=attrs["phone"], password=attrs["password"])
        if not user or not user.is_active:
            raise serializers.ValidationError("Invalid phone number or password.")
        if not hasattr(user, "farmer_profile"):
            raise serializers.ValidationError("This account is not registered as a farmer.")
        attrs["user"] = user
        return attrs


class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(username=attrs["username"], password=attrs["password"])
        if not user or not user.is_active:
            raise serializers.ValidationError("Invalid username or password.")
        if not (user.is_staff or user.is_superuser):
            raise serializers.ValidationError("This account is not authorized for admin login.")
        attrs["user"] = user
        return attrs


class TokenResponseSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    access = serializers.CharField()
    user = AuthenticatedUserSerializer()


class HealthStatusSerializer(serializers.Serializer):
    status = serializers.CharField()
    database = serializers.CharField()
    counts = serializers.DictField(child=serializers.IntegerField(allow_null=True))


def build_token_payload(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "user": AuthenticatedUserSerializer(user).data,
    }


def build_health_payload():
    try:
        connection.ensure_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            cursor.fetchone()
        database_status = "connected"
        counts = {
            "crops": Crop.objects.count(),
            "stages": CropStage.objects.count(),
            "problems": Problem.objects.count(),
            "solutions": Solution.objects.count(),
            "products": Product.objects.count(),
            "farmers": Farmer.objects.count(),
        }
        status_value = "ok"
    except Exception as exc:
        database_status = f"error: {exc}"
        counts = {
            "crops": None,
            "stages": None,
            "problems": None,
            "solutions": None,
            "products": None,
            "farmers": None,
        }
        status_value = "error"

    return {
        "status": status_value,
        "database": database_status,
        "counts": counts,
    }
