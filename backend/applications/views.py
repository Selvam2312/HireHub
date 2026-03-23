from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Application
from .serializers import ApplicationSerializer


class IsSeeker(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'seeker'


class IsEmployer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'employer'


class ApplyJobView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsSeeker]

    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)


class MyApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsSeeker]

    def get_queryset(self):
        return Application.objects.filter(applicant=self.request.user)


class JobApplicantsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsEmployer]

    def get_queryset(self):
        job_id = self.kwargs['job_id']
        return Application.objects.filter(
            job__id=job_id,
            job__employer=self.request.user
        )


class UpdateApplicationStatusView(generics.UpdateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsEmployer]

    def get_queryset(self):
        return Application.objects.filter(job__employer=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = request.data.get('status', instance.status)
        instance.save()
        return Response(ApplicationSerializer(instance).data)