from rest_framework import serializers, filters
from anime_data.models.AnimeData import AnimeData


class AnimeTitleSuggestSerializer(serializers.ModelSerializer):
    """
    目的 :  アニメのタイトル検索時にサジェスト（検索候補）を生成する

    シリアライズモデル :  anime_data.models.AnimeData

    """

    class Meta:
        model = AnimeData
        fields = ('title',)
