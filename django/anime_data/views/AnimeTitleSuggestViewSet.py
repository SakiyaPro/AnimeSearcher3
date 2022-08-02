from rest_framework import viewsets

from anime_data.models.AnimeData import AnimeData
from anime_data.serializers.app.AnimeTitleSuggestSerializer import AnimeTitleSuggestSerializer


class AnimeTitleSuggestViewSet(viewsets.ModelViewSet):
    """

    目的 :  アニメのタイトル検索時にサジェスト（検索候補）を生成する

    シリアライザー :  AnimeTitleSuggestSerializer

    fields => [
        'title'     # アニメタイトル
    ]

    """
    queryset = AnimeData.objects.order_by('-watchersCount').all()
    serializer_class = AnimeTitleSuggestSerializer

    def get_queryset(self):
        "GET"
        title = self.request.GET.get("title")
        queryset = self.queryset.filter(title__icontains=title)
        return queryset
