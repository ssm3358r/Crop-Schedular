from django.db import migrations


def seed_initial_crops(apps, schema_editor):
    Crop = apps.get_model("crops", "Crop")
    for crop_name in ("Cotton", "Chilli"):
        Crop.objects.get_or_create(name=crop_name, defaults={"is_active": True})


def remove_initial_crops(apps, schema_editor):
    Crop = apps.get_model("crops", "Crop")
    Crop.objects.filter(name__in=["Cotton", "Chilli"]).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("crops", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_initial_crops, remove_initial_crops),
    ]
