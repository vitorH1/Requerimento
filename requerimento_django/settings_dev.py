from .settings import *

# CONFIGURAÇÕES DE DESENVOLVIMENTO
DEBUG = True

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    '192.168.1.195',
    '*',  # Permite qualquer host para desenvolvimento
]

# Desabilita WhiteNoise para desenvolvimento
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Manter o PostgreSQL para desenvolvimento (mesma base)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'requerimentodb',  # Alterado para requerimentodb2
        'USER': 'postgres',
        'PASSWORD': 'admin12',
        'HOST': 'localhost',
        'PORT': '5432',
        'OPTIONS': {
            'client_encoding': 'UTF8',
            'connect_timeout': 30,
            'options': '-c client_encoding=UTF8',
        },
    }
}

# Para desenvolvimento, STATICFILES_DIRS (herdado do settings.py) é usado pelo runserver.
# STATIC_ROOT é herdado do settings.py e será usado se você rodar collectstatic com este settings_dev.
# Não há necessidade de definir STATIC_ROOT ou STATICFILES_DIRS aqui, a menos que queira sobrescrever o settings.py

# Configurações específicas para desenvolvimento
# Força o Django a servir arquivos estáticos em desenvolvimento
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'

# Adiciona configurações para garantir que arquivos estáticos sejam servidos
import os

# Configuração de logging para ver requisições HTTP
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django.request': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}