from django.db import models
from users.models.CustomUser import CustomUser

from django.dispatch import receiver
from django.db.models.signals import post_save


class Profile(models.Model):
    """
    ユーザープロフィールを格納するモデル

    user      : model(CustomUser)
    user_icon : image
    user_backImage    : image
    self_introduction : str
    """
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
    """
    新ユーザー作成時に空のprofileも作成するオーバーライド(?)関数
    """
    if kwargs['created']:
        user_profile = Profile.objects.get_or_create(
            user=kwargs['instance'])
