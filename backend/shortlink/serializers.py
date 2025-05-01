from rest_framework import serializers

class EncodeSerializer(serializers.Serializer):
    long_url = serializers.URLField(required=True)

class DecodeSerializer(serializers.Serializer):
    short_url = serializers.URLField(required=True)
