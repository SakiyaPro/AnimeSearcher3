# Generated by Django 3.2 on 2022-02-22 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_alter_reviewanime_star'),
    ]

    operations = [
        migrations.AddField(
            model_name='reviewanime',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='reviewanime',
            name='modified',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
