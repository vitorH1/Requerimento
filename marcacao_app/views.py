from .models import Cliente, ArquivoPDF
from django.shortcuts import render, redirect
from django.template import TemplateDoesNotExist
import os
import django
from config import REQUERIMENTOS, TEMPLATES_DETALHES_PATH
from django.template.defaultfilters import register
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, FileResponse
import json
from marcacao_app.utils import limpar_cpf
from django.views.decorators.http import require_GET
from django.template.loader import render_to_string
from django.conf import settings
import tempfile
from django.core.mail import EmailMessage
from django.core.mail import get_connection
from unicodedata import normalize
from .forms import TextoRequerimentoForm
from .models import TextoRequerimento
import os

# Create your views here.

# Filtro personalizado para template para mostrar o tipo de um objeto
@register.filter(name='type_name')
def type_name(value):
    return type(value).__name__

# Filtro para acessar item de dicionário por chave
@register.filter(name='get_item')
def get_item(dictionary, key):
    if dictionary is None:
        return ''
    if isinstance(dictionary, dict):
        return dictionary.get(key, '')
    return ''

# Filtro para obter o nome do último item de uma lista
@register.filter(name='get_last_name')
def get_last_name(items):
    if not items or len(items) == 0:
        return ''
    last_item = items[-1]
    if isinstance(last_item, dict) and 'nome' in last_item:
        return last_item['nome']
    return str(last_item)

# View para listar todos os requerimentos
def listar_requerimentos(request):
    from config import REQUERIMENTOS as CONFIG_REQUERIMENTOS
    search_query = request.GET.get('q', '')
    if search_query:
        filtered_requerimentos = [
            req for req in CONFIG_REQUERIMENTOS
            if search_query.lower() in req['nome'].lower() or search_query.lower() in req['descricao'].lower()
        ]
    else:
        filtered_requerimentos = CONFIG_REQUERIMENTOS.copy()
    return render(request, 'modelo_requerimentos.html', {
        'requerimentos': filtered_requerimentos,
        'search_query': search_query
    })

# View para exibir detalhes de um requerimento específico
def requerimento_detalhes(request, req_id):
    from config import REQUERIMENTOS as CONFIG_REQUERIMENTOS
    import datetime
    requerimento = next((req for req in CONFIG_REQUERIMENTOS if req['id'] == req_id), None)
    if requerimento:
        template_path = f"requerimentos/{req_id}.html"
        print(f"Tentando carregar template: {template_path}")
        context = {'requerimento': requerimento}
        if req_id == 'averbacao_obito':
            context['dias'] = range(1, 32)
            ano_atual = datetime.date.today().year
            context['anos'] = range(ano_atual, ano_atual - 120, -1)
        try:
            return render(request, template_path, context)
        except TemplateDoesNotExist:
            print(f"Template {template_path} não encontrado. Usando template genérico.")
            return render(request, 'requerimentos/generico.html', {'requerimento': requerimento})
    else:
        print(f"Requerimento com ID '{req_id}' não encontrado")
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
            # Verifica se já existe um cliente com esse CPF
            if Cliente.objects.filter(cpf=cpf_limpo).exists():
                return JsonResponse({'erro': 'CPF já cadastrado!'}, status=400)
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

@require_GET
def buscar_cliente(request, cpf):
    from marcacao_app.utils import limpar_cpf
    cpf_limpo = limpar_cpf(cpf)
    try:
        cliente = Cliente.objects.get(cpf=cpf_limpo)
        return JsonResponse({
            "nome": cliente.nome,
            "rg": cliente.rg,
            "telefone": cliente.telefone,
            "nacionalidade": cliente.nacionalidade,
            "estado_civil": cliente.estado_civil,
            "profissao": cliente.profissao,
            "endereco": cliente.endereco,
            "numero": cliente.numero,
            "complemento": cliente.complemento,
            "bairro": cliente.bairro,
            "cidade": cliente.cidade,
            "uf": cliente.uf,
            "email": cliente.email,
        })
    except Cliente.DoesNotExist:
        return JsonResponse({"erro": "Cliente não encontrado"}, status=404)

