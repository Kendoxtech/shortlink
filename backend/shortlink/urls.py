from django.urls import path
from .views import encode_url, decode_url, statistics, url_list, redirect_url

urlpatterns = [
    path('api/encode', encode_url),
    path('api/decode', decode_url),
    path('api/statistic/<str:url_path>', statistics),
    path('api/list', url_list),
    path('<str:url_path>', redirect_url),  # Redirect logic
]
