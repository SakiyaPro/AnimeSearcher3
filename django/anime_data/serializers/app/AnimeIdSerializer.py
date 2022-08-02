from rest_framework import serializers
from anime_data.models.AnimeData import AnimeData


class AnimeIdSerializer(serializers.ModelSerializer):
    """
    目的 :  アニメのIDを取得する

    シリアライズモデル :  anime_data.models.AnimeData

    """
    id = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = AnimeData
        fields = ("id",)
