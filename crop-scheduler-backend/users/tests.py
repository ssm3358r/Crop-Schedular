from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from farmers.models import Farmer

User = get_user_model()


class AuthApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_farmer_signup_returns_tokens_and_profile(self):
        response = self.client.post(
            "/api/auth/farmers/signup/",
            {
                "name": "Ramesh",
                "phone": "9876543210",
                "password": "secret123",
                "area": "12 acres",
                "state": "Telangana",
                "district": "Warangal",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertIn("access", response.data)
        self.assertEqual(response.data["user"]["role"], "farmer")
        self.assertEqual(Farmer.objects.count(), 1)
        self.assertEqual(Farmer.objects.get().phone, "9876543210")

    def test_admin_login_returns_tokens(self):
        User.objects.create_superuser(username="admin", password="admin123", email="admin@example.com")

        response = self.client.post(
            "/api/auth/admin/login/",
            {
                "username": "admin",
                "password": "admin123",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["user"]["role"], "admin")
        self.assertIn("access", response.data)

    def test_health_endpoint_returns_ok(self):
        response = self.client.get("/api/health/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["status"], "ok")
        self.assertEqual(response.data["database"], "connected")
