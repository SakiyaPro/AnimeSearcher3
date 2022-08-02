from rest_framework import viewsets

from anime_data.models.AnimeData import AnimeData
from anime_data.serializers.app.AnimeIdSerializer import AnimeIdSerializer


class AnimeIdViewSet(viewsets.ModelViewSet):
    """

    目的 :  アニメのID情報をすべて取得する      ※ ISR用

    シリアライザー :  AnimeIdSerializer

    fields => [
        'id',       # anime_id
    ]

    """
    queryset = AnimeData.objects.order_by('id').all()
    serializer_class = AnimeIdSerializer
