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

# Manter o PostgreSQL para desenvolvimento (mesma base)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'requerimentodb2',  # Alterado para requerimentodb2
        'USER': 'postgres',
        'PASSWORD': 'admin',
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