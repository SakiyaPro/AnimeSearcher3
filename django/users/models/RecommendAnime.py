from django.db import models
from users.models.ReviewAnime import ReviewAnime
from users.models.RecommendAnimeGroup import RecommendAnimeGroup


class RecommendAnime(models.Model):
    """
    ユーザーがおすすめするアニメを格納するモデル
    ※ 本人のみ編集可能にする

    recommend_group : model(RecommendAnimeGroup)    # まとめるグループ
    anime           : model(ReviewAnime)            # おすすめしたいアニメ
    recommend_point : str                           # おすすめポイント
    """
    recommend_group = models.ForeignKey(
        RecommendAnimeGroup, verbose_name="まとめるグループ", on_delete=models.CASCADE, null=True, blank=False)
    anime = models.ForeignKey(
        ReviewAnime, verbose_name="おすすめしたいアニメ", on_delete=models.CASCADE, null=True, blank=False)
    recommend_point = models.CharField(
        "おすすめポイント", max_length=512, default="", null=True, blank=True)

    def __str__(self):
        return str(self.anime)
