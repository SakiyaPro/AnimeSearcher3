from anime_data.models.AnimeData import AnimeData
from users.serializer import CustomUserIdSerializer, CustomUserSerializer, ProfileSerializer, ReviewAnimeSerializer
from users.models import CustomUser, Profile, ReviewAnime
from django_filters import rest_framework as filters
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
import json


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return CustomUser.objects.filter(id=self.request.user.id)

    # PATCH
    def partial_update(self, request, pk=None):
        queryset = self.queryset.get(id=self.request.user.id)
        validated_data = request.data.copy()
        print(validated_data)

        username = validated_data.get("username", None)

        if username:
            # 既に使用されている名前の場合は500を返す
            if CustomUser.objects.exclude(id=pk).filter(username=username):
                return Response({"username":"この名前は既に使用されています。"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            queryset.username = username
            queryset.save()
        return Response(f"ユーザー情報を更新しました。")


class ReviewAnimeFilter(filters.FilterSet):
    # filter => user_id
    user_id = filters.CharFilter(
        field_name="user", method='filter_user_id')
    # filter => anime_id
    anime_id = filters.CharFilter(
        field_name="anime", method='filter_anime_id')

    class Meta:
        model = ReviewAnime
        # フィルタを列挙する。
        # デフォルトの検索方法でいいなら、モデルフィールド名のフィルタを直接定義できる。
        fields = '__all__'

    def filter_user_id(self, queryset, name, value):
        # 複数の annictId をフィルタリング
        if value:
            queryset = queryset.filter(user=int(value))
        return queryset

    def filter_anime_id(self, queryset, name, value):
        # 複数の annictId をフィルタリング
        if value:
            queryset = queryset.filter(anime=int(value))
        return queryset


class ReviewAnimeViewSet(viewsets.ModelViewSet):
    queryset = ReviewAnime.objects.all().order_by('-modified')
    serializer_class = ReviewAnimeSerializer
    filter_class = ReviewAnimeFilter

    # POST
    def create(self, request):
        if self.request.user.id is None:
            raise ValueError("please account login")

        validated_data = request.data.copy()
        if validated_data['anime_id'] is None:
            raise ValueError("anime not found.")

        user = CustomUser.objects.all().get(id=self.request.user.id)
        anime = AnimeData.objects.all().get(id=validated_data['anime_id'])
        del validated_data['anime_id']

        validated_data['user'] = user
        validated_data['anime'] = anime

        ReviewAnime.objects.create(**validated_data)

        return Response(f"アニメレビューを作成しました。")

    # PATCH
    def partial_update(self, request, pk=None):
        if self.request.user.id is None:
            ValueError("please account login")

        queryset = self.queryset.get(id=pk)
        validated_data = request.data.copy()

        star = validated_data.get("star", None)
        comment = validated_data.get("comment", None)

        if star:
            queryset.star = star
            queryset.save()
        if comment:
            queryset.comment = comment
            queryset.save()
        return Response(f"アニメレビューを更新しました。")


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

    # POST
    def create(self, request):
        if self.request.user.id is None:
            raise ValueError("please account login")

        user = CustomUser.objects.all().get(id=self.request.user.id)

        self.queryset.create(user=user)

        return Response(f"プロフィールを作成しました。")

    # PATCH
    def partial_update(self, request, pk=None):
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


class CustomUserIdViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserIdSerializer
