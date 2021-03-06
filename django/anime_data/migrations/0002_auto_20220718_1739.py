# Generated by Django 3.2 on 2022-07-18 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anime_data', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='characterdata',
            name='height',
            field=models.TextField(blank=True, null=True, verbose_name='身長'),
        ),
        migrations.AlterField(
            model_name='characterdata',
            name='heightEn',
            field=models.TextField(blank=True, null=True, verbose_name='身長EN'),
        ),
        migrations.AlterField(
            model_name='characterdata',
            name='weight',
            field=models.TextField(blank=True, null=True, verbose_name='体重'),
        ),
        migrations.AlterField(
            model_name='characterdata',
            name='weightEn',
            field=models.TextField(blank=True, null=True, verbose_name='体重EN'),
        ),
    ]
