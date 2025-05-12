import re

def validar_cpf(cpf):
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
    rg = re.sub(r'\D', '', rg)
    return 7 <= len(rg) <= 9

def validar_telefone(telefone):
    telefone = re.sub(r'\D', '', telefone)
    return 10 <= len(telefone) <= 11
