from flask import Blueprint, render_template, request
import os
from config import REQUERIMENTOS, TEMPLATES_DETALHES_PATH

requerimento_bp = Blueprint('requerimento', __name__)

@requerimento_bp.route('/requerimentos')
def requerimentos():
    """Lista todos os requerimentos disponíveis"""
    search_query = request.args.get('q', '')
    if search_query:
        filtered_requerimentos = [
            req for req in REQUERIMENTOS 
            if search_query.lower() in req['nome'].lower() or search_query.lower() in req['descricao'].lower()
        ]
    else:
        filtered_requerimentos = REQUERIMENTOS
    return render_template('modelo_requerimentos.html', 
                           requerimentos=filtered_requerimentos,
                           search_query=search_query)

@requerimento_bp.route('/requerimentos/<req_id>', methods=['GET'])
def requerimento_detalhes(req_id):
    """Exibe detalhes de um requerimento específico"""
    requerimento = next((req for req in REQUERIMENTOS if req['id'] == req_id), None)
    if requerimento:
        template_path = os.path.join(TEMPLATES_DETALHES_PATH, f"{req_id}.html")
        
        # Verificando se o template específico existe
        try:
            template_exists = os.path.exists(template_path)
        except:
            template_exists = False
            
        if template_exists:
            return render_template(f"requerimentos/{req_id}.html", requerimento=requerimento)
        else:
            return render_template('requerimentos/generico.html', requerimento=requerimento)
    else:
        return render_template('erro.html', mensagem="Requerimento não encontrado"), 404