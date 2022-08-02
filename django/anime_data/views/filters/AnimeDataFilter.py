from django_filters import rest_framework as filters
from django_filters.widgets import CSVWidget

from anime_data.models.AnimeData import AnimeData
from anime_data.models.AnimeData import GenreData


class AnimeDataFilter(filters.FilterSet):
    # 複数の annictId を指定して、対応するアニメをフィルタリングするクエリ　※2022/5/24 使用未定
    annictId_many = filters.CharFilter(
        field_name="annictId", method='filter_annictId_many')  # 何故か widget が数値を読み取らないので、method でゴリ押し

    # annictId の範囲を指定してフィルタリング
    annictId_gte = filters.NumberFilter(
        field_name="annictId", lookup_expr='gte')  # ◯◯以上
    annictId_lte = filters.NumberFilter(
        field_name="annictId", lookup_expr='lte')  # 〇〇以下

    # タイトル検索
    title = filters.CharFilter(
        field_name="title", lookup_expr='exact')  # 完全一致
    title_contains = filters.CharFilter(
        field_name="title", lookup_expr='contains')  # 部分一致
    titleEn = filters.CharFilter(
        field_name="titleEn", lookup_expr='contains')  # 部分一致
    titleKana = filters.CharFilter(
        field_name="titleKana", lookup_expr='contains')  # 部分一致
    titleRo = filters.CharFilter(
        field_name="titleRo", lookup_expr='contains')  # 部分一致

    # キャスト・スタッフの名前でフィルタリング　※2022/5/24 使用未定
    casts = filters.AllValuesMultipleFilter(
        field_name="casts__name")
    staffs = filters.AllValuesMultipleFilter(
        field_name="staffs__name", lookup_expr='contains')

    # エピソード名やエピソード数でフィルタリング　※2022/5/24 使用未定
    episodes = filters.CharFilter(
        field_name="episodes", lookup_expr='contains')  # 部分一致
    episodesCount_gte = filters.NumberFilter(
        field_name="episodesCount", lookup_expr='gte')  # ◯◯以上

    # 放送年度・季節でフィルタリング　※2022/5/24 使用未定
    seasonName = filters.CharFilter(
        field_name="seasonName", lookup_expr='contains')  # 部分一致
    seasonYear = filters.CharFilter(
        field_name="seasonYear", lookup_expr='contains')  # 部分一致

    # シリーズ名でフィルタリング　※2022/5/24 使用未定
    seriesList = filters.CharFilter(
        field_name="seriesList", lookup_expr='contains')  # 部分一致

    # 視聴者数でフィルタリング
    watchersCount_max = filters.CharFilter(
        field_name="annictId", method='filter_watchersCount_max')
    watchersCount_lte = filters.NumberFilter(
        field_name="watchersCount", lookup_expr='lte')  # ◯◯以下
    watchersCount_gte = filters.NumberFilter(
        field_name="watchersCount", lookup_expr='gte')  # ◯◯以上

    # ジャンルでフィルタリング
    genres = filters.ModelMultipleChoiceFilter(
        field_name="genres__genre", to_field_name='genre', widget=CSVWidget,  queryset=GenreData.objects.all(), method='filter_genres')

    # FilterSetはフィールド名のフィルタリングを自動生成するため、ImageFieldがエラーを起こさないように定義し直している
    image = filters.BooleanFilter(field_name="image")

    class Meta:
        model = AnimeData
        fields = '__all__'

    def filter_annictId_many(self, queryset, name, value):
        if value:
            result = value.split(',')
            result = [int(v) for v in result]
            queryset = queryset.filter(annictId__in=result)
        return queryset

    def filter_watchersCount_max(self, queryset, name, value):
        # watchersCountを降順にするかどうか
        if value == 'true':
            queryset = queryset.order_by('-watchersCount')
        return queryset

    def filter_genres(self, queryset, name, value):
        if value:
            for v in value:
                # __inを使うとジャンルをANDの複数条件で検索できないのでFor文で回す
                queryset = queryset.filter(genres=v)
        return queryset
