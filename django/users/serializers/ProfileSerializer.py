from rest_framework import serializers

from users.models.Profile import Profile


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
