from django.urls import path
from .views import UserCreate, UserView, ProjectView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("user/create/", UserCreate.as_view()),
    path("user/edit/", UserView.as_view()),
    path("user/projects/", ProjectView.as_view()),
    path("token/obtain/", TokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
]
