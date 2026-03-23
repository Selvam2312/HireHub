from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    employer_name = serializers.CharField(source='employer.full_name', read_only=True)
    skills_list = serializers.SerializerMethodField()
    applicant_count = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            'id', 'employer', 'employer_name', 'title', 'company',
            'location', 'job_type', 'experience', 'salary_min', 'salary_max',
            'description', 'requirements', 'skills', 'skills_list',
            'is_active', 'created_at', 'deadline', 'applicant_count'
        ]
        read_only_fields = ['employer', 'created_at']

    def get_skills_list(self, obj):
        return [s.strip() for s in obj.skills.split(',') if s.strip()]

    def get_applicant_count(self, obj):
        return obj.job_applications.count()