FROM python:3.8

WORKDIR /usr/app/backend

COPY . .

RUN pip install django djangorestframework mysqlclient

EXPOSE 80

CMD python manage.py runserver 0.0.0.0:80