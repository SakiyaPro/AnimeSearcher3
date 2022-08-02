from rest_framework import serializers
from anime_data.models.AnimeData import GenreData


class GenreDataSerializer(serializers.ModelSerializer):
    """
    アニメのジャンルマスタをシリアライズ

    シリアライズモデル :  anime_data.models.GenreData
    """

    class Meta:
        model = GenreData
        fields = ("genre",)
