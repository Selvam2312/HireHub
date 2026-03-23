from django.urls import path
from .views import SeekerProfileView, EmployerProfileView

urlpatterns = [
    path('seeker/', SeekerProfileView.as_view(), name='seeker-profile'),
    path('employer/', EmployerProfileView.as_view(), name='employer-profile'),
]