# coding: utf-8
from rest_framework import routers
from users.views import CustomUserViewSet, ProfileViewSet, ReviewAnimeViewSet

router = routers.DefaultRouter()
router.register('user', CustomUserViewSet)
router.register('review_anime', ReviewAnimeViewSet)
router.register('profile', ProfileViewSet)
