from rest_framework import serializers

from products.serializers import ProductSerializer

from .models import Solution


class SolutionSerializer(serializers.ModelSerializer):
    recommended_products = ProductSerializer(source="products", many=True, read_only=True)
    problem_id = serializers.IntegerField(source="problem.id", read_only=True)
    problem_name = serializers.CharField(source="problem.name", read_only=True)

    class Meta:
        model = Solution
        fields = [
            "id",
            "problem_id",
            "problem_name",
            "cause",
            "recommendation",
            "dosage",
            "application_method",
            "tips",
            "recommended_products",
        ]
