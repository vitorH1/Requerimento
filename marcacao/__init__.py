from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
import sys

# Adicionando o diretório pai ao caminho para importações
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Criando a instância do SQLAlchemy
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Importando configurações
    from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS
    
    # Configuração do app
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS
    
    # Inicializando o SQLAlchemy com o app
    db.init_app(app)
    
    # Registrando blueprints (rotas)
    from marcacao.routes import cadastro_bp, home_bp, requerimento_bp
    
    app.register_blueprint(cadastro_bp)
    app.register_blueprint(home_bp)
    app.register_blueprint(requerimento_bp)
    
    return app