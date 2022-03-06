# coding: utf-8

from rest_framework import serializers, filters

from anime_data.models.AnimeData import AnimeData, GenreData
from anime_data.models.AnimeSeriesData import AnimeSeriesData
from anime_data.models.CastsData import CastsData
from anime_data.models.CharacterData import CharacterData
from anime_data.models.EpisodesData import EpisodesData
from anime_data.models.PersonData import PersonData
from anime_data.models.StaffsData import StaffsData
from users.models import ReviewAnime


# AnimeData.seriesList
class AnimeSeriesDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimeSeriesData
        exclude = ("id", "created", "modified")

# CastsData.character
class CharacterDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CharacterData
        exclude = ("id", "created", "modified")

# CastsData.Person
class PersonDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonData
        exclude = ("id", "created", "modified")

# AnimeData.casts
class CastsDataSerializer(serializers.ModelSerializer):
    character = CharacterDataSerializer(many=True)
    person = PersonDataSerializer(many=True)
    class Meta:
        model = CastsData
        exclude = ("id", "created", "modified")

# AnimeData.episodes
class EpisodesDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EpisodesData
        exclude = ("id", "created", "modified")

# AnimeData.staffs
class StaffsDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffsData
        exclude = ("id", "created", "modified")

# AnimeData.genre
class GenreDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenreData
        exclude = ("id", "created", "modified")

# AnimeData.reviewanime
class ReviewAnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewAnime
        exclude = ("id", "created")

### AnimeData
class AnimeDataSerializer(serializers.ModelSerializer):
    seriesList = AnimeSeriesDataSerializer(many=True)
    casts = CastsDataSerializer(many=True)
    episodes = EpisodesDataSerializer(many=True)
    staffs = StaffsDataSerializer(many=True)
    genres = GenreDataSerializer(many=True)
    reviewanime_set = ReviewAnimeSerializer(many=True)
    class Meta:
        model = AnimeData
        exclude = ("created", "modified")
 