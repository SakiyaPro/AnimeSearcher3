# Generated by Django 3.2 on 2022-03-18 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0019_profile_user_backimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='user_backImage',
            field=models.ImageField(blank=True, upload_to='user/backImage', verbose_name='ユーザー背景画像'),
        ),
    ]