from django.db import models
from django.db.models.fields import IntegerField, TextField

from core_models.models import TimeStampedModel
from anime_data.models.CharacterData import CharacterData
from anime_data.models.PersonData import PersonData


class CastsData(TimeStampedModel):
    """
    アニメの声優情報を記録

    annictId    : int                       # AnnictId
    name        : str                       # 声優名
    nameEn      : str                       # 声優名EN
    sortNumber  : int                       # ソート番号
    person      : models(PersonData)        # 声優自身の情報
    character   : models(CharacterData)     # 演じたキャラクタの情報
    """
    annictId = IntegerField("AnnictId", unique=True)
    name = TextField("声優名", null=True, blank=True)
    nameEn = TextField("声優名EN", null=True, blank=True)
    sortNumber = IntegerField("ソート番号", null=True, blank=True)
    person = models.ManyToManyField(PersonData)
    character = models.ManyToManyField(CharacterData)

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'anime_data'
        verbose_name_plural = "CastsData"
        db_table = "anime_casts_db"
