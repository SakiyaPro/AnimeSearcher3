from rest_framework import viewsets
from rest_framework.response import Response

from anime_data.models.AnimeData import AnimeData
from anime_data.models.AnimeData import GenreData
from users.models.CustomUser import CustomUser

from anime_data.serializers.app.AnimeSimpleSerializer import AnimeSimpleSerializer

from anime_data.views.filters.AnimeDataFilter import AnimeDataFilter


class AnimeSimpleViewSet(viewsets.ModelViewSet):
    """

    目的 :  アニメの簡易情報を取得する

    シリアライザー :  AnimeSimpleSerializer
    フィルター     :  AnimeDataFilter

    fields => [
        'id',
        'title',            # アニメタイトル
        'image',            # サムネイル画像
        'seasonYear',       # 放送年度
        'seasonName',       # 放送季節
        'watchersCount',    # 視聴者数
        'favorite_count',   # お気に入り数
        'genres',           # ジャンル
        'reviewanime_set'   # アニメのレビュー
    ]

    """
    queryset = AnimeData.objects.order_by('?').all()
    serializer_class = AnimeSimpleSerializer
    filterset_class = AnimeDataFilter

    def get_seriesAnime(self, request, pk=None):
        "GET"
        result = {}
        if pk:
            result = self.queryset.filter(seriesList=pk)
        return result

    def partial_update(self, request, pk=None):
        "PATCH"
        queryset = self.queryset.get(id=pk)
        validated_data = request.data.copy()

        # favorite_count
        if validated_data.get('favorite_count_plus', ''):
            if self.request.user.id is None:
                raise ValueError("please account login")
            queryset.favorite_count.add(
                CustomUser.objects.get(id=self.request.user.id))
            return Response(f"いいねの加算が完了しました。")
        if validated_data.get('favorite_count_minus', ''):
            if self.request.user.id is None:
                raise ValueError("please account login")
            queryset.favorite_count.remove(
                CustomUser.objects.get(id=self.request.user.id))
            return Response(f"いいねの減算が完了しました。")

        # Genre remove(削除)
        if validated_data.get('remove', '') == "true":
            if validated_data.get('genre', ''):
                genre = GenreData.objects.get(genre=request.data['genre'])
                if not genre:
                    raise ValueError(
                        f"{validated_data['genre']} is not found.")
                elif not AnimeData.objects.filter(id=pk, genres=genre.id):
                    raise ValueError(
                        f"{validated_data['genre']} is not included in the animedata.")
                queryset.genres.remove(genre)
                return Response(f"ジャンル '{validated_data['genre']}' の削除が完了しました。")
        # Genre add (追加) create (作成)
        else:
            if validated_data.get('genre', ''):
                genre = GenreData.objects.get(genre=validated_data['genre'])
                if not genre:
                    raise ValueError(
                        f"{validated_data['genre']} is not found.")
                elif AnimeData.objects.filter(id=pk, genres=genre.id):
                    raise ValueError(
                        f"{validated_data['genre']} is allready")
                queryset.genres.add(genre)
                return Response(f"ジャンル '{validated_data['genre']}' の追加が完了しました。")
        return Response("リクエストが正しくありません")
