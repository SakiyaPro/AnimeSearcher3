# Generated by Django 3.2 on 2022-03-27 02:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0027_remove_profile_user_icon'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='user_icon',
            field=models.ImageField(blank=True, default='user/icon/デフォルトアイコン.png', upload_to='user/icon', verbose_name='ユーザーアイコン'),
        ),
    ]