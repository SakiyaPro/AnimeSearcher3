# Generated by Django 3.2 on 2022-02-11 04:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anime_data', '0019_alter_animedata_seasonyear'),
    ]

    operations = [
        migrations.AddField(
            model_name='animedata',
            name='story',
            field=models.TextField(blank=True, null=True, verbose_name='あらすじ'),
        ),
    ]
