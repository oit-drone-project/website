# backend/Dockerfile
FROM python:3.11

ENV PYTHONUNBUFFERED 1
WORKDIR /app

COPY docker/django/requirements.txt /app/
RUN pip install -r requirements.txt

# Check if the Django project already exists, if not create one
RUN if [ ! -f /app/manage.py ]; then django-admin startproject django_project .; fi

EXPOSE 8000