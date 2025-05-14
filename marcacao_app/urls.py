from django.urls import path
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
]