
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status


class URLShortenerAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.valid_long_url = 'https://indicina.co'
        self.encode_url = '/api/urls/encode/'
        self.decode_url = '/api/urls/decode/'
        self.list_url = '/api/urls/'
        self.search_url = '/api/urls/search'
        self.short_code = None

    def test_encode_valid_url(self):
        response = self.client.post(self.encode_url, {'long_url': self.valid_long_url}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('short_url', response.data)
        self.short_code = response.data['short_url'].split('/')[-1]

    def test_encode_invalid_url_missing_field(self):
        response = self.client.post(self.encode_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('long_url', response.data)

    def test_decode_existing_short_url(self):
        # Encode first
        encode_response = self.client.post(self.encode_url, {'long_url': self.valid_long_url}, format='json')
        short_url = encode_response.data['short_url']

        # Decode
        decode_response = self.client.post(self.decode_url, {'short_url': short_url}, format='json')
        self.assertEqual(decode_response.status_code, status.HTTP_200_OK)
        self.assertEqual(decode_response.data['long_url'], self.valid_long_url)

    def test_decode_nonexistent_short_url(self):
        response = self.client.post(self.decode_url, {'short_url': 'http://short.est/INVALID'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('error', response.data)

    def test_list_urls(self):
        # Create a URL to ensure there's at least one
        self.client.post(self.encode_url, {'long_url': self.valid_long_url}, format='json')
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('urls', response.data)
        self.assertTrue(len(response.data['urls']) > 0)

    def test_statistics_for_existing_url(self):
        # Encode first
        encode_response = self.client.post(self.encode_url, {'long_url': self.valid_long_url}, format='json')
        short_code = encode_response.data['short_url'].split('/')[-1]

        # Get stats
        response = self.client.get(f'/api/urls/stats/{short_code}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('creation_date', response.data)
        self.assertIn('visits', response.data)

    def test_statistics_for_nonexistent_url(self):
        response = self.client.get('/api/urls/stats/UNKNOWN123/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_search_valid_query(self):
        self.client.post(self.encode_url, {'long_url': 'https://indicina.co/test-page'}, format='json')
        response = self.client.get(f'{self.search_url}?query=indi')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('urls', response.data)
        self.assertTrue(any('indicina' in v['long_url'] for v in response.data['urls'].values()))

    def test_search_invalid_query_too_short(self):
        response = self.client.get(f'{self.search_url}?query=ab')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
