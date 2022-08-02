from users.models.CustomUser import CustomUser
from users.models.Profile import Profile
from users.models.ReviewAnime import ReviewAnime
from users.models.RecommendAnime import RecommendAnime
from users.models.RecommendAnimeGroup import RecommendAnimeGroup
from anime_data.models.AnimeData import AnimeData

from users.serializers.app.CustomUserIdSerializer import CustomUserIdSerializer
from users.serializers. CustomUserSerializer import CustomUserSerializer
from users.serializers.ProfileSerializer import ProfileSerializer
from users.serializers.ReviewAnimeSerializer import ReviewAnimeSerializer
from users.serializers.RecommendAnimeGroupSerializer import RecommendAnimeGroupSerializer
from users.serializers.RecommendAnimeSerializer import RecommendAnimeSerializer


from django_filters import rest_framework as filters
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_GET, require_POST


# ------------------------------------------------------------
# ViewsFilter  -> URL Param
# ------------------------------------------------------------

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


# ------------------------------------------------------------
# Views
# ------------------------------------------------------------

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


class ReviewAnimeViewSet(viewsets.ModelViewSet):
    """

    目的 :  ユーザーがレビューしたアニメ情報を取得する

    シリアライザー :  ReviewAnimeSerializer
    フィルター     :  ReviewAnimeFilter

    fields => [
        'id',
        'user',         # レビューユーザーの情報
        'anime',        # レビューアニメの情報
        'user_id',      # ユーザーID    ※ POST用
        'anime_id',     # アニメID      ※ POST用
        'star',         # 評価星
        'comment'       # レビュー文
    ]

    """
    queryset = ReviewAnime.objects.all().order_by('-modified')
    serializer_class = ReviewAnimeSerializer
    filter_class = ReviewAnimeFilter

    def create(self, request):
        "POST"
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

    def partial_update(self, request, pk=None):
        "PATCH"
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


class RecommendAnimeGroupViewSet(viewsets.ModelViewSet):
    """

    目的 :  RecommendAnimeViewSetのグループ情報を取得する

    シリアライザー :  RecommendAnimeGroupSerializer

    fields => [
    ]

    """
    queryset = RecommendAnimeGroup.objects.all()
    serializer_class = RecommendAnimeGroupSerializer


class RecommendAnimeViewSet(viewsets.ModelViewSet):
    """

    目的 :  ユーザーがおすすめするアニメの情報を取得する
    ※ 本人のみ編集可能にする

    シリアライザー :  RecommendAnimeSerializer

    fields => [
    ]

    """
    queryset = RecommendAnime.objects.all()

    serializer_class = RecommendAnimeSerializer

    def create(self, request):
        "POST"

        # URLパラメータの情報をコピー
        validated_data = request.data.copy()

        # ログイン認証
        if self.request.user.id is None:
            raise ValueError("please account login")

        # ログインユーザーのおすすめアニメ(複数)を取得
        """ queryset.recommend_anime = """

        return Response(f"プロフィールを更新しました。")
