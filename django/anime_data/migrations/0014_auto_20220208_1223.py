# Generated by Django 3.2 on 2022-02-08 03:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anime_data', '0013_auto_20220207_1755'),
    ]

    operations = [
        migrations.AlterField(
            model_name='animedata',
            name='casts',
            field=models.ManyToManyField(blank=True, to='anime_data.CastsData'),
        ),
        migrations.AlterField(
            model_name='animedata',
            name='episodes',
            field=models.ManyToManyField(blank=True, to='anime_data.EpisodesData'),
        ),
        migrations.AlterField(
            model_name='animedata',
            name='seriesList',
            field=models.ManyToManyField(blank=True, to='anime_data.AnimeSeriesData'),
        ),
        migrations.AlterField(
            model_name='animedata',
            name='staffs',
            field=models.ManyToManyField(blank=True, to='anime_data.StaffsData'),
        ),
    ]