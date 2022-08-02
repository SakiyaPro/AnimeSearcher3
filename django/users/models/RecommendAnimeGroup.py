from django.db import models
from users.models.CustomUser import CustomUser
from anime_data.models.AnimeData import AnimeData


class RecommendAnimeGroup(models.Model):
    """
    RecommendAnimeモデルをグループで紐づけするモデル

    ENDPOINT:GET -> /users/recommend_anime_group

    group_title   : str
    description   : str
    user          : models(CustomUser)  # 管理ユーザー
    """
    group_title = models.CharField(
        "グループタイトル", max_length=40, default="おすすめアニメ", null=True, blank=False)
    description = models.TextField(
        "グループ概要", max_length=512, default="", null=True, blank=True)
    user = models.ForeignKey(
        CustomUser, verbose_name="管理ユーザー", on_delete=models.CASCADE, null=True, blank=False)
    favorite_count = models.ManyToManyField(
        CustomUser, related_name="いいね数", blank=True)

    def __str__(self):
        return str(self.group_title) + "　（管理ユーザー：" + str(self.user.username) + "）"
