#!/usr/bin/env python
"""Script para executar em modo produção com Waitress."""
import os
import sys
from waitress import serve
from requerimento_django.wsgi import application  # Importa a aplicação WSGI do Django

if __name__ == '__main__':
    # Configurar para produção
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'requerimento_django.settings_prod')

    # Importar settings após DJANGO_SETTINGS_MODULE ser definido
    try:
        from django.conf import settings
        # django.setup() é chamado implicitamente quando a aplicação WSGI é carregada
        # e as configurações são acessadas.
    except ImportError as exc:
        raise ImportError(
            "Couldn\'t import Django. Are you sure it\'s installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    except Exception as e:
        print(f"❌ Erro ao importar ou configurar Django settings: {e}")
        sys.exit(1)

    host = '0.0.0.0'
    port = 8000  # A mesma porta que você estava usando

    print(f"🚀 Iniciando servidor de PRODUÇÃO com Waitress...")
    print(f"🔗 Aplicação: requerimento_django.wsgi.application")
    print(f"⚙️  Usando settings: {os.environ.get('DJANGO_SETTINGS_MODULE')}")
    print(f"✅ DEBUG = {settings.DEBUG}")  # Deve ser False
    print(f"🌍 Escutando em: http://{host}:{port}")
    print(f"   Acesso local: http://127.0.0.1:{port}")
    print(f"   Acesso na rede: http://[COLOQUE_O_IP_DA_SUA_MAQUINA_AQUI]:{port}")
    print("-" * 70)
    print("Para parar o servidor, pressione Ctrl+C")

    try:
        serve(application, host=host, port=port)
    except Exception as e:
        print(f"❌ ERRO AO INICIAR O SERVIDOR WAITRESS (run_prod.py): {e}")
        import traceback
        traceback.print_exc()