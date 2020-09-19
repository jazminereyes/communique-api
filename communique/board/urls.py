from django.urls import path, include
from . import views

urlpatterns = [
    path('stories/',
        views.StoryListView.as_view(),
        name='story_list'
    ),
    path('stories/<int:pk>/',
        views.StoryDetailView.as_view(),
        name='story_detail'
    ),
    path('api-auth/', include('rest_framework.urls')),
]
