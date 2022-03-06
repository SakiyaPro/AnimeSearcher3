# Generated by Django 3.2 on 2022-02-28 05:25

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_auto_20220228_1408'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviewanime',
            name='star',
            field=models.PositiveIntegerField(blank=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)], verbose_name='レビューしたアニメの評価'),
        ),
    ]
