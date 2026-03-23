from django.db import models
from django.conf import settings


class Job(models.Model):
    JOB_TYPE_CHOICES = (
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
        ('internship', 'Internship'),
        ('contract', 'Contract'),
        ('remote', 'Remote'),
    )

    EXPERIENCE_CHOICES = (
        ('fresher', 'Fresher'),
        ('1-2', '1-2 Years'),
        ('2-5', '2-5 Years'),
        ('5+', '5+ Years'),
    )

    employer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posted_jobs')
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES)
    experience = models.CharField(max_length=20, choices=EXPERIENCE_CHOICES, default='fresher')
    salary_min = models.PositiveIntegerField(null=True, blank=True)
    salary_max = models.PositiveIntegerField(null=True, blank=True)
    description = models.TextField()
    requirements = models.TextField()
    skills = models.CharField(max_length=500, help_text='Comma separated skills')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deadline = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} at {self.company}"