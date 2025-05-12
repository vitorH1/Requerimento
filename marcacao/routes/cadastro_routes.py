from flask import Blueprint, jsonify, render_template, request
import re
from marcacao import db
from marcacao.models.cliente import Cliente
from utils import limpar_cpf

cadastro_bp = Blueprint('cadastro', __name__)

@cadastro_bp.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    """Rota para cadastro e atualização de clientes"""
    if request.method == 'POST':
        try:
            data = request.get_json()
            
            # Removendo formatação do CPF antes de salvar
            cpf = limpar_cpf(data.get('cpf'))
            
            # Verificar se o cliente já existe
            cliente_existente = Cliente.query.filter_by(cpf=cpf).first()
            if cliente_existente:
                # Se o cliente já existe, atualize seus dados
                cliente_existente.nome = data.get('nome')
                cliente_existente.rg = limpar_cpf(data.get('rg'))
                cliente_existente.telefone = limpar_cpf(data.get('telefone'))
                cliente_existente.nacionalidade = data.get('nacionalidade')
                cliente_existente.estado_civil = data.get('estado_civil')
                cliente_existente.profissao = data.get('profissao')
                cliente_existente.endereco = data.get('endereco')
                cliente_existente.numero = data.get('numero')
                cliente_existente.complemento = data.get('complemento')
                cliente_existente.bairro = data.get('bairro')
                cliente_existente.cidade = data.get('cidade')
                cliente_existente.uf = data.get('uf')
                cliente_existente.email = data.get('email')
                
                db.session.commit()
                return jsonify({'mensagem': 'Cadastro atualizado com sucesso!'})
            else:
                # Se o cliente não existe, crie um novo
                novo_cliente = Cliente(
                    nome=data.get('nome'),
                    rg=limpar_cpf(data.get('rg')),
                    cpf=cpf,  # CPF sem formatação
                    telefone=limpar_cpf(data.get('telefone')),
                    nacionalidade=data.get('nacionalidade'),
                    estado_civil=data.get('estado_civil'),
                    profissao=data.get('profissao'),
                    endereco=data.get('endereco'),
                    numero=data.get('numero'),
                    complemento=data.get('complemento'),
                    bairro=data.get('bairro'),
                    cidade=data.get('cidade'),
                    uf=data.get('uf'),
                    email=data.get('email')
                )

                db.session.add(novo_cliente)
                db.session.commit()
                return jsonify({'mensagem': 'Cadastro salvo com sucesso!'})
                
        except Exception as e:
            db.session.rollback()
            print(f"Erro ao salvar no banco: {str(e)}")
            return jsonify({'erro': f'Erro ao salvar os dados: {str(e)}'}), 500

    return render_template('cadastro.html')


@cadastro_bp.route('/buscar_cliente/<cpf>')
def buscar_cliente(cpf):
    """Busca cliente pelo CPF"""
    try:
        # Remove formatação do CPF para buscar no banco
        cpf_limpo = limpar_cpf(cpf)
        
        print(f"Buscando cliente com CPF limpo: {cpf_limpo}")
        
        # Busca pelo CPF sem formatação
        cliente = Cliente.query.filter_by(cpf=cpf_limpo).first()
        
        if cliente:
            print(f"Cliente encontrado: {cliente.nome}")
            # Retornando dados encontrados
            return jsonify({
                'nome': cliente.nome,
                'rg': cliente.rg,
                'telefone': cliente.telefone,
                'nacionalidade': cliente.nacionalidade,
                'estado_civil': cliente.estado_civil,
                'profissao': cliente.profissao,
                'endereco': cliente.endereco,
                'numero': cliente.numero,
                'complemento': cliente.complemento,
                'bairro': cliente.bairro,
                'cidade': cliente.cidade,
                'uf': cliente.uf,
                'email': cliente.email
            })
        else:
            print(f"Cliente não encontrado para CPF: {cpf_limpo}")
            return jsonify({}), 404
            
    except Exception as e:
        print(f"Erro ao buscar cliente: {str(e)}")
        return jsonify({'erro': str(e)}), 500


@cadastro_bp.route('/preencher_cliente', methods=['GET', 'POST'])
def preencher_cliente():
    """Rota para preencher formulário com dados do cliente"""
    if request.method == 'POST':
        cpf = request.form['cpf']
        cliente = Cliente.query.filter_by(cpf=limpar_cpf(cpf)).first()

        if cliente:
            # Preenche os campos automaticamente com os dados do cliente
            return render_template('cadastro.html', cliente=cliente)
        else:
            # Se não encontrar o cliente, mostre uma mensagem
            return 'Cliente não encontrado!'
    
    return render_template('cadastro.html')