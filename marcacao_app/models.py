from django.db import models

# Create your models here.

class Cliente(models.Model):
    class Meta:
        db_table = 'clientes'

    nome = models.CharField(max_length=100)
    rg = models.CharField(max_length=20, blank=True, null=True)
    cpf = models.CharField(max_length=14, unique=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    nacionalidade = models.CharField(max_length=50, blank=True, null=True)
    estado_civil = models.CharField(max_length=50, blank=True, null=True)
    profissao = models.CharField(max_length=100, blank=True, null=True)
    endereco = models.CharField(max_length=200, blank=True, null=True)
    numero = models.CharField(max_length=10, blank=True, null=True)
    complemento = models.CharField(max_length=50, blank=True, null=True)
    bairro = models.CharField(max_length=100, blank=True, null=True)
    cidade = models.CharField(max_length=100, blank=True, null=True)
    uf = models.CharField(max_length=2, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.nome
