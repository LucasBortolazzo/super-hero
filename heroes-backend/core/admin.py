from django.contrib import admin
from .models import Hero


class HeroAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'favorite')
    list_display_links = ('id', 'name',)
    search_fields = ('name', 'favorite',)
    list_filter = ('name', 'favorite')
    list_per_page = 10
    ordering = ('-id',)


admin.site.register(Hero, HeroAdmin)
