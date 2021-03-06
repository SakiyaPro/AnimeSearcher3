# Generated by Django 3.2 on 2022-06-29 03:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_recommendanime_recommendanimegroup'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recommendanimegroup',
            name='description',
            field=models.CharField(blank=True, default='', max_length=512, null=True, verbose_name='グループ概要'),
        ),
        migrations.AlterField(
            model_name='recommendanimegroup',
            name='group_title',
            field=models.CharField(blank=True, default='', max_length=40, null=True, verbose_name='グループタイトル'),
        ),
    ]
