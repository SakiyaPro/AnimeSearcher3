from django_filters import rest_framework as filters
from users.models.ReviewAnime import ReviewAnime


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
