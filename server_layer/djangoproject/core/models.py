from django.db import models
from django.conf import settings
from datetime import datetime

class AutoAddedAndUpdated(models.Model):
    """base class for auto-populating an "added" and "last_updated" """
    updated = models.DateTimeField(auto_now=True)
    added = models.DateTimeField(auto_now_add=True)


class RankedLink(AutoAddedAndUpdated):
    link = models.TextField(unique=True)
    up = models.DecimalField(max_digits=10, decimal_places=0, default = 0)
    down = models.DecimalField(max_digits=10, decimal_places=0, default = 0)
