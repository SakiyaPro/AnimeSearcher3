import requests
import time
from django.template.response import TemplateResponse

from anime_data.models.AnimeData import AnimeData, GenreData
from anime_data.models.AnimeSeriesData import AnimeSeriesData
from anime_data.models.CastsData import CastsData
from anime_data.models.CharacterData import CharacterData
from anime_data.models.EpisodesData import EpisodesData
from anime_data.models.PersonData import PersonData
from anime_data.models.StaffsData import StaffsData
from users.models.CustomUser import CustomUser

from anime_data.serializers.CharacterDataSerializer import CharacterDataSerializer
from anime_data.serializers.PersonDataSerializer import PersonDataSerializer
from anime_data.serializers.GenreDataSerializer import GenreDataSerializer
from anime_data.serializers.app.AnimeIdSerializer import AnimeIdSerializer
from anime_data.serializers.app.AnimeSimpleSerializer import AnimeSimpleSerializer
from anime_data.serializers.app.AnimeDetailSerializer import AnimeDetailSerializer
from anime_data.serializers.app.AnimeTitleSuggestSerializer import AnimeTitleSuggestSerializer

import glob
import shutil

from django_filters import rest_framework as filters
from django_filters.widgets import CSVWidget
from rest_framework import viewsets
from rest_framework.response import Response

from anime_data.functions import driver, All_Genre


# ------------------------------------------------------------
# ViewsFilter  -> URL Param
# ------------------------------------------------------------

# AnimeDataViewSetの対応するクエリ文字列
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


# ------------------------------------------------------------
# Views
# ------------------------------------------------------------

class AnimeDataViewSet(viewsets.ModelViewSet):
    """

    目的 :  アニメの簡易情報を取得する

    シリアライザー :  AnimeSimpleSerializer
    フィルター     :  AnimeDataFilter

    fields => [
        'id',
        'title',            # アニメタイトル
        'image',            # サムネイル画像
        'seasonYear',       # 放送年度
        'seasonName',       # 放送季節
        'watchersCount',    # 視聴者数
        'favorite_count',   # お気に入り数
        'genres',           # ジャンル
        'reviewanime_set'   # アニメのレビュー
    ]

    """
    queryset = AnimeData.objects.order_by('?').all()
    serializer_class = AnimeSimpleSerializer
    filter_class = AnimeDataFilter

    def get_seriesAnime(self, request, pk=None):
        "GET"
        result = {}
        if pk:
            result = self.queryset.filter(seriesList=pk)
        return result

    def partial_update(self, request, pk=None):
        "PATCH"
        queryset = self.queryset.get(id=pk)
        validated_data = request.data.copy()

        # favorite_count
        if validated_data.get('favorite_count_plus', ''):
            if self.request.user.id is None:
                raise ValueError("please account login")
            queryset.favorite_count.add(
                CustomUser.objects.get(id=self.request.user.id))
            return Response(f"いいねの加算が完了しました。")
        if validated_data.get('favorite_count_minus', ''):
            if self.request.user.id is None:
                raise ValueError("please account login")
            queryset.favorite_count.remove(
                CustomUser.objects.get(id=self.request.user.id))
            return Response(f"いいねの減算が完了しました。")

        # Genre remove(削除)
        if validated_data.get('remove', '') == "true":
            if validated_data.get('genre', ''):
                genre = GenreData.objects.get(genre=request.data['genre'])
                if not genre:
                    raise ValueError(
                        f"{validated_data['genre']} is not found.")
                elif not AnimeData.objects.filter(id=pk, genres=genre.id):
                    raise ValueError(
                        f"{validated_data['genre']} is not included in the animedata.")
                queryset.genres.remove(genre)
                return Response(f"ジャンル '{validated_data['genre']}' の削除が完了しました。")
        # Genre add (追加) create (作成)
        else:
            if validated_data.get('genre', ''):
                genre = GenreData.objects.get(genre=validated_data['genre'])
                if not genre:
                    raise ValueError(
                        f"{validated_data['genre']} is not found.")
                elif AnimeData.objects.filter(id=pk, genres=genre.id):
                    raise ValueError(
                        f"{validated_data['genre']} is allready")
                queryset.genres.add(genre)
                return Response(f"ジャンル '{validated_data['genre']}' の追加が完了しました。")
        return Response("リクエストが正しくありません")


