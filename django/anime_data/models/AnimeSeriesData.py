from django.db.models.fields import IntegerField, TextField

from core_models.models import TimeStampedModel


class AnimeSeriesData(TimeStampedModel):
    """
    アニメのシリーズ名を記録

    annictId    : int       # AnnictId
    name        : str       # シリーズ名
    nameEn      : str       # シリーズ名EN
    nameRo      : str       # シリーズ名RO
    """
    annictId = IntegerField("AnnictId", unique=True)
    name = TextField("シリーズ名", null=True, blank=True)
    nameEn = TextField("シリーズ名EN", null=True, blank=True)
    nameRo = TextField("シリーズ名RO", null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'anime_data'
        verbose_name_plural = "AnimeSeriesData"
        db_table = "anime_series_db"
