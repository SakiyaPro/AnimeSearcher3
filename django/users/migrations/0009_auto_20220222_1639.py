# Generated by Django 3.2 on 2022-02-22 07:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('anime_data', '0021_alter_genredata_genre'),
        ('users', '0008_rename_favorite_anime_profile_review_anime'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='review_anime',
        ),
        migrations.CreateModel(
            name='ReviewAnime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('star', models.PositiveIntegerField(blank=True, max_length=5, verbose_name='レビューしたアニメの評価')),
                ('comment', models.CharField(blank=True, max_length=512, null=True, verbose_name='レビューコメント')),
                ('anime', models.ManyToManyField(blank=True, to='anime_data.AnimeData', verbose_name='レビューしたアニメ')),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='ユーザー')),
            ],
        ),
    ]