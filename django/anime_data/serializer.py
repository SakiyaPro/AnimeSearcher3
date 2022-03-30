# coding: utf-8

from rest_framework import serializers, filters

from anime_data.models.AnimeData import AnimeData, GenreData
from anime_data.models.AnimeSeriesData import AnimeSeriesData
from anime_data.models.CastsData import CastsData
from anime_data.models.CharacterData import CharacterData
from anime_data.models.EpisodesData import EpisodesData
from anime_data.models.PersonData import PersonData
from anime_data.models.StaffsData import StaffsData
from users.models import CustomUser, ReviewAnime


# AnimeData.seriesList
class AnimeSeriesDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimeSeriesData
        fields = ("id", "name")

# CastsData.character


class CharacterDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CharacterData
        fields = ("id", "name")

# CastsData.Person


class PersonDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonData
        fileds = ("id", "name")

# AnimeData.casts


class CastsDataSerializer(serializers.ModelSerializer):
    character = CharacterDataSerializer(many=True)
    # person = PersonDataSerializer(many=True)

    class Meta:
        model = CastsData
        exclude = ("id", "created", "modified", 'person', 'sortNumber')

# AnimeData.episodes


class EpisodesDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EpisodesData
        exclude = ("number", "numberText", "title")

# AnimeData.staffs


class StaffsDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffsData
        fields = ("name", "roleOther")

# AnimeData.genre


class GenreDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenreData
        exclude = ("id", "created", "modified",)

# AnimeData.reviewanime


class ReviewAnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewAnime
        exclude = ("created",)

# AnimeData.favorite_count


class FavoriteCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id",)

# AnimeData


class AnimeDataSerializer(serializers.ModelSerializer):
    genres = GenreDataSerializer(many=True)
    reviewanime_set = ReviewAnimeSerializer(many=True)
    favorite_count = FavoriteCountSerializer(many=True)

    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(AnimeDataSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = AnimeData
        fields = ('id', 'title', 'image', 'seasonYear', 'seasonName',
                  'watchersCount', 'favorite_count', 'genres', 'reviewanime_set')


class AnimeDetailSerializer(serializers.ModelSerializer):
    seriesList = AnimeSeriesDataSerializer(many=True)
    casts = CastsDataSerializer(many=True)
    episodes = EpisodesDataSerializer(many=True)
    staffs = StaffsDataSerializer(many=True)
    genres = GenreDataSerializer(many=True)
    reviewanime_set = ReviewAnimeSerializer(many=True)
    favorite_count = FavoriteCountSerializer(many=True)

    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(AnimeDetailSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = AnimeData
        fields = ('id', 'title', 'image', 'seasonYear', 'seasonName', 'watchersCount', 'favorite_count',
                  'modified', 'seriesList', 'casts', 'episodes', 'staffs', 'genres', 'reviewanime_set')


class AnimeIdSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = AnimeData
        fields = ("id",)


class AnimeTitleSuggestSerializer(serializers.ModelSerializer):

    class Meta:
        model = AnimeData
        fields = ('title',)
