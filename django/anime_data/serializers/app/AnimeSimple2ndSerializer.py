from rest_framework import serializers

from anime_data.models.AnimeData import AnimeData


class AnimeSimple2ndSerializer(serializers.ModelSerializer):
    """
    アニメマスタをシリアライズ

    シリアライズモデル :  anime_data.models.AnimeData

    """
    class Meta:
        model = AnimeData
        fields = ('id', 'title', 'image')
