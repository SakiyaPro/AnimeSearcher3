# Generated by Django 3.2 on 2022-02-28 05:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_alter_reviewanime_star'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reviewanime',
            name='user',
        ),
    ]