class AnimeDetailViewSet(viewsets.ModelViewSet):
    """

    目的 :  アニメの詳細情報を取得する

    シリアライザー :  AnimeDetailSerializer

    fields => [
        'id',
        'title',            # アニメタイトル
        'image',            # サムネイル画像
        'seasonYear',       # 放送年度
        'seasonName',       # 放送季節
        'genres',           # ジャンル
        'casts',            # 声優
        'staffs',           # スタッフ・制作会社
        'episodes',         # エピソード
        'seriesList',       # シリーズ名
        'watchersCount',    # 視聴者数
        'favorite_count',   # お気に入り数
        'reviewanime_set',  # アニメのレビュー
        'modified',         # 更新日時
    ]

    """
    queryset = AnimeData.objects.order_by('?').all()
    serializer_class = AnimeDetailSerializer


class AnimeIdViewSet(viewsets.ModelViewSet):
    """

    目的 :  アニメのID情報をすべて取得する      ※ ISR用

    シリアライザー :  AnimeIdSerializer

    fields => [
        'id',       # anime_id
    ]

    """
    queryset = AnimeData.objects.order_by('id').all()
    serializer_class = AnimeIdSerializer


class AnimeTitleSuggestViewSet(viewsets.ModelViewSet):
    """

    目的 :  アニメのタイトル検索時にサジェスト（検索候補）を生成する

    シリアライザー :  AnimeTitleSuggestSerializer

    fields => [
        'title'     # アニメタイトル
    ]

    """
    queryset = AnimeData.objects.order_by('-watchersCount').all()
    serializer_class = AnimeTitleSuggestSerializer

    def get_queryset(self):
        "GET"
        title = self.request.GET.get("title")
        queryset = self.queryset.filter(title__icontains=title)
        return queryset


class GenreDataViewSet(viewsets.ModelViewSet):
    """

    目的 :  アニメマスタに格納しているジャンルデータをすべて取得

    シリアライザー :  GenreDataSerializer

    fields => [
        'genre'     # アニメジャンル
    ]

    """
    queryset = GenreData.objects.order_by('id').all()
    serializer_class = GenreDataSerializer


class CharacterDataViewSet(viewsets.ModelViewSet):
    """

    目的 :  アニメマスタに格納しているキャラクタデータをすべて取得

    シリアライザー :  CharacterDataSerializer

    fields => [
        'id'
        'name'      # キャラクタ名前
    ]

    """
    queryset = CharacterData.objects.order_by('annictId').all()
    serializer_class = CharacterDataSerializer
    filter_fields = ("annictId",
                     "name",
                     "nameEn",
                     "nameKana",
                     "nickname",
                     "nicknameEn",
                     "age",
                     "ageEn",
                     "birthday",
                     "bloodType",
                     "birthdayEn",
                     "height",
                     "heightEn",
                     "weight",
                     "weightEn",
                     "nationality",
                     "nationalityEn",
                     "occupation",
                     "occupationEn",
                     "favoriteCharactersCount",
                     "series")


class PersonDataViewSet(viewsets.ModelViewSet):
    """

    目的 :  アニメマスタに格納しているパーソンデータをすべて取得

    シリアライザー :  CharacterDataSerializer

    fields => [
        'id'
        'name'      # パーソン名前
    ]

    """
    queryset = PersonData.objects.order_by('annictId').all()
    serializer_class = PersonDataSerializer
    filter_fields = ("annictId",
                     "name",
                     "nameEn",
                     "nameKana",
                     "nickname",
                     "nicknameEn",
                     "birthday",
                     "bloodType",
                     "genderText",
                     "height",
                     "castsCount",
                     "favoritePeopleCount")


