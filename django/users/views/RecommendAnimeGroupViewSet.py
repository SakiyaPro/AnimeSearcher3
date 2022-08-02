from rest_framework import viewsets

from users.models.RecommendAnimeGroup import RecommendAnimeGroup
from users.serializers.RecommendAnimeGroupSerializer import RecommendAnimeGroupSerializer


class RecommendAnimeGroupViewSet(viewsets.ModelViewSet):
    """

    目的 :  RecommendAnimeViewSetのグループ情報を取得する

    シリアライザー :  RecommendAnimeGroupSerializer

    fields => [
    ]

    """
    queryset = RecommendAnimeGroup.objects.all()
    serializer_class = RecommendAnimeGroupSerializer
