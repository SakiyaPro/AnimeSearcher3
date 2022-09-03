from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from users.models.CustomUser import CustomUser
from users.serializers.CustomUserSerializer import CustomUserSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    """

    目的 :  ユーザーの情報を取得する

    シリアライザー :  CustomUserSerializer

    field => [
        'id',
        'username',         # ユーザー名
        'date_joined',      # 登録日時
        'profile',          # プロフィール
        'reviewanime_set',  # レビューアニメ
        'favorite_anime'    # お気に入りアニメ
    ]

    """
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        "GET"
        return self.queryset.filter(id=self.request.user.id)

    def partial_update(self, request, pk=None):
        "PATCH"
        queryset = self.queryset.get(id=self.request.user.id)
        validated_data = request.data.copy()
        print(validated_data)

        username = validated_data.get("username", None)

        if username:
            # 既に使用されている名前の場合は500を返す
            if CustomUser.objects.exclude(id=pk).filter(username=username):
                return Response({"username": "この名前は既に使用されています。"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            queryset.username = username
            queryset.save()
        return Response(f"ユーザー情報を更新しました。")

    @action(detail=True, methods=["POST"])
    def has_staff(self, request, pk=None):
        "指定されたアカウントにスタッフ権限があるか"
        is_staff = self.queryset.get(id=pk).is_staff
        if is_staff:
            return Response(f"True")
        else:
            return Response(f"")
