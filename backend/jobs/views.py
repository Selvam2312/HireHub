from rest_framework import generics, permissions, filters
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer


class IsEmployer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'employer'


class JobListCreateView(generics.ListCreateAPIView):
    serializer_class = JobSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'company', 'location', 'skills']
    ordering_fields = ['created_at', 'salary_min']

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [IsEmployer()]

    def get_queryset(self):
        qs = Job.objects.filter(is_active=True)
        job_type = self.request.query_params.get('job_type')
        experience = self.request.query_params.get('experience')
        location = self.request.query_params.get('location')
        if job_type:
            qs = qs.filter(job_type=job_type)
        if experience:
            qs = qs.filter(experience=experience)
        if location:
            qs = qs.filter(location__icontains=location)
        return qs

    def perform_create(self, serializer):
        serializer.save(employer=self.request.user)


class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [IsEmployer()]


class EmployerJobsView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsEmployer]

    def get_queryset(self):
        return Job.objects.filter(employer=self.request.user)