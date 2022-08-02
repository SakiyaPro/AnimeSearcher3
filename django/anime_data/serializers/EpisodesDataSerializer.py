from rest_framework import serializers
from anime_data.models.EpisodesData import EpisodesData


class EpisodesDataSerializer(serializers.ModelSerializer):
    """
    アニメのエピソードマスタをシリアライズ

    シリアライズモデル :  anime_data.models.EpisodesData
    """

    class Meta:
        model = EpisodesData
        exclude = ("number", "numberText", "title")
