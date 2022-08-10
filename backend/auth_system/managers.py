from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password, **kwargs):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(email=self.normalize_email(email), **kwargs)

        user.set_password(password)

        user.save(self._db)

        return user

    def create_superuser(self, email, password, **kwargs):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(email=self.normalize_email(email), **kwargs)

        user.set_password(password)

        user.is_staff = True
        user.is_superuser = True
        user.is_active = True

        user.save(self._db)

        return user
