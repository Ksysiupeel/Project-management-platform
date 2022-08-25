from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ParseError, ValidationError
from .serializers import (
    UserSerializer,
    ProjectSerializer,
    ProjectMembersSerializer,
    CommentSerializer,
    UserListSerializer,
)
from .models import User, Project, ProjectMembers, Comment


class UserCreate(APIView):

    permission_classes = (AllowAny,)

    def post(self, request):
        try:
            ser = UserSerializer(data=request.data)
            ser.is_valid(raise_exception=True)
            ser.save()
            return Response(
                data={"msg": "User created!"}, status=status.HTTP_201_CREATED
            )
        except (ParseError, ValidationError):
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    def get(self, request):
        user = User.objects.filter(id=request.user.id).first()
        ser = UserSerializer(user)
        return Response(data=ser.data, status=status.HTTP_200_OK)

    def patch(self, request):
        try:
            user = User.objects.filter(id=request.user.id).first()
            ser = UserSerializer(user, data=request.data, partial=True)
            ser.is_valid(raise_exception=True)
            ser.save()
            return Response(data={"msg": "Updated"}, status=status.HTTP_200_OK)
        except (ParseError, ValidationError):
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ProjectView(APIView):
    def get(self, request):
        projects = Project.objects.filter(user=request.user)
        ser = ProjectSerializer(projects, many=True)
        return Response(data=ser.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:

            if request.data["start_date"] > request.data["end_date"]:
                raise ValidationError

            ser = ProjectSerializer(
                data={
                    "project_name": request.data["project_name"],
                    "start_date": request.data["start_date"],
                    "end_date": request.data["end_date"],
                    "description": request.data["description"],
                }
            )

            ser.is_valid(raise_exception=True)

            ser.save()

            member_ser = ProjectMembersSerializer(
                data={"user_id": request.user.id, "project_id": ser.data["id"]}
            )

            member_ser.is_valid(raise_exception=True)

            member_ser.save()

            if request.data.get("user_id", None) != None:

                member = ProjectMembersSerializer(
                    data={
                        "user_id": request.data["user_id"],
                        "project_id": ser.data["id"],
                    }
                )
                member.is_valid(raise_exception=True)
                member.save()

            return Response(
                data={"msg": "Project added"}, status=status.HTTP_201_CREATED
            )

        except (ParseError, ValidationError):
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        try:
            project = Project.objects.filter(id=pk).first()
            ser = ProjectSerializer(project, data=request.data)
            ser.is_valid(raise_exception=True)
            ser.save()

            member_ser = ProjectMembersSerializer(
                data={"user_id": request.user.id, "project_id": ser.data["id"]}
            )

            member_ser.is_valid(raise_exception=True)

            return Response(data={"msg": "Project updated"}, status=status.HTTP_200_OK)

        except (ParseError, ValidationError):
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        Project.objects.filter(id=pk).delete()
        ProjectMembers.objects.filter(project_id=pk).delete()
        return Response(data={"msg": "Project deleted"}, status=status.HTTP_200_OK)


class CommentView(APIView):
    def get(self, request, pk, format=None):
        comment = Comment.objects.filter(project_id=pk)
        ser = CommentSerializer(comment, many=True)
        return Response(data=ser.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        try:

            ser = CommentSerializer(
                data={
                    "user_id": request.user.id,
                    "project_id": request.data["project_id"],
                    "description": request.data["description"],
                }
            )

            ser.is_valid(raise_exception=True)

            ser.save()

            return Response(
                data={"msg": "Comment added"}, status=status.HTTP_201_CREATED
            )

        except (ParseError, ValidationError):
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserListView(APIView):
    def get(self, request):
        users = User.objects.exclude(id=request.user.id)
        ser = UserListSerializer(users, many=True)
        return Response(data=ser.data, status=status.HTTP_200_OK)
