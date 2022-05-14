from core_models.models import TimeStampedModel
from django.db import models
from django.db.models.fields import IntegerField, TextField, CharField
from django.db.models.fields.files import ImageField

# from taggit.managers import TaggableManager

from .models_validations.models_validations import *
from anime_data.models.AnimeSeriesData import AnimeSeriesData
from anime_data.models.CastsData import CastsData
from anime_data.models.EpisodesData import EpisodesData
from anime_data.models.StaffsData import StaffsData


class GenreData(TimeStampedModel):
    genre = models.CharField("アニメジャンル", max_length=50, unique=True)

    def __str__(self):
        return str(self.id) + '-' + self.genre

class AnimeData(TimeStampedModel):
    # --------AnnictAPI searchWorks-------------------------------------
    annictId = IntegerField("AnnictId", unique=True)
    title = CharField("タイトル", unique=True, max_length=255)
    titleEn = TextField("タイトルEN", null=True, blank=True)
    titleKana = TextField("タイトルかな", null=True, blank=True)
    titleRo = TextField("タイトルRO", null=True, blank=True)
    media = TextField("放送メディア", null=True, blank=True)
    casts = models.ManyToManyField(CastsData, blank=True)  # 声優陣
    staffs = models.ManyToManyField(StaffsData, blank=True)  # 制作スタッフ
    episodes = models.ManyToManyField(EpisodesData, blank=True)  # エピソード詳細
    episodesCount = IntegerField("総エピソード数", null=True, blank=True)
    seasonName = TextField("放送季節", null=True, blank=True)
    seasonYear = IntegerField("放送年", null=True, blank=True)
    seriesList = models.ManyToManyField(AnimeSeriesData, blank=True)  # シリーズ名
    watchersCount = IntegerField(
        "Annict視聴者数", null=True, blank=True)  # GoodRate出来上がるまでの指標
    # ------------MyAPI---------------------------------------------------------
    image = ImageField(
        default='/django/media/anime/thumbnail/NoImageサンプル画像.jpg', upload_to='anime/thumbnail')
    story = TextField("あらすじ", null=True, blank=True)
    genres = models.ManyToManyField(GenreData, blank=True)
    # --------------------------------------------------------------------------

    def __str__(self):
        return str(self.annictId) + '-' + self.title

    class Meta:
        app_label = 'anime_data'
        verbose_name_plural = "AnimeData"
        db_table = "anime_db"
