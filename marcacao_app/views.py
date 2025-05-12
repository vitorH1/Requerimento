from .models import Cliente
from django.shortcuts import render, redirect
from django.template import TemplateDoesNotExist
import os
from config import REQUERIMENTOS, TEMPLATES_DETALHES_PATH
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from marcacao_app.utils import limpar_cpf

# Create your views here.

# View para listar todos os requerimentos
def listar_requerimentos(request):
    search_query = request.GET.get('q', '')
    if search_query:
        filtered_requerimentos = [
            req for req in REQUERIMENTOS
            if search_query.lower() in req['nome'].lower() or search_query.lower() in req['descricao'].lower()
        ]
    else:
        filtered_requerimentos = REQUERIMENTOS
    return render(request, 'modelo_requerimentos.html', {
        'requerimentos': filtered_requerimentos,
        'search_query': search_query
    })

# View para exibir detalhes de um requerimento específico
def requerimento_detalhes(request, req_id):
    requerimento = next((req for req in REQUERIMENTOS if req['id'] == req_id), None)
    if requerimento:
        try:
            return render(request, f"requerimentos/{req_id}.html", {'requerimento': requerimento})
        except TemplateDoesNotExist:
            return render(request, 'requerimentos/generico.html', {'requerimento': requerimento})
    else:
        return render(request, 'erro.html', {'mensagem': "Requerimento não encontrado"}, status=404)

# View para redirecionar a raiz para a lista de requerimentos
def home_redirect(request):
    return redirect('listar_requerimentos')

@csrf_exempt
def cadastro(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            cpf_limpo = limpar_cpf(data.get('cpf', ''))
            cliente = Cliente.objects.create(
                nome=data.get('nome', ''),
                rg=data.get('rg', ''),
                cpf=cpf_limpo,
                telefone=data.get('telefone', ''),
                nacionalidade=data.get('nacionalidade', ''),
                estado_civil=data.get('estado_civil', ''),
                profissao=data.get('profissao', ''),
                endereco=data.get('endereco', ''),
                numero=data.get('numero', ''),
                complemento=data.get('complemento', ''),
                bairro=data.get('bairro', ''),
                cidade=data.get('cidade', ''),
                uf=data.get('uf', ''),
                email=data.get('email', '')
            )
            return JsonResponse({'mensagem': 'Cadastro salvo com sucesso!'})
        except Exception as e:
            return JsonResponse({'erro': f'Erro ao salvar: {str(e)}'}, status=400)
    return JsonResponse({'erro': 'Método não permitido'}, status=405)