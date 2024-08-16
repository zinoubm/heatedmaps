from django.db import models
from authentication.models import User


class Site(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
