from django.db import models
from .managers import UserManager
from django.contrib.auth.models import AbstractUser


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

    objects = UserManager()

    def __str__(self):
        return self.email
