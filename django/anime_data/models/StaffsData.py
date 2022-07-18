from django.db.models.fields import IntegerField, TextField

from core_models.models import TimeStampedModel


class StaffsData(TimeStampedModel):
    """
    アニメのスタッフを記録

    annictId        : int       # AnnictId
    name            : str       # スタッフ名
    roleOther       : str       # 職業
    roleOtherEn     : str       # 職業EN
    """
    annictId = IntegerField("AnnictId", unique=True)
    name = TextField("スタッフ名", null=True, blank=True)
    roleOther = TextField("職業", null=True, blank=True)
    roleOtherEn = TextField("職業EN", null=True, blank=True)

    def __str__(self):
        return f"{self.name} 役職: {self.roleOther}"

    class Meta:
        app_label = 'anime_data'
        verbose_name_plural = "StaffsData"
        db_table = "anime_staffs_db"
