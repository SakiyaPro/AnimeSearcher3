# coding: utf-8
from rest_framework import routers
from users.views import CustomUserIdViewSet, CustomUserViewSet, ProfileViewSet, RecommendAnimeGroupViewSet, RecommendAnimeViewSet, ReviewAnimeViewSet

router = routers.DefaultRouter()
router.register('user', CustomUserViewSet)
router.register('userIds', CustomUserIdViewSet)
router.register('review_anime', ReviewAnimeViewSet)
router.register('profile', ProfileViewSet)
router.register('recommend_anime', RecommendAnimeViewSet)
router.register('recommend_anime_group', RecommendAnimeGroupViewSet)
