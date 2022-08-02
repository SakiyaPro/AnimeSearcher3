# coding: utf-8
from rest_framework import routers

from users.views.CustomUserIdViewSet import CustomUserIdViewSet
from users.views.CustomUserViewSet import CustomUserViewSet
from users.views.ProfileViewSet import ProfileViewSet
from users.views.RecommendAnimeGroupViewSet import RecommendAnimeGroupViewSet
from users.views.RecommendAnimeViewSet import RecommendAnimeViewSet
from users.views.ReviewAnimeViewSet import ReviewAnimeViewSet


router = routers.DefaultRouter()
router.register('CustomUser', CustomUserViewSet)
router.register('CustomUserId', CustomUserIdViewSet)
router.register('ReviewAnime', ReviewAnimeViewSet)
router.register('Profile', ProfileViewSet)
router.register('RecommendAnime', RecommendAnimeViewSet)
router.register('RecommendAnimeGroup', RecommendAnimeGroupViewSet)
