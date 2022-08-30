from django.db import models
from .managers import UserManager
from django.contrib.auth.models import AbstractUser


class Project(models.Model):
    project_name = models.CharField(max_length=30)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=13, default="New")
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.project_name


class User(AbstractUser):
    username = None
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    gender = models.CharField(
        max_length=9, choices=[("Man", "Male"), ("Woman", "Female")]
    )
    birth_date = models.DateField()
    phone_number = models.CharField(max_length=9, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "password", "gender", "birth_date"]

    projects = models.ManyToManyField(Project, through="ProjectMembers")

    objects = UserManager()

    def __str__(self):
        return self.email


class ProjectMembers(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.project_id.project_name} - {self.user_id.first_name}"


class Comment(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    description = models.CharField(max_length=200)
    date_added = models.DateTimeField(auto_now_add=True, blank=True)
