from rest_framework import viewsets

from users.models.CustomUser import CustomUser
from users.serializers.app.CustomUserIdSerializer import CustomUserIdSerializer


class CustomUserIdViewSet(viewsets.ModelViewSet):
    """

    目的 :  ユーザーのID情報をすべて取得する    ※ ISR用

    シリアライザー :  CustomUserIdSerializer

    fields => [
        id         # user_id
    ]

    """
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserIdSerializer
