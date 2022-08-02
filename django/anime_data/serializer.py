# coding: utf-8

from rest_framework import serializers, filters


from users.models import CustomUser


# ------------------------------------------------------------
# シリアライズ -> マスタ
# ------------------------------------------------------------

class CustomUserSerializer(serializers.ModelSerializer):
    """
    ユーザーマスタをシリアライズ

    シリアライズモデル :  users.models.CustomUser
    """

    class Meta:
        model = CustomUser
        fields = ("id",)


# ------------------------------------------------------------
# シリアライズ -> トランザクション
# ------------------------------------------------------------
