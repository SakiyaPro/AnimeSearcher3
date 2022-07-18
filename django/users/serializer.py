from rest_framework import serializers

from users.models import CustomUser, Profile, ReviewAnime
from anime_data.models.AnimeData import AnimeData


# ------------------------------------------------------------
# シリアライズ -> マスタ
# ------------------------------------------------------------

class AnimeDataSerializer(serializers.ModelSerializer):
    """
    アニメマスタをシリアライズ

    シリアライズモデル :  anime_data.models.AnimeData

    """
    class Meta:
        model = AnimeData
        fields = ('id', 'title', 'image')


class ProfileSerializer(serializers.ModelSerializer):
    """
    ユーザープロフィールをシリアライズ

    シリアライズモデル :  users.models.Profile

    """

    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(ProfileSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = Profile
        fields = ('user', 'user_icon', 'user_backImage', 'self_introduction')


class TempProfileSerializer(serializers.ModelSerializer):
    # temp for ReviewAnime
    class Meta:
        model = Profile
        fields = ('id', 'user_icon', 'user_backImage', 'self_introduction')


class TempCustomUserSerializer(serializers.ModelSerializer):
    # temp for ReviewAnime
    profile = TempProfileSerializer()
    favorite_anime = AnimeDataSerializer(many=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'date_joined', 'profile', 'favorite_anime')


class ReviewAnimeSerializer(serializers.ModelSerializer):
    """
    ユーザーのレビューアニメをシリアライズ

    シリアライズモデル :  users.models.ReviewAnime

    """
    anime = AnimeDataSerializer(read_only=True)
    user = TempCustomUserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(), write_only=True)
    anime_id = serializers.PrimaryKeyRelatedField(
        queryset=AnimeData.objects.all(), write_only=True)

    class Meta:
        model = ReviewAnime
        fields = ('id', 'user', 'anime', 'user_id',
                  'anime_id', 'star', 'comment')


class CustomUserSerializer(serializers.ModelSerializer):
    """
    ユーザーマスタをシリアライズ

    シリアライズモデル :  users.models.CustomUser

    """
    reviewanime_set = ReviewAnimeSerializer(many=True)
    profile = ProfileSerializer()
    favorite_anime = AnimeDataSerializer(many=True)

    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(CustomUserSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'date_joined', 'profile',
                  'reviewanime_set', 'favorite_anime')


# ------------------------------------------------------------
# シリアライズ -> トランザクション
# ------------------------------------------------------------

class CustomUserIdSerializer(serializers.ModelSerializer):
    """
    目的 :  ユーザーのID情報をすべて取得する    ※ ISR用

    シリアライズモデル :  users.models.CustomUser

    """
    id = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ("id",)


class RecommendAnimeGroupSerializer(serializers.ModelSerializer):
    """
    目的 :  RecommendAnimeのグループ情報を取得する

    シリアライズモデル :  users.models.RecommendAnimeGroup

    """

    class Meta:
        model = CustomUser
        fields = '__all__'


class RecommendAnimeSerializer(serializers.ModelSerializer):
    """
    目的 :  RecommendAnimeのグループ情報を取得する

    シリアライズモデル :  users.models.RecommendAnime

    """
    recommend_group = RecommendAnimeGroupSerializer()
    user = CustomUserIdSerializer()
    anime = ReviewAnimeSerializer()

    class Meta:
        model = CustomUser
        fields = '__all__'
