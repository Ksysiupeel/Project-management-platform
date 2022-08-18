from django.urls import path
from .views import UserCreate, UserView, ProjectView, CommentView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("user/", UserView.as_view()),
    path("user/create/", UserCreate.as_view()),
    path("user/edit/", UserView.as_view()),
    path("user/projects/", ProjectView.as_view()),
    path("user/projects/<int:pk>/", ProjectView.as_view()),
    path("user/comment/add/", CommentView.as_view()),
    path("token/obtain/", TokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
]
