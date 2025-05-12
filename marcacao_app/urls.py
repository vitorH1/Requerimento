from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_redirect, name='home_redirect'),
    path('requerimentos/', views.listar_requerimentos, name='listar_requerimentos'),
    path('requerimentos/<str:req_id>/', views.requerimento_detalhes, name='requerimento_detalhes'),
    path('cadastro', views.cadastro, name='cadastro'),
] 