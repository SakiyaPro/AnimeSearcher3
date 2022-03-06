from anime_data.models.AnimeData import AnimeData
from users.serializer import CustomUserSerializer, ProfileSerializer, ReviewAnimeSerializer
from users.models import CustomUser, Profile, ReviewAnime
from rest_framework import viewsets, filters, permissions
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import action


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return CustomUser.objects.filter(id=self.request.user.id)


class ReviewAnimeViewSet(viewsets.ModelViewSet):
    queryset = ReviewAnime.objects.all()
    serializer_class = ReviewAnimeSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)
