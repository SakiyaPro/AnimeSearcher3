from rest_framework import serializers

from users.models.CustomUser import CustomUser


class CustomUserIdSerializer(serializers.ModelSerializer):
    """
    目的 :  ユーザーのID情報をすべて取得する    ※ ISR用

    シリアライズモデル :  users.models.CustomUser

    """
    id = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ("id",)
