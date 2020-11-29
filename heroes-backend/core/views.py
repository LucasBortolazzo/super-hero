from rest_framework import viewsets, filters
from core.models import Hero
from .serializers import HeroSerializer
from django_filters.rest_framework import DjangoFilterBackend, FilterSet


class HeroViewSet(viewsets.ModelViewSet):
    queryset = Hero.objects.all().order_by('-id')
    serializer_class = HeroSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ['id', 'name']
    search_fields = ['name']
    filterset_fields = ['favorite']
