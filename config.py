import os
import os
from dotenv import load_dotenv

# Carregar variáveis do arquivo .env
load_dotenv()

# Configuração do banco de dados usando variáveis de ambiente
SQLALCHEMY_DATABASE_URI = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
SQLALCHEMY_TRACK_MODIFICATIONS = False

# Caminho base para os templates de detalhes
TEMPLATES_DETALHES_PATH = "templates/requerimentos"  # Este é o caminho relativo correto

# Lista de requerimentos disponíveis
REQUERIMENTOS = [

                    #-------------------------REQUERIMENTOS AINDA NAO REVISADOS--------                    <script src="{% static 'js/cliente_autofill.js' %}"></script>-----------------#

     {"id": "exame_calculo", "nome": "Exame e Cálculo", "descricao": "Requerimento para exame e cálculo"},
     {"id": "pacto_antenupcial", "nome": "Registro de Escritura de Pacto Antenupcial / União Estável", "descricao": "Requerimento para registro de escritura de pacto antenupcial ou união estável"},
     {"id": "cancelamento_usufruto", "nome": "Averbação de Cancelamento de Usufruto por Óbito", "descricao": "Requerimento para cancelamento de usufruto por óbito"},   
     {"id": "alteracao_numero_iptu", "nome": "Alteração de Número de Contribuinte do IPTU", "descricao": "Requerimento para alteração de número de contribuinte do IPTU"},
     {"id": "inscricao_locacao", "nome": "Inscrição de Locação", "descricao": "Requerimento para inscrição de locação"},
    # {"id": "outros_modelo_generico", "nome": "Outros Pedidos – Modelo Genérico", "descricao": "Requerimento genérico para outros pedidos"},
     {"id": "cancelamento_clausula_resolutiva", "nome": "Cancelamento de Cláusula Resolutiva", "descricao": "Requerimento para cancelamento de cláusula resolutiva"},
     {"id": "alteracao_denom_rua", "nome": "Alteração de Denominação de Rua ou Logradouro Público", "descricao": "Requerimento para alteração de denominação de rua ou logradouro público"},
     {"id": "averbacao_demolicao", "nome": "Averbação de Demolição", "descricao": "Requerimento para averbação de demolição"},
     {"id": "averbacao_demolicao_construcao", "nome": "Averbação de Demolição e Nova Construção", "descricao": "Requerimento para averbação de demolição e nova construção"},
     {"id": "pedido_providencias", "nome": "Pedido de Providências", "descricao": "Requerimento de pedido de providências"}, 
    
    {"id": "averbacao_casamento", "nome": "Averbação de Casamento", "descricao": "Requerimento para averbação de casamento"},
    {"id": "averbacao_separacao_judicial", "nome": "Averbação de Separação Judicial", "descricao": "Requerimento para averbação de separação judicial"},
    {"id": "averbacao_divorcio", "nome": "Averbação de Divórcio", "descricao": "Requerimento para averbação de divórcio"},
    {"id": "averbacao_obito", "nome": "Averbação de Óbito", "descricao": "Requerimento para averbação de óbito"},
    {"id": "cancelamento_clausulas_restritivas", "nome": "Cancelamento de Cláusulas Restritivas", "descricao": "Requerimento para cancelamento de cláusulas restritivas"},
    {"id": "alteracao_numero_casa_comercio", "nome": "Alteração do Número da Casa/Comercio", "descricao": "Requerimento para alteração do número da casa ou comércio"},
    {"id": "averbacao_construcao", "nome": "Averbação de Construção", "descricao": "Requerimento para averbação de construção"},
    {"id": "averbacao_acrescimo_construcao", "nome": "Averbação de Acréscimo de Área Construída", "descricao": "Requerimento para averbação de acréscimo de área construída"},
    {"id": "cancelamento_hipoteca", "nome": "Cancelamento de Hipoteca / Alienação Fiduciária", "descricao": "Requerimento para cancelamento de hipoteca ou alienação fiduciária"},
    {"id": "averbacao_fusao", "nome": "Averbação de Fusão", "descricao": "Requerimento para averbação de fusão de imóveis"}
    # {"id": "averbacao_mancomunhao", "nome": "Averbação de Mancomunhão", "descricao": "Requerimento para averbação de Mancomunhão"}
]

# {"id": "primeira_aquisicao_sfh", "nome": "Primeira Aquisição do Imóvel Residencial – SFH", "descricao": "Requerimento para primeira aquisição do imóvel residencial pelo SFH"}, #
########## {"id": "suscitacao", "nome": "Suscitação", "descricao": "Requerimento de suscitação"},


