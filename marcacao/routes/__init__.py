from marcacao.routes.cadastro_routes import cadastro_bp
from marcacao.routes.home import home_bp
from marcacao.routes.requerimento_routes import requerimento_bp

# Exponha os blueprints para facilitar a importação
__all__ = ['cadastro_bp', 'home_bp', 'requerimento_bp']