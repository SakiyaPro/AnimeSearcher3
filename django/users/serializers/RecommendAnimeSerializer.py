from rest_framework import serializers

from users.models.RecommendAnime import RecommendAnime

from users.serializers.ReviewAnimeSerializer import ReviewAnimeSerializer
from users.serializers.RecommendAnimeGroupSerializer import RecommendAnimeGroupSerializer


class RecommendAnimeSerializer(serializers.ModelSerializer):
    """
    レコメンドアニメをシリアライズ

    シリアライズモデル :  users.models.RecommendAnime

    """
    recommend_group = RecommendAnimeGroupSerializer()
    anime = ReviewAnimeSerializer()

    class Meta:
        model = RecommendAnime
        fields = '__all__'
