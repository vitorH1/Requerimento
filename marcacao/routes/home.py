from flask import Blueprint, redirect, url_for
from sqlalchemy import text
from marcacao import db

home_bp = Blueprint('home', __name__)

@home_bp.route('/')
def index():
    """Rota principal que redireciona para a página de requerimentos"""
    return redirect(url_for('requerimento.requerimentos'))

