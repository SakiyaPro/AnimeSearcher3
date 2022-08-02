from django.contrib.auth.models import AbstractUser
from django.db import models
from anime_data.models.AnimeData import AnimeData


class CustomUser(AbstractUser):
    """
    カスタムユーザーモデル

    username        : str               # ユーザーの名前
    email           : e-mail            # ユーザーのEメール
    favorite_anime  : model(AnimeData)  # ユーザーのお気に入りアニメ
    """
    username = models.CharField(
        'username', max_length=150, unique=True, blank=True, null=True)
    email = models.EmailField('email', unique=True)
    favorite_anime = models.ManyToManyField(
        AnimeData, related_name="favorite_count", blank=True)

    # username認証からemail認証に変更
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta(AbstractUser.Meta):
        db_table = 'custom_users'
