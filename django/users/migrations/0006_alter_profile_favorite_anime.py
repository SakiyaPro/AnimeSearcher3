# Generated by Django 3.2 on 2022-01-22 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anime_data', '0008_auto_20220120_1442'),
        ('users', '0005_alter_profile_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='favorite_anime',
            field=models.ManyToManyField(null=True, to='anime_data.AnimeData', verbose_name='お気に入りのアニメ'),
        ),
    ]
