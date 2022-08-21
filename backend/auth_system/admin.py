from django.contrib import admin
from .models import User, Project, ProjectMembers, Comment

# Register your models here.
admin.site.register(User)
admin.site.register(Project)
admin.site.register(ProjectMembers)
admin.site.register(Comment)
