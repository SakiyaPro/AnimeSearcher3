# Generated by Django 3.2 on 2022-02-09 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anime_data', '0018_animedata_media'),
    ]

    operations = [
        migrations.AlterField(
            model_name='animedata',
            name='seasonYear',
            field=models.IntegerField(blank=True, null=True, verbose_name='放送年'),
        ),
    ]