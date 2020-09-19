from rest_framework import serializers
from .models import Story

class StorySerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='story_detail')
    user = serializers.ReadOnlyField(source='user.username')
    like_count = serializers.SerializerMethodField()

    class Meta:
        model = Story
        fields = [
            'url',
            'id',
            'title',
            'story',
            'user',
            'like_count',
        ]
    
    def get_like_count(self, obj):
        return obj.like_count
