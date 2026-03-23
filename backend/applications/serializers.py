from rest_framework import serializers
from .models import Application
from jobs.serializers import JobSerializer


class ApplicationSerializer(serializers.ModelSerializer):
    job_detail = JobSerializer(source='job', read_only=True)
    applicant_name = serializers.CharField(source='applicant.full_name', read_only=True)
    applicant_email = serializers.CharField(source='applicant.email', read_only=True)

    class Meta:
        model = Application
        fields = [
            'id', 'applicant', 'applicant_name', 'applicant_email',
            'job', 'job_detail', 'resume', 'cover_letter',
            'status', 'applied_at', 'updated_at'
        ]
        read_only_fields = ['applicant', 'status', 'applied_at']