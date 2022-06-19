from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver

from core_models.models import TimeStampedModel
from anime_data.models.AnimeData import AnimeData


# カスタムユーザー
class CustomUser(AbstractUser):
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


# レビューしたアニメ
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

    def __str__(self):
        return str(self.id) + '-' + self.anime.title + '　　' + self.user.username


# ユーザープロフィール
class Profile(models.Model):
    user = models.OneToOneField(
        CustomUser, verbose_name="ユーザー", on_delete=models.CASCADE, null=True)
    user_icon = models.ImageField(
        "ユーザーアイコン", default="user/icon/デフォルトアイコン.png", upload_to="user/icon", blank=True, null=False)
    user_backImage = models.ImageField(
        "ユーザー背景画像", default="user/backImage/デフォルト背景画像.jpg", upload_to="user/backImage", blank=True, null=False)
    self_introduction = models.CharField(
        "自己紹介", max_length=512, default="", blank=True, null=True)


@receiver(post_save, sender=CustomUser)
def create_profile(sender, **kwargs):
    """ 新ユーザー作成時に空のprofileも作成する """
    if kwargs['created']:
        user_profile = Profile.objects.get_or_create(
            user=kwargs['instance'])


# おすすめしたいアニメをまとめたグループ
class RecommendAnimeGroup(models.Model):
    group_title = models.CharField(
        "グループ名", max_length=40, default="", blank=True, null=True)
    description = models.CharField(
        "グループ説明", max_length=512, default="", blank=True, null=True)


# おすすめしたいアニメ
class RecommendAnime(models.Model):
    recommend_group = models.ForeignKey(
        RecommendAnimeGroup, verbose_name="まとめるグループ", on_delete=models.CASCADE, null=True)
    user = models.OneToOneField(
        CustomUser, verbose_name="ユーザー", on_delete=models.CASCADE, null=True)
    anime = models.OneToOneField(
        ReviewAnime, verbose_name="おすすめしたいアニメ", on_delete=models.CASCADE, null=True)
    recommend_point = models.CharField(
        "おすすめポイント", max_length=512, default="", blank=True, null=True)
