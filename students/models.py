from django.db import models
from django.contrib.auth.models import AbstractUser
# sylabus
from django.conf import settings

class Course(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Syllabus(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='syllabi')
    title = models.CharField(max_length=200)
    description = models.TextField()
    file = models.FileField(upload_to='syllabus_files/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.course.name} - {self.title}"
# 
class CustomUser(AbstractUser):
    is_student = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

class StudentProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    roll_number = models.CharField(max_length=20)
    standard = models.CharField(max_length=100)
    tamil = models.IntegerField()
    english = models.IntegerField()
    maths = models.IntegerField()
    science = models.IntegerField()
    socialscience = models.IntegerField()

    def __str__(self):
        return self.user.username

class TeacherProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    subject = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=20)

    def __str__(self):
        return self.user.username

class careerinfo(models.Model):
    standard = models.CharField(max_length=100)
    fees = models.IntegerField()

    def __str__(self):
        return self.standard
