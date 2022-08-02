from rest_framework import viewsets

from anime_data.models.CharacterData import CharacterData
from anime_data.serializers.CharacterDataSerializer import CharacterDataSerializer


class CharacterDataViewSet(viewsets.ModelViewSet):
    """

    目的 :  アニメマスタに格納しているキャラクタデータをすべて取得

    シリアライザー :  CharacterDataSerializer

    fields => [
        'id'
        'name'      # キャラクタ名前
    ]

    """
    queryset = CharacterData.objects.order_by('annictId').all()
    serializer_class = CharacterDataSerializer
    filter_fields = ("annictId",
                     "name",
                     "nameEn",
                     "nameKana",
                     "nickname",
                     "nicknameEn",
                     "age",
                     "ageEn",
                     "birthday",
                     "bloodType",
                     "birthdayEn",
                     "height",
                     "heightEn",
                     "weight",
                     "weightEn",
                     "nationality",
                     "nationalityEn",
                     "occupation",
                     "occupationEn",
                     "favoriteCharactersCount",
                     "series")
