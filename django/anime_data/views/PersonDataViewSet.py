from rest_framework import viewsets

from anime_data.models.PersonData import PersonData
from anime_data.serializers.PersonDataSerializer import PersonDataSerializer


class PersonDataViewSet(viewsets.ModelViewSet):
    """

    目的 :  アニメマスタに格納しているパーソンデータをすべて取得

    シリアライザー :  CharacterDataSerializer

    fields => [
        'id'
        'name'      # パーソン名前
    ]

    """
    queryset = PersonData.objects.order_by('annictId').all()
    serializer_class = PersonDataSerializer
    filter_fields = ("annictId",
                     "name",
                     "nameEn",
                     "nameKana",
                     "nickname",
                     "nicknameEn",
                     "birthday",
                     "bloodType",
                     "genderText",
                     "height",
                     "castsCount",
                     "favoritePeopleCount")
