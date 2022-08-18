from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import (
    UserSerializer,
    ProjectSerializer,
    ProjectOwnerSerializer,
    CommentSerializer,
)
from .models import User, Project, ProjectOwner, Comment


class UserCreate(APIView):

    permission_classes = (AllowAny,)

    def post(self, request):
        ser = UserSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(
                data={"msg": "User created!"}, status=status.HTTP_201_CREATED
            )

        return Response(data=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    def get(self, request):
        try:
            user = User.objects.filter(id=request.user.id).first()
            ser = UserSerializer(user)
            return Response(data=ser.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request):
        try:
            user = User.objects.filter(id=request.user.id).first()
            ser = UserSerializer(user, data=request.data)
            if ser.is_valid():
                ser.save()

                return Response(
                    data={"msg": "User was changed"}, status=status.HTTP_200_OK
                )

            return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class ProjectView(APIView):
    def get(self, request):
        try:
            projects = Project.objects.filter(user=request.user)
            ser = ProjectSerializer(projects, many=True)
            return Response(data=ser.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request):
        try:
            ser = ProjectSerializer(
                data={
                    "project_name": request.data["project_name"],
                    "start_date": request.data["start_date"],
                    "end_date": request.data["end_date"],
                    "description": request.data["description"],
                }
            )

            if ser.is_valid():

                ser.save()

                owner_ser = ProjectOwnerSerializer(
                    data={"user_id": request.user.id, "project_id": ser.data["id"]}
                )

                owner_ser.is_valid(raise_exception=True)

                owner_ser.save()

                return Response(
                    data={"msg": "Project added"}, status=status.HTTP_201_CREATED
                )

            return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request, pk, format=None):
        try:
            project = Project.objects.filter(id=pk).first()
            ser = ProjectSerializer(project, data=request.data)
            if ser.is_valid():
                ser.save()

                owner_ser = ProjectOwnerSerializer(
                    data={"user_id": request.user.id, "project_id": ser.data["id"]}
                )

                owner_ser.is_valid(raise_exception=True)

                return Response(
                    data={"msg": "Project updated"}, status=status.HTTP_200_OK
                )

            return Response(status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk, format=None):
        try:
            Project.objects.filter(id=pk).delete()
            ProjectOwner.objects.filter(project_id=pk).delete()
            return Response(data={"msg": "Project deleted"}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class CommentView(APIView):
    def get(self, request, pk, format=None):
        try:
            comment = Comment.objects.filter(project_id=pk)
            ser = CommentSerializer(comment, many=True)
            return Response(data=ser.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, format=None):
        try:

            ser = CommentSerializer(
                data={
                    "user_id": request.user.id,
                    "project_id": request.data["project_id"],
                    "description": request.data["description"],
                }
            )

            if ser.is_valid():

                ser.save()

                return Response(
                    data={"msg": "Comment added"}, status=status.HTTP_201_CREATED
                )

            return Response(status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
