from core_models.models import TimeStampedModel

from django.db import models
from users.models.CustomUser import CustomUser
from anime_data.models.AnimeData import AnimeData

from django.core.validators import MaxValueValidator, MinValueValidator



class ReviewAnime(TimeStampedModel):
    """
    ユーザーがレビューしたアニメを格納するモデル

    user     : model(CustomUser)    # レビューしたユーザー
    anime    : model(AnimeData)     # レビューしたアニメ
    star     : int (1 - 5)          # 評価星
    comment  : str                  # レビュー文
    """
    user = models.ForeignKey(
        CustomUser, verbose_name="ユーザー", on_delete=models.CASCADE, blank=True, null=True)
    anime = models.ForeignKey(
        AnimeData, verbose_name="レビューしたアニメ", on_delete=models.CASCADE, blank=True, null=True)
    star = models.PositiveIntegerField("レビューしたアニメの評価",
                                       validators=[
                                           MinValueValidator(1), MaxValueValidator(5)], blank=True)
    comment = models.TextField(
        "レビューコメント", max_length=512, blank=True, null=True)

    class Meta:
        constraints = [
            # 先生-レッスン実施日のペアでユニーク制約
            models.UniqueConstraint(
                fields=["user", "anime"],
                name="user_anime_unique"
            )
        ]

    def __str__(self):
        return str(self.id) + '-' + self.anime.title + '　　' + self.user.username
