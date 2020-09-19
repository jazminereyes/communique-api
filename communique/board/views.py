from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Story
from .permissions import IsOwnerOrReadOnly
from . import serializers

# Create your views here.
class StoryListView(generics.ListCreateAPIView):
    queryset = Story.objects.all()
    serializer_class = serializers.StorySerializer
    permission_classes = [
        IsAuthenticatedOrReadOnly
    ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class StoryDetailView(generics.RetrieveAPIView):
    queryset = Story.objects.all()
    serializer_class = serializers.StorySerializer
    permission_classes = [
        IsOwnerOrReadOnly
    ]
