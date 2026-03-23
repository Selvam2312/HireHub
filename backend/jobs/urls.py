from django.urls import path
from .views import JobListCreateView, JobDetailView, EmployerJobsView

urlpatterns = [
    path('', JobListCreateView.as_view(), name='job-list-create'),
    path('<int:pk>/', JobDetailView.as_view(), name='job-detail'),
    path('my-jobs/', EmployerJobsView.as_view(), name='employer-jobs'),
]