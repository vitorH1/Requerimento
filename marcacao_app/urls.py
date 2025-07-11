from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home_redirect, name='home_redirect'),
    path('requerimentos/', views.listar_requerimentos, name='listar_requerimentos'),
    path('requerimentos/<str:req_id>/', views.requerimento_detalhes, name='requerimento_detalhes'),
    path('cadastro', views.cadastro, name='cadastro'),
    path('buscar_cliente/<str:cpf>', views.buscar_cliente, name='buscar_cliente'),
    path('upload_pdf/', views.upload_pdf, name='upload_pdf'),
    path('pdfs/<str:nome_pdf>/', views.exibir_pdf, name='exibir_pdf'),
    path('consultar_pdfs/<str:cpf>/', views.consultar_pdfs, name='consultar_pdfs'),
    path('buscar_cliente_pdfs/', views.buscar_cliente_pdfs, name='buscar_cliente_pdfs'),
    path('enviar_pdf_email/', views.enviar_pdf_email, name='enviar_pdf_email'),
    path('adicionar-texto-requerimento/', views.adicionar_texto_requerimento, name='adicionar_texto_requerimento'),
    path('textos-requerimento/', views.listar_textos_requerimento, name='listar_textos_requerimento'),
    path('texto-requerimento/<int:chave>/', views.detalhar_texto_requerimento, name='detalhar_texto_requerimento'),
    path('declaracoes/', views.listar_declaracoes, name='listar_declaracoes'),
    path('declaracoes/primeira-aquisicao-imobiliaria/', views.primeira_aquisicao_imobiliaria, name='primeira_aquisicao_imobiliaria'),
    path("__reload__/", include("django_browser_reload.urls")),
]