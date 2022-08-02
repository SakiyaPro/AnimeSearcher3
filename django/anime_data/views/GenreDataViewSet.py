from rest_framework import viewsets

from anime_data.models.AnimeData import GenreData
from anime_data.serializers.GenreDataSerializer import GenreDataSerializer


class GenreDataViewSet(viewsets.ModelViewSet):
    """

    目的 :  アニメマスタに格納しているジャンルデータをすべて取得

    シリアライザー :  GenreDataSerializer

    fields => [
        'genre'     # アニメジャンル
    ]

    """
    queryset = GenreData.objects.order_by('id').all()
    serializer_class = GenreDataSerializer
