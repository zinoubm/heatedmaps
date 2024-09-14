#!/bin/bash

python manage.py migrate
gunicorn heatedmaps.wsgi:application --bind 0.0.0.0:8000