PDF_UPLOAD_DIR = r"C:\Aplicacoes\pdfs"

# Garantir que a pasta de upload existe
if not os.path.exists(PDF_UPLOAD_DIR):
    try:
        os.makedirs(PDF_UPLOAD_DIR)
        print(f"Pasta de upload criada: {PDF_UPLOAD_DIR}")
    except Exception as e:
        print(f"Erro ao criar pasta de upload: {str(e)}")

import re

@csrf_exempt
def upload_pdf(request):
    if request.method == 'POST':
        cpf = request.POST.get('cpf')
        if not cpf:
            return JsonResponse({'erro': 'CPF não informado'}, status=400)
        try:
            cliente = Cliente.objects.get(cpf=cpf)
        except Exception as e:
            return JsonResponse({'erro': f'Erro ao buscar cliente: {str(e)}'}, status=400)

        # Verifica se um arquivo foi enviado
        arquivo = request.FILES.get('pdf')
        if not arquivo or not arquivo.name.lower().endswith('.pdf'):
            return JsonResponse({'erro': 'Arquivo PDF não enviado'}, status=400)
        try:
            # Garantir que a pasta existe
            if not os.path.exists(PDF_UPLOAD_DIR):
                os.makedirs(PDF_UPLOAD_DIR)
                
            # Gera nome único para o arquivo
            nome_base = f"{cpf}.pdf"
            caminho = os.path.join(PDF_UPLOAD_DIR, nome_base)
            contador = 1
            while os.path.exists(caminho):
                nome_base = f"{cpf}({contador}).pdf"
                caminho = os.path.join(PDF_UPLOAD_DIR, nome_base)
                contador += 1

            # Salva o arquivo PDF enviado
            with open(caminho, 'wb') as destino:
                for chunk in arquivo.chunks():
                    destino.write(chunk)

            # Salva no banco
            ArquivoPDF.objects.create(cliente=cliente, nome_arquivo=nome_base)
            return JsonResponse({'mensagem': 'Upload realizado com sucesso!', 'nome_pdf': nome_base})
        except Exception as e:
            import traceback
            traceback.print_exc()
            return JsonResponse({'erro': f'Erro ao salvar PDF: {str(e)}'}, status=500)
    return JsonResponse({'erro': 'Arquivo não enviado'}, status=400)

def exibir_pdf(request, nome_pdf):
    caminho = os.path.join(PDF_UPLOAD_DIR, nome_pdf)
    if os.path.exists(caminho):
        try:
            return FileResponse(open(caminho, 'rb'), content_type='application/pdf')
        except Exception as e:
            import traceback
            traceback.print_exc()
            return JsonResponse({'erro': f'Erro ao abrir o arquivo: {str(e)}'}, status=500)
    return JsonResponse({'erro': f'Arquivo não encontrado: {caminho}'}, status=404)

def consultar_pdfs(request, cpf):
    try:
        cliente = Cliente.objects.get(cpf=cpf)
        pdfs = cliente.pdfs.all()
        return render(request, 'consultar_pdfs.html', {'cliente': cliente, 'pdfs': pdfs})
    except Cliente.DoesNotExist:
        return render(request, 'erro.html', {'mensagem': 'Cliente não encontrado'})

def buscar_cliente_pdfs(request):
    if request.method == 'POST':
        cpf = request.POST.get('cpf')
        if cpf:
            return redirect('consultar_pdfs', cpf=cpf)
    return render(request, 'buscar_cliente_pdfs.html')