def CreateAnimeDataImage(request):
    AnimeData.objects.filter(image="").update(
        image="anime/thumbnail/NoImageサンプル画像.jpg")

    data = AnimeData.objects.filter(image="anime/thumbnail/NoImageサンプル画像.jpg")
    image_names = glob.glob('anime_data/data/*.jpg')
    print(image_names)

    ng_words = {"＼": "\\",
                "／": "/",
                "：": ":",
                "＊": "*",
                "？": "?",
                "``": '"',
                "＜": "<",
                "＞": ">",
                "｜": "|", }

    for image_name in image_names:
        before_str = image_name.removeprefix(
            "anime_data/data/").removesuffix(".jpg")
        after_str = image_name.removeprefix(
            "anime_data/data/").removesuffix(".jpg")
        for ng_word_key, ng_word_value in ng_words.items():
            if ng_word_key in after_str:
                after_str = after_str.replace(ng_word_key, ng_word_value)
        try:
            one_data = data.filter(title=after_str)
            if one_data:
                shutil.move(image_name, 'media/anime/thumbnail/')
                one_data.update(image='anime/thumbnail/' + before_str + '.jpg')
        except Exception as E:
            raise E
    return TemplateResponse(request, 'index.html', context={"result": data})


def CreateData(request):
    url = 'https://api.annict.com/graphql'
    headers = {
        "Authorization": "Bearer y0dNazZ_ruzpUj4k_GhJ5Nn9PycfTWxixpGcRkrH7ow"}
    # animeData = AnimeData.objects.all().delete()
    annictIds = 1

    while True:
        work_query = """
    { searchWorks(annictIds: """ + str(annictIds) + """)
        { nodes
            { annictId title titleEn titleKana titleRo media
            casts {
                nodes{
                    annictId name nameEn sortNumber
                    person {
                        annictId name nameEn nameKana nickname nicknameEn birthday bloodType genderText height castsCount favoritePeopleCount
                    }
                    character {
                        annictId name nameEn nameKana nickname nicknameEn age ageEn birthday birthdayEn bloodType bloodTypeEn height heightEn weight weightEn nationality nationalityEn occupation occupationEn description descriptionEn descriptionSource descriptionSourceEn favoriteCharactersCount
                    }
                }
            }
            staffs {
                nodes {
                    annictId name roleOther roleOtherEn
                }
            }
            episodes {
                nodes {
                    annictId number numberText title
                }
            }
            episodesCount seasonName seasonYear
            seriesList {
                nodes {
                    annictId name nameEn nameRo
                }
            }
            watchersCount
            }
        }
    }
"""
        params = {"query": work_query}

        try:
            res = requests.post(url, params=params, headers=headers).json()
            result = res["data"]["searchWorks"]["nodes"][0]
        except:
            annictIds += 1
            continue

        # AnimeData
        # annictId title titleEn titleKana titleRo
        # [casts: [character][person]] [staffs] [episodes]
        # episodesCount seasonName seasonYear
        # [seriesList]
        # watchersCount
        """
        create_data作成理由
        「update_or_createの際、resultを使用すると、
        annictIdが競合してしまうためエラーになるため」
        """
        create_data = result.copy()
        castsData = result["casts"]["nodes"]
        staffsData = result["staffs"]["nodes"]
        episodesData = result["episodes"]["nodes"]
        animeSeriesData = result["seriesList"]["nodes"]

        del create_data["annictId"], create_data["casts"], create_data["staffs"], create_data["episodes"], create_data["seriesList"]

        try:
            AnimeData.objects.update_or_create(
                annictId=result["annictId"], **create_data)
        except:
            pass
        try:
            del create_data["title"]
            AnimeData.objects.filter(
                annictId=result["annictId"]).update(**create_data)
        except Exception as E:
            raise E
        anime_data = AnimeData.objects.get(annictId=result["annictId"])

        # CastsData
        # CharacterData
        # [annictId name nameEn nameKana nickname nicknameEn age ageEn birthday birthdayEn bloodType bloodTypeEn height heightEn weight weightEn nationality nationalityEn occupation occupationEn description descriptionEn descriptionSource descriptionSourceEn favoriteCharactersCount]
        # PersonData
        # [annictId birthday bloodType castsCount favoritePeopleCount genderText height name nameEn nameKana nickname nicknameEn]
        for cast in castsData:
            if cast is None:
                continue
            cast_annictId = cast.pop("annictId")
            person_annictId = cast["person"].pop("annictId")
            character_annictId = cast["character"].pop("annictId")
            # Person & Character Create
            try:
                PersonData.objects.update_or_create(
                    annictId=person_annictId, **cast["person"])
            except:
                pass
            try:
                CharacterData.objects.update_or_create(
                    annictId=character_annictId, **cast["character"])
            except:
                pass
            # Cast Create
            add_person = PersonData.objects.get(annictId=person_annictId)
            add_character = CharacterData.objects.get(
                annictId=character_annictId)
            del cast["person"], cast["character"]
            try:
                CastsData.objects.update_or_create(
                    annictId=cast_annictId,
                    **cast)
            except:
                pass
            add_cast = CastsData.objects.get(annictId=cast_annictId)
            add_cast.person.add(add_person)
            add_cast.character.add(add_character)
            # AnimeData Create
            anime_data.casts.add(add_cast)

        # StaffsData
        # [annictId name roleOther roleOtherEn roleText]
        for staff in staffsData:
            if staff is None:
                continue
            staff_annictId = staff.pop("annictId")
            try:
                StaffsData.objects.update_or_create(
                    annictId=staff_annictId, **staff)
            except:
                pass
            add_staff = StaffsData.objects.get(annictId=staff_annictId)
            anime_data.staffs.add(add_staff)

        # EpisodesData
        # [annictId number numberText title]
        for episode in episodesData:
            if episode is None:
                continue
            episode_annictId = episode.pop("annictId")
            try:
                EpisodesData.objects.update_or_create(
                    annictId=episode_annictId, **episode)
            except:
                pass
            add_episode = EpisodesData.objects.get(annictId=episode_annictId)
            anime_data.episodes.add(add_episode)

        # AnimeSeriesData
        # [annictId name nameEn nameRo]
        for series in animeSeriesData:
            if series is None:
                continue
            series_annictId = series.pop("annictId")
            try:
                AnimeSeriesData.objects.update_or_create(
                    annictId=series_annictId, **series)
            except:
                pass
            add_series = AnimeSeriesData.objects.get(annictId=series_annictId)
            anime_data.seriesList.add(add_series)

        annictIds += 1
        if annictIds == 9200:
            break

    return TemplateResponse(request, 'index.html')


