from rest_framework import serializers
from anime_data.models.AnimeData import AnimeData

from anime_data.serializers.AnimeSeriesDataSerializer import AnimeSeriesDataSerializer
from anime_data.serializers.CastsDataSerializer import CastsDataSerializer
from anime_data.serializers.EpisodesDataSerializer import EpisodesDataSerializer
from anime_data.serializers.StaffsDataSerializer import StaffsDataSerializer
from anime_data.serializers.GenreDataSerializer import GenreDataSerializer
from users.serializers.ReviewAnimeSerializer import ReviewAnimeSerializer
from users.serializers.app.CustomUserIdSerializer import CustomUserIdSerializer



class AnimeDetailSerializer(serializers.ModelSerializer):
    """
    目的 :  アニメの詳細情報を取得する

    シリアライズモデル :  anime_data.models.AnimeData

    """
    seriesList = AnimeSeriesDataSerializer(many=True)
    casts = CastsDataSerializer(many=True)
    episodes = EpisodesDataSerializer(many=True)
    staffs = StaffsDataSerializer(many=True)
    genres = GenreDataSerializer(many=True)
    reviewanime_set = ReviewAnimeSerializer(many=True)
    favorite_count = CustomUserIdSerializer(many=True)

    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(AnimeDetailSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = AnimeData
        fields = ('id', 'title', 'image', 'seasonYear', 'seasonName', 'watchersCount', 'favorite_count',
                  'seriesList', 'casts', 'episodes', 'staffs', 'genres', 'reviewanime_set', 'modified')
