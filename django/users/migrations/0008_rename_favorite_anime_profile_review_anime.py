# Generated by Django 3.2 on 2022-02-22 07:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_alter_profile_favorite_anime'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='favorite_anime',
            new_name='review_anime',
        ),
    ]
