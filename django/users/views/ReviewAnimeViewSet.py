from rest_framework import viewsets
from rest_framework.response import Response

from users.models.ReviewAnime import ReviewAnime
from users.models.CustomUser import CustomUser
from anime_data.models.AnimeData import AnimeData

from users.serializers.ReviewAnimeSerializer import ReviewAnimeSerializer
from users.views.filters.ReviewAnimeFilter import ReviewAnimeFilter


class ReviewAnimeViewSet(viewsets.ModelViewSet):
    """

    目的 :  ユーザーがレビューしたアニメ情報を取得する

    シリアライザー :  ReviewAnimeSerializer
    フィルター     :  ReviewAnimeFilter

    fields => [
        'id',
        'user',         # レビューユーザーの情報
        'anime',        # レビューアニメの情報
        'user_id',      # ユーザーID    ※ POST用
        'anime_id',     # アニメID      ※ POST用
        'star',         # 評価星
        'comment'       # レビュー文
    ]

    """
    queryset = ReviewAnime.objects.all().order_by('-modified')
    serializer_class = ReviewAnimeSerializer
    filter_class = ReviewAnimeFilter

    def create(self, request):
        "POST"
        if self.request.user.id is None:
            raise ValueError("please account login")

        validated_data = request.data.copy()
        if validated_data['anime_id'] is None:
            raise ValueError("anime not found.")

        user = CustomUser.objects.all().get(id=self.request.user.id)
        anime = AnimeData.objects.all().get(id=validated_data['anime_id'])
        del validated_data['anime_id']

        validated_data['user'] = user
        validated_data['anime'] = anime

        ReviewAnime.objects.create(**validated_data)

        return Response(f"アニメレビューを作成しました。")

    def partial_update(self, request, pk=None):
        "PATCH"
        if self.request.user.id is None:
            ValueError("please account login")

        queryset = self.queryset.get(id=pk)
        validated_data = request.data.copy()

        star = validated_data.get("star", None)
        comment = validated_data.get("comment", None)

        if star:
            queryset.star = star
            queryset.save()
        if comment:
            queryset.comment = comment
            queryset.save()
        return Response(f"アニメレビューを更新しました。")
