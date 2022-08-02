from rest_framework import serializers
from anime_data.models.AnimeSeriesData import AnimeSeriesData


class AnimeSeriesDataSerializer(serializers.ModelSerializer):
    """
    アニメのシリーズマスタをシリアライズ

    シリアライズモデル :  anime_data.models.AnimeSeriesData

    """

    class Meta:
        model = AnimeSeriesData
        fields = ("id", "name")
