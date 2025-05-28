from .settings import *

# CONFIGURAÇÕES DE PRODUÇÃO
DEBUG = False

# IPs específicos permitidos em produção
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '192.168.1.195',
    '*',
]

# Manter o PostgreSQL para produção (mesma base)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'requerimentodb', # Alterado de requerimentodb2
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

# Configurações de arquivos estáticos para PRODUÇÃO
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles_prod' # Pasta específica para produção

# Explicitamente definir STATICFILES_DIRS para garantir que collectstatic encontre os arquivos do projeto
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

# WhiteNoise configuration for production
# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATICFILES_STORAGE = 'whitenoise.storage.StaticFilesStorage' # Simpler backend for testing

# Configurações de segurança para produção
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Manter configurações de email
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_HOST_USER = 'vitorateles@gmail.com'
EMAIL_HOST_PASSWORD = 'uzlq okzl quoa jgjr'
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER