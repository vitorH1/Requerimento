from marcacao import db

class Cliente(db.Model):
    """
    Modelo para representar um cliente no sistema
    """
    __tablename__ = 'clientes'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    rg = db.Column(db.String(20))
    cpf = db.Column(db.String(14), unique=True, nullable=False)
    telefone = db.Column(db.String(20))
    nacionalidade = db.Column(db.String(50))
    estado_civil = db.Column(db.String(50))
    profissao = db.Column(db.String(100))
    endereco = db.Column(db.String(200))
    numero = db.Column(db.String(10))
    complemento = db.Column(db.String(50))
    bairro = db.Column(db.String(100))
    cidade = db.Column(db.String(100))
    uf = db.Column(db.String(2))
    email = db.Column(db.String(100))
    
    def __repr__(self):
        return f'<Cliente {self.nome}>'
        
    def to_dict(self):
        """Converte o objeto Cliente para um dicionário"""
        return {
            'id': self.id,
            'nome': self.nome,
            'rg': self.rg,
            'cpf': self.cpf,
            'telefone': self.telefone,
            'nacionalidade': self.nacionalidade,
            'estado_civil': self.estado_civil,
            'profissao': self.profissao,
            'endereco': self.endereco,
            'numero': self.numero,
            'complemento': self.complemento,
            'bairro': self.bairro,
            'cidade': self.cidade,
            'uf': self.uf,
            'email': self.email
        }