from rest_framework import serializers
from anime_data.models.AnimeData import AnimeData

from anime_data.serializers.GenreDataSerializer import GenreDataSerializer
from users.serializers.ReviewAnimeSerializer import ReviewAnimeSerializer
from users.serializers.app.CustomUserIdSerializer import CustomUserIdSerializer



class AnimeSimpleSerializer(serializers.ModelSerializer):
    """
    目的 :  アニメの簡易情報を取得する

    シリアライズモデル :  anime_data.models.AnimeData

    """
    genres = GenreDataSerializer(many=True)
    reviewanime_set = ReviewAnimeSerializer(many=True)
    favorite_count = CustomUserIdSerializer(many=True)

    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(AnimeSimpleSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = AnimeData
        fields = ('id', 'title', 'image', 'seasonYear', 'seasonName',
                  'watchersCount', 'favorite_count', 'genres', 'reviewanime_set')
