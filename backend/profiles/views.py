from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SeekerProfile, EmployerProfile
from .serializers import SeekerProfileSerializer, EmployerProfileSerializer


class SeekerProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile, _ = SeekerProfile.objects.get_or_create(user=request.user)
        return Response(SeekerProfileSerializer(profile).data)

    def put(self, request):
        profile, _ = SeekerProfile.objects.get_or_create(user=request.user)
        serializer = SeekerProfileSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class EmployerProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile, _ = EmployerProfile.objects.get_or_create(user=request.user, defaults={'company_name': request.user.full_name})
        return Response(EmployerProfileSerializer(profile).data)

    def put(self, request):
        profile, _ = EmployerProfile.objects.get_or_create(user=request.user, defaults={'company_name': request.user.full_name})
        serializer = EmployerProfileSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)