# Generated by Django 3.2 on 2022-02-28 05:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('anime_data', '0022_auto_20220222_1706'),
        ('users', '0013_auto_20220222_1803'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reviewanime',
            name='anime',
        ),
        migrations.AddField(
            model_name='reviewanime',
            name='anime',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='anime_data.animedata', verbose_name='レビューしたアニメ'),
        ),
        migrations.RemoveField(
            model_name='reviewanime',
            name='user',
        ),
        migrations.AddField(
            model_name='reviewanime',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='ユーザー'),
        ),
    ]
