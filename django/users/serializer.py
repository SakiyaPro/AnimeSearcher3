from rest_framework import serializers

from users.models import CustomUser, Profile, ReviewAnime
from anime_data.models.AnimeData import AnimeData
from anime_data.serializer import AnimeDataSerializer


class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = '__all__'


class ReviewAnimeSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    anime = AnimeDataSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(), write_only=True)
    anime_id = serializers.PrimaryKeyRelatedField(
        queryset=AnimeData.objects.all(), write_only=True)

    class Meta:
        model = ReviewAnime
        fields = '__all__'

    # POST
    def create(self, validated_data):
        validated_data['user'] = validated_data.get('user_id', None)
        validated_data['anime'] = validated_data.get('anime_id', None)

        if validated_data['user'] is None:
            raise serializers.ValidationError("user not found.")
        if validated_data['anime'] is None:
            raise serializers.ValidationError("anime not found.")
        del validated_data['user_id'], validated_data['anime_id']

        return ReviewAnime.objects.create(**validated_data)

    # PUT
    def update(self, instance, validated_data):
        instance.star = validated_data.get('star', instance.star)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()
        return instance


class ProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Profile
        fields = '__all__'
