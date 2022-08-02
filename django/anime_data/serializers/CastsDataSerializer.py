from rest_framework import serializers
from anime_data.models.CastsData import CastsData
from anime_data.serializers.CharacterDataSerializer import CharacterDataSerializer


class CastsDataSerializer(serializers.ModelSerializer):
    """
    アニメの声優（キャスト）マスタをシリアライズ

    シリアライズモデル :  anime_data.models.CastsData
    """
    character = CharacterDataSerializer(many=True)
    # person = PersonDataSerializer(many=True)

    class Meta:
        model = CastsData
        exclude = ("id", "created", "modified", 'person', 'sortNumber')
