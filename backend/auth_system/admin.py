from django.contrib import admin
from .models import User, Project, ProjectOwner, Comment

# Register your models here.
admin.site.register(User)
admin.site.register(Project)
admin.site.register(ProjectOwner)
admin.site.register(Comment)
