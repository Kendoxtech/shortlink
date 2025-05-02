from django.http import HttpResponseRedirect
from django.http import JsonResponse
import uuid
from datetime import datetime
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .in_memory_db import url_mapping
from .serializers import EncodeSerializer, DecodeSerializer

BASE_URL = "http://127.0.0.1:8000/"

class URLViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response({'urls': url_mapping})

    @action(detail=False, methods=['post'])
    def encode(self, request):
        serializer = EncodeSerializer(data=request.data)
        if serializer.is_valid():
            long_url = serializer.validated_data['long_url']
            short_code = str(uuid.uuid4())[:6]
            url_mapping[short_code] = {
                'long_url': long_url,
                'creation_date': str(datetime.now()),
                'visits': 0,
            }
            return Response({'short_url': BASE_URL + short_code})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def decode(self, request):
        serializer = DecodeSerializer(data=request.data)
        if serializer.is_valid():
            short_url = serializer.validated_data['short_url']
            short_code = short_url.strip().split('/')[-1]
            record = url_mapping.get(short_code)
            if record:
                return Response({'long_url': record['long_url']})
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='stats/(?P<url_path>[^/.]+)')
    def stats(self, request, url_path=None):
        record = url_mapping.get(url_path)
        if record:
            return Response(record)
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        query = request.query_params.get('query', '')
        if len(query) < 3:
            return Response({"error": "Search term must be at least 3 characters."}, status=status.HTTP_400_BAD_REQUEST)

        # Search for URLs containing the query in the long_url
        matching_urls = {short_code: details for short_code, details in url_mapping.items() if
                         query.lower() in details['long_url'].lower()}

        return Response({'urls': matching_urls})

    def destroy(self, request, pk=None):
        """
        Custom delete method to delete the URL by the short code (pk)
        """
        if pk in url_mapping:
            del url_mapping[pk]
            return Response({'message': 'URL deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)



def redirect_url(request, url_path):
    record = url_mapping.get(url_path)
    if record:
        record['visits'] += 1
        return HttpResponseRedirect(record['long_url'])
    return JsonResponse({'error': 'Not found'}, status=404)