def CreateGenre(request):
    title_data = AnimeData.objects.all().filter(
        annictId__gte=1730).order_by("annictId").values("title")
    all_genre = All_Genre()
    web_driver = driver()
    for title in title_data:
        title = title["title"]
        web_driver.get(
            f"http://ruijianime.com/main/title_search.php?srchanime={title}")
        try:
            search_anime = web_driver.find_element_by_xpath(
                f"//div[@class='title_one']/h2[1]/a[@title='{title}の情報を見る']")
        except:
            continue
        search_anime.click()
        story = web_driver.find_element_by_xpath(
            "//div[@id='abst_exp']/p").text
        story = story.replace("\n(wikipedia、公式サイトより引用)", "")
        AnimeData.objects.filter(title=title).update(story=story)

        genre_not_conversion = web_driver.find_elements_by_xpath(
            "//div[@id='major_keyword']/a")
        for genre in genre_not_conversion:
            if genre.text in all_genre.values():
                if GenreData.objects.all().filter(genre=all_genre[genre.text]).first() is None:
                    GenreData.objects.create(genre=all_genre[genre.text])
                AnimeData.objects.get(title=title).genres.add(
                    GenreData.objects.get(genre=all_genre[genre.text]))
        time.sleep(0.5)
    return TemplateResponse(request, 'index.html')
