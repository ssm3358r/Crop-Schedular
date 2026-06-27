from django.core.management.base import BaseCommand
from django.db import connection

from crops.models import Crop, CropStage, Problem
from farmers.models import Farmer
from products.models import Product
from recommendations.models import Solution


class Command(BaseCommand):
    help = "Check backend health, database connectivity, and core record counts."

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Checking Crop Scheduler backend status..."))

        try:
            connection.ensure_connection()
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()
        except Exception as exc:
            self.stdout.write(self.style.ERROR(f"Database connection: FAILED ({exc})"))
            return

        self.stdout.write(self.style.SUCCESS("Database connection: OK"))
        self.stdout.write(f"Crop count: {Crop.objects.count()}")
        self.stdout.write(f"Stage count: {CropStage.objects.count()}")
        self.stdout.write(f"Problem count: {Problem.objects.count()}")
        self.stdout.write(f"Solution count: {Solution.objects.count()}")
        self.stdout.write(f"Product count: {Product.objects.count()}")
        self.stdout.write(f"Farmer count: {Farmer.objects.count()}")
        self.stdout.write(self.style.SUCCESS("Backend status check completed."))
