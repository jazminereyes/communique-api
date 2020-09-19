from django.contrib.auth.models import User
from django.db import models
from django_extensions.db.models import TimeStampedModel
from django.utils.translation import ugettext as _

# Create your models here.
class Story(TimeStampedModel):
    user = models.ForeignKey(
        'auth.User',
        verbose_name=_('User'),
        on_delete=models.CASCADE
    )

    title = models.CharField(
        verbose_name=_('Title'),
        max_length=100
    )

    story = models.TextField(
        verbose_name=_('Story')
    )

    like_count = models.IntegerField(
        verbose_name=_('Likes'),
        default=0
    )

    def __str__(self):
        return '%s: %s' % (self.title, self.user)
