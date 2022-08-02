from rest_framework import viewsets
from rest_framework.response import Response

from users.models.RecommendAnime import RecommendAnime
from users.serializers.RecommendAnimeSerializer import RecommendAnimeSerializer


class RecommendAnimeViewSet(viewsets.ModelViewSet):
    """

    目的 :  ユーザーがおすすめするアニメの情報を取得する
    ※ 本人のみ編集可能にする

    シリアライザー :  RecommendAnimeSerializer

    fields => [
    ]

    """
    queryset = RecommendAnime.objects.all()

    serializer_class = RecommendAnimeSerializer

    def create(self, request):
        "POST"

        # URLパラメータの情報をコピー
        validated_data = request.data.copy()

        # ログイン認証
        if self.request.user.id is None:
            raise ValueError("please account login")

        # ログインユーザーのおすすめアニメ(複数)を取得
        """ queryset.recommend_anime = """

        return Response(f"プロフィールを更新しました。")
