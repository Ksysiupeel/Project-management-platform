from django.urls import path
from .views import UserCreate

urlpatterns = [
    path("user/create/", UserCreate.as_view()),
]
