from rest_framework import serializers
from .models import User, Project, ProjectMembers, Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "password",
            "gender",
            "birth_date",
            "phone_number",
        ]

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)

        instance.save()

        return instance

    def update(self, instance, validated_data):
        user = super().update(instance, validated_data)
        if validated_data.get("password") is not None:
            user.set_password(validated_data["password"])
        user.save()
        return user


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class ProjectMembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMembers
        fields = "__all__"

    def to_representation(self, instance):
        return super().to_representation(instance)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

    def to_representation(self, instance):
        return super().to_representation(instance)


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name")
