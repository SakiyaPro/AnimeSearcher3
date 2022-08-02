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

import glob
import shutil

from anime_data.functions import driver, All_Genre



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