@csrf_exempt
def enviar_pdf_email(request):
    if request.method == 'POST':
        cpf = request.POST.get('cpf')
        email_destino = request.POST.get('email')
        if not cpf or not email_destino:
            return JsonResponse({'erro': 'CPF e email são obrigatórios.'}, status=400)
        try:
            cliente = Cliente.objects.get(cpf=cpf)
        except Exception as e:
            return JsonResponse({'erro': f'Erro ao buscar cliente: {str(e)}'}, status=400)
        arquivo = request.FILES.get('pdf')
        if not arquivo or not arquivo.name.lower().endswith('.pdf'):
            return JsonResponse({'erro': 'Arquivo PDF não enviado'}, status=400)
        try:
            # Salva o PDF temporariamente
            with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp:
                for chunk in arquivo.chunks():
                    temp.write(chunk)
                temp_path = temp.name
            # Usa conexão padrão (TLS)
            connection = get_connection()
            email = EmailMessage(
                subject='Requerimento em PDF',
                body=f'Olá,\n\nSegue em anexo o PDF do requerimento gerado para o CPF {cpf}.',
                to=[email_destino],
                connection=connection
            )
            email.attach(arquivo.name, open(temp_path, 'rb').read(), 'application/pdf')
            email.send()
            os.remove(temp_path)
            return JsonResponse({'mensagem': 'PDF enviado por email com sucesso!'})
        except Exception as e:
            return JsonResponse({'erro': f'Erro ao enviar email: {str(e)}'}, status=500)
    return JsonResponse({'erro': 'Arquivo não enviado'}, status=400)

# Função para normalizar o nome do arquivo
import unicodedata
def normalizar(texto):
    if not texto:
        return ''
    # Remove acentos e troca ç por c
    texto = unicodedata.normalize('NFKD', texto).encode('ASCII', 'ignore').decode('ASCII')
    return texto.replace('ç', 'c').replace('Ç', 'C').lower()

def listar_requerimentos(request):
    from config import REQUERIMENTOS as CONFIG_REQUERIMENTOS
    search_query = request.GET.get('q', '')
    if search_query:
        search_norm = normalizar(search_query)
        filtered_requerimentos = [
            req for req in CONFIG_REQUERIMENTOS
            if search_norm in normalizar(req['nome']) or search_norm in normalizar(req['descricao'])
        ]
    else:
        filtered_requerimentos = CONFIG_REQUERIMENTOS.copy()
    return render(request, 'modelo_requerimentos.html', {
        'requerimentos': filtered_requerimentos,
        'search_query': search_query
    })

def adicionar_texto_requerimento(request):
    if request.method == 'POST':
        form = TextoRequerimentoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('adicionar_texto_requerimento')
    else:
        form = TextoRequerimentoForm()
    return render(request, 'adicionar_texto_requerimento.html', {'form': form})

def listar_textos_requerimento(request):
    textos = TextoRequerimento.objects.all().order_by('CHAVE_REQUERIMENTOS')
    return render(request, 'listar_textos_requerimento.html', {'textos': textos})

def detalhar_texto_requerimento(request, chave):
    texto = TextoRequerimento.objects.get(CHAVE_REQUERIMENTOS=chave)
    return render(request, 'detalhar_texto_requerimento.html', {'texto': texto})




def listar_declaracoes(request):
    from django.urls import reverse
    declaracoes = [
        {
            "id": "primeira_aquisicao_imobiliaria",
            "nome": "Primeira Aquisição Imobiliária",
            "descricao": "Declaração para primeira aquisição de imóvel residencial com redução de emolumentos.",
            "icone": "<img width='35' height='35' src='https://img.icons8.com/ios/50/signing-a-document.png' alt='signing-a-document'/>",
            "url": reverse("primeira_aquisicao_imobiliaria")
        }
    ]
    return render(request, "declaracoes/listar_declaracoes.html", {"declaracoes": declaracoes})



def primeira_aquisicao_imobiliaria(request):
    return render(request, "declaracoes/primeira_aquisicao_imobiliaria.html")