# coding: utf-8
from rest_framework import routers

from anime_data.views.AnimeSimpleViewSet import AnimeSimpleViewSet
from anime_data.views.AnimeDetailViewSet import AnimeDetailViewSet
from anime_data.views.AnimeIdViewSet import AnimeIdViewSet
from anime_data.views.AnimeTitleSuggestViewSet import AnimeTitleSuggestViewSet
from anime_data.views.GenreDataViewSet import GenreDataViewSet
from anime_data.views.CharacterDataViewSet import CharacterDataViewSet
from anime_data.views.PersonDataViewSet import PersonDataViewSet


router  = routers.DefaultRouter()

# アニメの簡易情報を取得するAPI / ジャンルやキャスト検索等の機能も保有
router.register('AnimeSimple', AnimeSimpleViewSet)

# アニメの詳細情報を取得するAPI
router.register('AnimeDetail', AnimeDetailViewSet)

# getStaticPaths用のAPIでIdを全て返す
router.register('AnimeId', AnimeIdViewSet)

# アニメタイトル検索時の検索候補(サジェスト)を取得するAPI
router.register('AnimeTitleSuggest', AnimeTitleSuggestViewSet)

# 現在存在しているジャンルデータを取得するAPI
router.register('GenreData', GenreDataViewSet)

# キャラクターデータを取得するAPI
router.register('CharacterData', CharacterDataViewSet)

# 声優などの人物情報を取得するAPI
router.register('PersonData', PersonDataViewSet)
