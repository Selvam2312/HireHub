from django.db import models
from django.conf import settings


class SeekerProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='seeker_profile')
    photo = models.ImageField(upload_to='profile_photos/', null=True, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    location = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)
    skills = models.CharField(max_length=500, blank=True)
    experience_years = models.PositiveIntegerField(default=0)
    education = models.CharField(max_length=200, blank=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    portfolio = models.URLField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Profile of {self.user.full_name}"


class EmployerProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='employer_profile')
    company_name = models.CharField(max_length=200)
    company_logo = models.ImageField(upload_to='company_logos/', null=True, blank=True)
    industry = models.CharField(max_length=100, blank=True)
    company_size = models.CharField(max_length=50, blank=True)
    website = models.URLField(blank=True)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=100, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Employer: {self.company_name}"