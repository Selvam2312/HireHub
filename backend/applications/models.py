from django.db import models
from django.conf import settings
from jobs.models import Job


class Application(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
        ('shortlisted', 'Shortlisted'),
        ('rejected', 'Rejected'),
        ('hired', 'Hired'),
    )

    applicant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='my_applications')
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='job_applications')
    resume = models.FileField(upload_to='resumes/')
    cover_letter = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['applicant', 'job']
        ordering = ['-applied_at']

    def __str__(self):
        return f"{self.applicant.full_name} → {self.job.title}"