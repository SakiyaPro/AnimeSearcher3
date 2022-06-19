# coding: utf-8
from rest_framework import routers
from . import views

router  = routers.DefaultRouter()

# アニメの簡易情報を取得するAPI / ジャンルやキャスト検索等の機能も保有
router.register('animedata', views.AnimeDataViewSet)

# アニメの詳細情報を取得するAPI
router.register('animedatadetail', views.AnimeDetailViewSet)

# getStaticPaths用のAPIでIdを全て返す
router.register('animeids', views.AnimeIdViewSet)

# アニメタイトル検索時の検索候補(サジェスト)を取得するAPI
router.register('titlesuggest', views.AnimeTitleSuggestViewSet)

# 現在存在しているジャンルデータを取得するAPI
router.register('genredata', views.GenreDataViewSet)

# キャラクターデータを取得するAPI
router.register('characterdata', views.CharacterDataViewSet)

# 声優などの人物情報を取得するAPI
router.register('persondata', views.PersonDataViewSet)
