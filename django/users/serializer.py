from rest_framework import serializers

from users.models import CustomUser, Profile, ReviewAnime
from anime_data.models.AnimeData import AnimeData


class AnimeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimeData
        fields = ('id', 'title', 'image')


class ProfileSubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'user_icon', 'user_backImage', 'self_introduction')


class CustomUserSubSerializer(serializers.ModelSerializer):
    profile = ProfileSubSerializer()
    favorite_anime = AnimeDataSerializer(many=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'date_joined', 'profile', 'favorite_anime')


class ReviewAnimeSerializer(serializers.ModelSerializer):
    anime = AnimeDataSerializer(read_only=True)
    user = CustomUserSubSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(), write_only=True)
    anime_id = serializers.PrimaryKeyRelatedField(
        queryset=AnimeData.objects.all(), write_only=True)

    class Meta:
        model = ReviewAnime
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(ProfileSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = Profile
        fields = '__all__'


class CustomUserSerializer(serializers.ModelSerializer):
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


class CustomUserIdSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ("id",)
