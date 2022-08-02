from rest_framework import viewsets
from rest_framework.response import Response

from users.models.Profile import Profile
from users.models.CustomUser import CustomUser
from users.serializers.ProfileSerializer import ProfileSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    """

    目的 :  ユーザーのプロフィール情報を取得する

    シリアライザー :  ProfileSerializer

    fields => [
        'user',                 # ユーザー情報
        'user_icon',            # アイコン
        'user_backImage',       # 背景画像
        'self_introduction'     # 自己紹介
    ]

    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        "GET"
        return Profile.objects.filter(user=self.request.user)

    def create(self, request):
        "POST"
        if self.request.user.id is None:
            raise ValueError("please account login")

        user = CustomUser.objects.all().get(id=self.request.user.id)

        self.queryset.create(user=user)

        return Response(f"プロフィールを作成しました。")

    def partial_update(self, request, pk=None):
        "PATCH"
        if self.request.user.id is None:
            ValueError("please account login")

        queryset = self.queryset.get(id=pk)
        validated_data = request.data.copy()

        user_icon = validated_data.get("user_icon", None)
        user_backImage = validated_data.get("user_backImage", None)
        self_introduction = validated_data.get("self_introduction", None)
        print(user_icon)
        print(user_backImage)
        print(self_introduction)

        if user_icon:
            queryset.user_icon = user_icon
            queryset.save()
        if user_backImage:
            queryset.user_backImage = user_backImage
            queryset.save()
        if self_introduction or self_introduction == "":
            queryset.self_introduction = self_introduction
            queryset.save()
        return Response(f"プロフィールを更新しました。")
