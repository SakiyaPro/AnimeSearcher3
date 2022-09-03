from rest_framework import serializers

from users.models.CustomUser import CustomUser

from users.serializers.ProfileSerializer import ProfileSerializer
from users.serializers.ReviewAnimeSerializer import ReviewAnimeSerializer
from anime_data.serializers.app.AnimeSimple2ndSerializer import AnimeSimple2ndSerializer


class CustomUserSerializer(serializers.ModelSerializer):
    """
    ユーザーマスタをシリアライズ

    シリアライズモデル :  users.models.CustomUser

    """
    reviewanime_set = ReviewAnimeSerializer(many=True)
    profile = ProfileSerializer()
    favorite_anime = AnimeSimple2ndSerializer(many=True)

    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(CustomUserSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'is_staff', 'date_joined', 'profile',
                  'reviewanime_set', 'favorite_anime')
