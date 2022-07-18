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


# ------------------------------------------------------------
# シリアライズ -> マスタ
# ------------------------------------------------------------

class AnimeSeriesDataSerializer(serializers.ModelSerializer):
    """
    アニメのシリーズマスタをシリアライズ

    シリアライズモデル :  anime_data.models.AnimeSeriesData

    """

    class Meta:
        model = AnimeSeriesData
        fields = ("id", "name")


class CharacterDataSerializer(serializers.ModelSerializer):
    """
    アニメのキャラクタマスタをシリアライズ

    シリアライズモデル :  anime_data.models.CharacterData
    """

    class Meta:
        model = CharacterData
        fields = ("id", "name")


class PersonDataSerializer(serializers.ModelSerializer):
    """
    アニメのパーソンマスタをシリアライズ

    シリアライズモデル :  anime_data.models.PersonData
    """

    class Meta:
        model = PersonData
        fileds = ("id", "name")


class CastsDataSerializer(serializers.ModelSerializer):
    """
    アニメの声優（キャスト）マスタをシリアライズ

    シリアライズモデル :  anime_data.models.CastsData
    """
    character = CharacterDataSerializer(many=True)
    # person = PersonDataSerializer(many=True)

    class Meta:
        model = CastsData
        exclude = ("id", "created", "modified", 'person', 'sortNumber')


class EpisodesDataSerializer(serializers.ModelSerializer):
    """
    アニメのエピソードマスタをシリアライズ

    シリアライズモデル :  anime_data.models.EpisodesData
    """

    class Meta:
        model = EpisodesData
        exclude = ("number", "numberText", "title")


class StaffsDataSerializer(serializers.ModelSerializer):
    """
    アニメのスタッフマスタ（制作会社含む）をシリアライズ

    シリアライズモデル :  anime_data.models.StaffsData
    """

    class Meta:
        model = StaffsData
        fields = ("name", "roleOther")


class GenreDataSerializer(serializers.ModelSerializer):
    """
    アニメのジャンルマスタをシリアライズ

    シリアライズモデル :  anime_data.models.GenreData
    """

    class Meta:
        model = GenreData
        fields = ("genre",)


class ReviewAnimeSerializer(serializers.ModelSerializer):
    """
    ユーザーがレビューしたアニメマスタをシリアライズ

    シリアライズモデル :  users.models.ReviewAnime
    """

    class Meta:
        model = ReviewAnime
        exclude = ("created",)


class CustomUserSerializer(serializers.ModelSerializer):
    """
    ユーザーマスタをシリアライズ

    シリアライズモデル :  users.models.CustomUser
    """

    class Meta:
        model = CustomUser
        fields = ("id",)


# ------------------------------------------------------------
# シリアライズ -> トランザクション
# ------------------------------------------------------------

class AnimeDataSerializer(serializers.ModelSerializer):
    """
    目的 :  アニメの簡易情報を取得する

    シリアライズモデル :  anime_data.models.AnimeData

    """
    genres = GenreDataSerializer(many=True)
    reviewanime_set = ReviewAnimeSerializer(many=True)
    favorite_count = CustomUserSerializer(many=True)

    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(AnimeDataSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = AnimeData
        fields = ('id', 'title', 'image', 'seasonYear', 'seasonName',
                  'watchersCount', 'favorite_count', 'genres', 'reviewanime_set')


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
    favorite_count = CustomUserSerializer(many=True)

    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(AnimeDetailSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = AnimeData
        fields = ('id', 'title', 'image', 'seasonYear', 'seasonName', 'watchersCount', 'favorite_count',
                  'seriesList', 'casts', 'episodes', 'staffs', 'genres', 'reviewanime_set', 'modified')


class AnimeIdSerializer(serializers.ModelSerializer):
    """
    目的 :  アニメのIDを取得する

    シリアライズモデル :  anime_data.models.AnimeData

    """
    id = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = AnimeData
        fields = ("id",)


class AnimeTitleSuggestSerializer(serializers.ModelSerializer):
    """
    目的 :  アニメのタイトル検索時にサジェスト（検索候補）を生成する

    シリアライズモデル :  anime_data.models.AnimeData

    """

    class Meta:
        model = AnimeData
        fields = ('title',)
