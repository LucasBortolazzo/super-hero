from django.db import models


class Hero(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    favorite = models.BooleanField(default=False)
    photo = models.ImageField(
        upload_to='heroes_profile', blank=True, null=True)

    def __str__(self):
        return self.name + " " + self.description
