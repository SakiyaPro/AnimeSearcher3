from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractUser

from core_models.models import TimeStampedModel
from anime_data.models.AnimeData import AnimeData


# カスタムユーザー
class CustomUser(AbstractUser):
    username = models.CharField(
        'username', max_length=150, blank=True, null=True)
    email = models.EmailField('email', unique=True)

    # username認証からemail認証に変更
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta(AbstractUser.Meta):
        db_table = 'custom_users'


# 投稿したレビューアニメ
class ReviewAnime(TimeStampedModel):
    user = models.ForeignKey(
        CustomUser, verbose_name="ユーザー", on_delete=models.CASCADE, blank=True, null=True)
    anime = models.ForeignKey(
        AnimeData, verbose_name="レビューしたアニメ", on_delete=models.CASCADE, blank=True, null=True)
    star = models.PositiveIntegerField("レビューしたアニメの評価",
                                       validators=[
                                           MinValueValidator(1), MaxValueValidator(5)], blank=True)
    comment = models.CharField(
        "レビューコメント", max_length=512, blank=True, null=True)

    class Meta:
        constraints = [
            # 先生-レッスン実施日のペアでユニーク制約
            models.UniqueConstraint(
                fields=["user", "anime"],
                name="user_anime_unique"
            )
        ]


# ユーザープロフィール
class Profile(models.Model):
    user = models.OneToOneField(
        CustomUser, verbose_name="ユーザー", on_delete=models.CASCADE, null=True)
    user_icon = models.ImageField(
        "ユーザーアイコン", upload_to="user/icon", blank=True, null=False)
