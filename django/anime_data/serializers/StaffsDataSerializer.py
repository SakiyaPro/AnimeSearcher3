from rest_framework import serializers
from anime_data.models.StaffsData import StaffsData


class StaffsDataSerializer(serializers.ModelSerializer):
    """
    アニメのスタッフマスタ（制作会社含む）をシリアライズ

    シリアライズモデル :  anime_data.models.StaffsData
    """

    class Meta:
        model = StaffsData
        fields = ("name", "roleOther")
