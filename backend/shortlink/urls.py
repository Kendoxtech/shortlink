from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import URLViewSet, redirect_url

# Register your viewsets with the router
router = DefaultRouter()
router.register(r'urls', URLViewSet, basename='url')

urlpatterns = [
    # Include API viewset URLs first
    path('api/', include(router.urls)),

    # Redirect URL pattern (this should be placed last)
    path('<str:url_path>/', redirect_url, name='redirect_url'),
]
