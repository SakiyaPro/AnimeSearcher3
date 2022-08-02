from rest_framework import serializers
from anime_data.models.CharacterData import CharacterData


class CharacterDataSerializer(serializers.ModelSerializer):
    """
    アニメのキャラクタマスタをシリアライズ

    シリアライズモデル :  anime_data.models.CharacterData
    """

    class Meta:
        model = CharacterData
        fields = ("id", "name")
