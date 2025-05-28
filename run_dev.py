#!/usr/bin/env python
"""Script para executar em modo desenvolvimento."""
import os
import sys

if __name__ == '__main__':
    # Configurar para desenvolvimento
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'requerimento_django.settings_dev')
    
    try:
        from django.core.management import execute_from_command_line
        from django.conf import settings # Importar settings aqui para ler DEBUG
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    # Executar servidor em modo desenvolvimento
    print("🚀 Iniciando servidor em MODO DESENVOLVIMENTO...")
    print("📍 Acesso local: http://127.0.0.1:8001") # Porta alterada
    print(f"🌐 Acesso rede: http://0.0.0.0:8001 (ou o IP da sua máquina na rede:8001)") # Porta alterada
    try:
        print(f"⚠️  DEBUG = {settings.DEBUG} (não usar em produção se for False)")
    except Exception as e:
        print(f"⚠️ Não foi possível ler DEBUG de settings_dev: {e}")
    print("-" * 50)
    
    try:
        # CORREÇÃO: usar 'manage.py' como primeiro argumento
        execute_from_command_line(['manage.py', 'runserver', '0.0.0.0:8001']) # Porta alterada
    except Exception as e:
        print(f"❌ ERRO AO INICIAR O SERVIDOR (run_dev.py): {e}")
        import traceback
        traceback.print_exc()