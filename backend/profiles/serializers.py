from rest_framework import serializers
from .models import SeekerProfile, EmployerProfile


class SeekerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeekerProfile
        fields = '__all__'
        read_only_fields = ['user']


class EmployerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerProfile
        fields = '__all__'
        read_only_fields = ['user']