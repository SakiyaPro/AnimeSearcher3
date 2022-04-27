#!/usr/bin/env bash
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --no-input --clear
uwsgi --socket :8001  --module config.wsgi --py-autoreload 1 -b 32768
