# Generated by Django 3.2 on 2022-02-01 08:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('anime_data', '0009_auto_20220201_1722'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Genre',
            new_name='GenreData',
        ),
    ]