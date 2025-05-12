import re

def validar_cpf(cpf):
    """Valida um CPF removendo caracteres não numéricos e verificando dígitos verificadores"""
    cpf = re.sub(r'\D', '', cpf)
    if len(cpf) != 11 or cpf == cpf[0] * 11:
        return False
    for i in range(9, 11):
        soma = sum(int(cpf[num]) * ((i + 1) - num) for num in range(i))
        dig = ((soma * 10) % 11) % 10
        if dig != int(cpf[i]):
            return False
    return True

def validar_rg(rg):
    """Valida um RG removendo caracteres não numéricos e verificando tamanho"""
    rg = re.sub(r'\D', '', rg)
    return 7 <= len(rg) <= 9

def validar_telefone(telefone):
    """Valida um telefone removendo caracteres não numéricos e verificando tamanho"""
    telefone = re.sub(r'\D', '', telefone)
    return len(telefone) >= 10 and len(telefone) <= 11

def processar_formulario(form_data):
    """Processa e valida dados de formulário"""
    dados_validados = {}

    if 'cpf' in form_data:
        cpf = form_data['cpf']
        if not validar_cpf(cpf):
            raise ValueError('CPF inválido')
        dados_validados['cpf'] = cpf

    if 'rg' in form_data:
        rg = form_data['rg']
        if not validar_rg(rg):
            raise ValueError('RG inválido')
        dados_validados['rg'] = rg

    if 'telefone' in form_data:
        telefone = form_data['telefone']
        if not validar_telefone(telefone):
            raise ValueError('Telefone inválido')
        dados_validados['telefone'] = telefone

    campos_maiusculos = ['nome', 'nacionalidade', 'estado_civil', 'profissao', 'bairro', 'cidade']
    for campo in campos_maiusculos:
        if campo in form_data:
            dados_validados[campo] = form_data[campo].upper()

    return dados_validados

def limpar_cpf(cpf):
    """Remove caracteres não numéricos do CPF"""
    return re.sub(r'\D', '', cpf) if cpf else None

def limpar_documento(documento):
    """Remove caracteres não numéricos de um documento"""
    return re.sub(r'\D', '', documento) if documento else None