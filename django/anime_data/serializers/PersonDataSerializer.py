from rest_framework import serializers
from anime_data.models.PersonData import PersonData


class PersonDataSerializer(serializers.ModelSerializer):
    """
    アニメのパーソンマスタをシリアライズ

    シリアライズモデル :  anime_data.models.PersonData
    """

    class Meta:
        model = PersonData
        fileds = ("id", "name")
