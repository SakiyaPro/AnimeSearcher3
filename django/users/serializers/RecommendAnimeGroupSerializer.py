from rest_framework import serializers

from users.models.RecommendAnimeGroup import RecommendAnimeGroup


class RecommendAnimeGroupSerializer(serializers.ModelSerializer):
    """
    レコメンドアニメのグループをシウリアライズ

    シリアライズモデル :  users.models.RecommendAnimeGroup

    """

    class Meta:
        model = RecommendAnimeGroup
        fields = ("id", "group_title", "description", "user")
