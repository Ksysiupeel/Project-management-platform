from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, ProjectSerializer, ProjectOwnerSerializer
from .models import ProjectOwner, User, Project


class UserCreate(APIView):
    def post(self, request):
        ser = UserSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        ser.save()
        return Response(data={"msg": "User created!"}, status=status.HTTP_201_CREATED)


class UserView(APIView):

    permission_classes = (IsAuthenticated,)

    def patch(self, request):
        user = User.objects.filter(id=request.user.id).first()
        ser = UserSerializer(user, data=request.data)
        ser.is_valid(raise_exception=True)
        ser.save()

        return Response(data={"msg": "Data was changed"}, status=status.HTTP_200_OK)


class ProjectView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        projects = Project.objects.filter(user=request.user)
        ser = ProjectSerializer(projects, many=True)
        return Response(data=ser.data, status=status.HTTP_200_OK)

    def post(self, request):
        ser = ProjectSerializer(
            data={
                "project_name": request.data["project_name"],
                "start_date": request.data["start_date"],
                "end_date": request.data["end_date"],
                "operations": request.data["operations"],
            }
        )

        ser.is_valid(raise_exception=True)

        ser.save()

        owner_ser = ProjectOwnerSerializer(
            data={"user_id": request.user.id, "project_id": ser.data["id"]}
        )

        owner_ser.is_valid(raise_exception=True)

        owner_ser.save()

        return Response(data={"msg": "Project added"}, status=status.HTTP_201_CREATED)

    def put(self, request, pk, format=None):
        pass

    def delete(self, request, pk, format=None):
        pass
