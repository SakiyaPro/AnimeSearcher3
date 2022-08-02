from rest_framework import serializers

from users.models.ReviewAnime import ReviewAnime
from users.models.Profile import Profile
from users.models.CustomUser import CustomUser
from anime_data.models.AnimeData import AnimeData

from anime_data.serializers.app.AnimeSimple2ndSerializer import AnimeSimple2ndSerializer


class TempProfileSerializer(serializers.ModelSerializer):
    # temp for ReviewAnime
    class Meta:
        model = Profile
        fields = ('id', 'user_icon', 'user_backImage', 'self_introduction')


class TempCustomUserSerializer(serializers.ModelSerializer):
    # temp for ReviewAnime, RecommendAnimeGroup
    profile = TempProfileSerializer()
    favorite_anime = AnimeSimple2ndSerializer(many=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'date_joined', 'profile', 'favorite_anime')


class ReviewAnimeSerializer(serializers.ModelSerializer):
    """
    ユーザーのレビューアニメをシリアライズ

    シリアライズモデル :  users.models.ReviewAnime

    """
    anime = AnimeSimple2ndSerializer(read_only=True)
    user = TempCustomUserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(), write_only=True)
    anime_id = serializers.PrimaryKeyRelatedField(
        queryset=AnimeData.objects.all(), write_only=True)

    class Meta:
        model = ReviewAnime
        fields = ('id', 'user', 'anime', 'user_id',
                  'anime_id', 'star', 'comment')
