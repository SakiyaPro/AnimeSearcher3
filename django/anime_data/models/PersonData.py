from django.db import models
from django.db.models.fields import IntegerField, TextField, CharField

from core_models.models import TimeStampedModel


class PersonData(TimeStampedModel):
    '''
    声優の詳細情報

    annictId        : int       # AnnictId
    name            : str       # 声優名
    nameEn          : str       # 声優名EN
    nameKana        : str       # 声優名かな
    nickname        : str       # ニックネーム
    nicknameEn      : str       # ニックネームEN
    birthday        : str       # 誕生日
    bloodType       : str       # 血液型
    genderText      : str       # 性別
    height          : str       # 身長
    castsCount      : int       # 出演本数
    favoritePeopleCount     : str       # Annictユーザお気に入り数
    '''
    # ------------AnnictAPI searchPeople-------------------------------------------
    annictId = IntegerField("AnnictId", unique=True)
    name = CharField("声優名", unique=True, max_length=191)
    nameEn = TextField("声優名EN", null=True, blank=True)
    nameKana = TextField("声優名かな", null=True, blank=True)
    nickname = TextField("ニックネーム", null=True, blank=True)
    nicknameEn = TextField("ニックネームEN", null=True, blank=True)
    birthday = TextField("誕生日", null=True, blank=True)
    bloodType = TextField("血液型", null=True, blank=True)
    genderText = TextField("性別", null=True, blank=True)
    height = TextField("身長", null=True, blank=True)
    castsCount = IntegerField("出演本数", null=True, blank=True)
    favoritePeopleCount = TextField("Annictユーザーお気に入り数", null=True, blank=True)
    # --------------------------------------------------------------------------

    class Meta:
        app_label = 'anime_data'
        verbose_name_plural = "PersonData"
        db_table = "anime_person_db"
