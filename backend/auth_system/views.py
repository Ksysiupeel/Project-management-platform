from .serializers import (
    UserSerializer,
    ProjectSerializer,
    ProjectMembersSerializer,
    CommentSerializer,
    UserListSerializer,
)
from .models import User, Project, ProjectMembers, Comment
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError
from datetime import date
import re


class UserCreate(APIView):

    permission_classes = (AllowAny,)

    def post(self, request):
        try:
            if len(request.data) < 6:
                raise ValidationError("You must provide all required fields")

            if (
                re.search(
                    r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b",
                    request.data["email"],
                )
                is None
            ):
                raise ValidationError("Wrong email format")

            if User.objects.filter(email=request.data["email"]):
                raise ValidationError("Given e-mail is already in use")

            if re.search(r"^[a-zA-Z]{2,20}$", request.data["first_name"]) is None:
                raise ValidationError("Invalid  first name format")

            if re.search(r"^[a-zA-Z]{2,20}$", request.data["last_name"]) is None:
                raise ValidationError("Invalid last name format")

            if request.data["birth_date"] > str(date.today()):
                raise ValidationError("Date of birth can't exceed today's date!")

            if request.data.get("phone_number", None) is not None:
                if re.search(r"^([0-9]{9})$", request.data.get("phone_number")) is None:
                    raise ValidationError("Wrong phone number format!")

            serializer = UserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(
                data={"msg": "User created!"}, status=status.HTTP_201_CREATED
            )
        except ValidationError as e:
            return Response(data={"msg": e.args[0]}, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    def get(self, request):
        user = (
            User.objects.filter(id=request.user.id)
            .values(
                "id",
                "first_name",
                "last_name",
                "email",
                "gender",
                "birth_date",
                "phone_number",
            )
            .first()
        )
        return Response(data=user, status=status.HTTP_200_OK)

    def patch(self, request):
        try:
            if len(request.data) < 1:
                raise ValidationError(
                    "To update the data, you must provide at least one value"
                )

            if request.data.get("email", None) is not None:
                if (
                    re.search(
                        r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b",
                        request.data["email"],
                    )
                    is None
                ):
                    raise ValidationError("Wrong email format")

            if request.data.get("first_name", None) is not None:
                if re.search(r"^[a-zA-Z]{2,20}$", request.data["first_name"]) is None:
                    raise ValidationError("Invalid  first name format")

            if request.data.get("last_name", None) is not None:
                if re.search(r"^[a-zA-Z]{2,20}$", request.data["last_name"]) is None:
                    raise ValidationError("Invalid last name format")

            if request.data.get("birth_date", None) is not None:
                if request.data["birth_date"] > str(date.today()):
                    raise ValidationError("Date of birth can't exceed today's date!")

            if request.data.get("phone_number", None) is not None:
                if request.data.get("phone_number", None) is not None:
                    if (
                        re.search(r"^([0-9]{9})$", request.data.get("phone_number"))
                        is None
                    ):
                        raise ValidationError("Wrong phone number format!")

            user = User.objects.filter(id=request.user.id).first()
            serializer = UserSerializer(user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(data={"msg": "Updated"}, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response(data={"msg": e.args[0]}, status=status.HTTP_400_BAD_REQUEST)


class ProjectView(APIView):
    def get(self, request):
        projects = Project.objects.filter(user=request.user)
        ser = ProjectSerializer(projects, many=True)
        return Response(data=ser.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:

            if len(request.data) < 4:
                raise ValidationError("You must provide all required fields")

            if request.data["start_date"] > request.data["end_date"]:
                raise ValidationError(
                    "the project start date can't be greater than the project end date"
                )

            serializer = ProjectSerializer(
                data={
                    "project_name": request.data["project_name"],
                    "start_date": request.data["start_date"],
                    "end_date": request.data["end_date"],
                    "description": request.data["description"],
                }
            )

            serializer.is_valid(raise_exception=True)

            serializer.save()

            member_serializer = ProjectMembersSerializer(
                data={"user_id": request.user.id, "project_id": serializer.data["id"]}
            )

            member_serializer.is_valid(raise_exception=True)

            member_serializer.save()

            return Response(
                data={"msg": "Project added"}, status=status.HTTP_201_CREATED
            )

        except ValidationError as e:
            return Response(data={"msg": e.args[0]}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        try:

            project_member = ProjectMembers.objects.filter(
                user_id=request.user.id
            ).filter(project_id=pk)

            if not project_member:
                raise ValidationError("You can't edit a project that you are not in")

            if request.data["start_date"] > request.data["end_date"]:
                raise ValidationError(
                    "the project start date can't be greater than the project end date"
                )

            project = Project.objects.filter(id=pk).first()

            serializer = ProjectSerializer(project, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(data={"msg": "Project updated"}, status=status.HTTP_200_OK)

        except ValidationError as e:
            return Response(data={"msg": e.args[0]}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:

            project_member = ProjectMembers.objects.filter(
                user_id=request.user.id
            ).filter(project_id=pk)

            if not project_member:
                raise ValidationError("You can't delete a project that you are not in")

            Project.objects.filter(id=pk).delete()
            ProjectMembers.objects.filter(project_id=pk).delete()
            return Response(data={"msg": "Project deleted"}, status=status.HTTP_200_OK)

        except ValidationError as e:
            return Response(data={"msg": e.args[0]}, status=status.HTTP_400_BAD_REQUEST)


class CommentView(APIView):
    def get(self, request, pk, format=None):
        comment = Comment.objects.filter(project_id=pk).order_by("date_added")
        ser = CommentSerializer(comment, many=True)
        return Response(data=ser.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        try:

            project_member = ProjectMembers.objects.filter(
                user_id=request.user.id
            ).filter(project_id=request.data["project_id"])

            if not project_member:
                raise ValidationError(
                    "You can't add a comment in a project that you are not in"
                )

            if request.data.get("description", None) is None:
                raise ValidationError("You must provide all required fields")

            serializer = CommentSerializer(
                data={
                    "user_id": request.user.id,
                    "project_id": request.data["project_id"],
                    "description": request.data["description"],
                }
            )

            serializer.is_valid(raise_exception=True)

            serializer.save()

            return Response(
                data={"msg": "Comment added"}, status=status.HTTP_201_CREATED
            )

        except ValidationError as e:
            return Response(data={"msg": e.args[0]}, status=status.HTTP_400_BAD_REQUEST)


class UserListView(APIView):
    def get(self, request, pk, format=None):
        project_members = ProjectMembers.objects.filter(project_id=pk)
        project_members_exclude = [member.user_id.id for member in project_members]

        users = User.objects.exclude(id__in=project_members_exclude)
        serializer = UserListSerializer(users, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class ProjectMembersView(APIView):
    def get(self, request, pk, format=None):
        members = ProjectMembers.objects.filter(project_id=pk).exclude(
            user_id=request.user.id
        )
        serializer = ProjectMembersSerializer(members, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, pk, format=None):
        try:
            project_member = ProjectMembers.objects.filter(
                user_id=request.user.id
            ).filter(project_id=pk)

            if not project_member:
                raise ValidationError(
                    "You can't add a user to a project that you are not in"
                )

            if isinstance(request.data["users_id"], list):

                for id in request.data["users_id"]:
                    member_serializer = ProjectMembersSerializer(
                        data={
                            "user_id": id,
                            "project_id": pk,
                        }
                    )
                    member_serializer.is_valid(raise_exception=True)
                    member_serializer.save()

            else:
                raise ValidationError("users_id parameter must be a list")

            return Response(data={"msg": "User added"}, status=status.HTTP_200_OK)

        except ValidationError as e:
            return Response(data={"msg": e.args[0]}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            project_member = ProjectMembers.objects.filter(
                user_id=request.user.id
            ).filter(project_id=request.query_params["project_id"])

            if not project_member:
                raise ValidationError(
                    "You can't remove a member from the project that you are not in"
                )

            ProjectMembers.objects.filter(user_id=pk).delete()
            return Response(data={"msg": "member removed"}, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response(data={"msg": e.args[0]}, status=status.HTTP_400_BAD_REQUEST)
