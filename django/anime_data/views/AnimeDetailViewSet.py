from rest_framework import viewsets

from anime_data.models.AnimeData import AnimeData
from anime_data.serializers.app.AnimeDetailSerializer import AnimeDetailSerializer


class AnimeDetailViewSet(viewsets.ModelViewSet):
    """

    目的 :  アニメの詳細情報を取得する

    シリアライザー :  AnimeDetailSerializer

    fields => [
        'id',
        'title',            # アニメタイトル
        'image',            # サムネイル画像
        'seasonYear',       # 放送年度
        'seasonName',       # 放送季節
        'genres',           # ジャンル
        'casts',            # 声優
        'staffs',           # スタッフ・制作会社
        'episodes',         # エピソード
        'seriesList',       # シリーズ名
        'watchersCount',    # 視聴者数
        'favorite_count',   # お気に入り数
        'reviewanime_set',  # アニメのレビュー
        'modified',         # 更新日時
    ]

    """
    queryset = AnimeData.objects.order_by('?').all()
    serializer_class = AnimeDetailSerializer
