from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, ProjectSerializer, ProjectOwnerSerializer
from .models import User, Project, ProjectOwner


class UserCreate(APIView):

    permission_classes = (AllowAny,)

    def post(self, request):
        ser = UserSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        ser.save()
        return Response(data={"msg": "User created!"}, status=status.HTTP_201_CREATED)


class UserView(APIView):
    def get(self, request):
        try:
            user = User.objects.filter(id=request.user.id).first()
            ser = UserSerializer(user)
            return Response(data=ser.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def patch(self, request):
        try:
            user = User.objects.filter(id=request.user.id).first()
            ser = UserSerializer(user, data=request.data)
            ser.is_valid(raise_exception=True)
            ser.save()

            return Response(data={"msg": "Data was changed"}, status=status.HTTP_200_OK)
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

            ser.is_valid(raise_exception=True)

            ser.save()

            owner_ser = ProjectOwnerSerializer(
                data={"user_id": request.user.id, "project_id": ser.data["id"]}
            )

            owner_ser.is_valid(raise_exception=True)

            owner_ser.save()

            return Response(
                data={"msg": "Project added"}, status=status.HTTP_201_CREATED
            )
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request, pk, format=None):
        try:
            project = Project.objects.filter(id=pk).first()
            ser = ProjectSerializer(project, data=request.data)
            ser.is_valid(raise_exception=True)
            ser.save()

            owner_ser = ProjectOwnerSerializer(
                data={"user_id": request.user.id, "project_id": ser.data["id"]}
            )

            owner_ser.is_valid(raise_exception=True)

            return Response(data={"msg": "Project updated"}, status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk, format=None):
        try:
            Project.objects.filter(id=pk).delete()
            ProjectOwner.objects.filter(project_id=pk).delete()
            return Response(data={"msg": "Project deleted"}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
