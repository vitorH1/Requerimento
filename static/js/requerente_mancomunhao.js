// JS exclusivo para averbação de mancomunhão
// Funções para buscar e cadastrar Requerente 1 e 2

// Função para buscar dados do requerente pelo CPF
async function buscarRequerenteMancomunhao(cpf, prefixo) {
    if (!cpf) return;
    try {
        const resp = await fetch(`/buscar_requerente/${cpf}`);
        if (!resp.ok) return;
        const data = await resp.json();
        if (data && data.nome) {
            document.getElementById(prefixo + 'nome').value = data.nome || '';
            document.getElementById(prefixo + 'rg').value = data.rg || '';
            document.getElementById(prefixo + 'telefone').value = data.telefone || '';
            document.getElementById(prefixo + 'nacionalidade').value = data.nacionalidade || '';
            document.getElementById(prefixo + 'estado_civil').value = data.estado_civil || '';
            document.getElementById(prefixo + 'profissao').value = data.profissao || '';
            document.getElementById(prefixo + 'endereco').value = data.endereco || '';
            document.getElementById(prefixo + 'numero').value = data.numero || '';
            document.getElementById(prefixo + 'complemento').value = data.complemento || '';
            document.getElementById(prefixo + 'bairro').value = data.bairro || '';
            document.getElementById(prefixo + 'cidade').value = data.cidade || '';
            document.getElementById(prefixo + 'uf').value = data.uf || '';
            document.getElementById(prefixo + 'email').value = data.email || '';
        }
    } catch (e) {
        // Não faz nada
    }
}

// Função para cadastrar/atualizar um requerente
async function cadastrarRequerenteMancomunhao(prefixo) {
    const dados = {
        nome: document.getElementById(prefixo + 'nome').value,
        rg: document.getElementById(prefixo + 'rg').value,
        cpf: document.getElementById(prefixo + 'cpf').value,
        telefone: document.getElementById(prefixo + 'telefone').value,
        nacionalidade: document.getElementById(prefixo + 'nacionalidade').value,
        estado_civil: document.getElementById(prefixo + 'estado_civil').value,
        profissao: document.getElementById(prefixo + 'profissao').value,
        endereco: document.getElementById(prefixo + 'endereco').value,
        numero: document.getElementById(prefixo + 'numero').value,
        complemento: document.getElementById(prefixo + 'complemento').value,
        bairro: document.getElementById(prefixo + 'bairro').value,
        cidade: document.getElementById(prefixo + 'cidade').value,
        uf: document.getElementById(prefixo + 'uf').value,
        email: document.getElementById(prefixo + 'email').value
    };
    // Verifica se já existe
    const resp = await fetch(`/buscar_requerente/${dados.cpf}`);
    if (resp.ok) {
        const existe = await resp.json();
        if (existe && existe.nome) {
            // Atualiza
            await fetch(`/atualizar_requerente/${dados.cpf}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            alert('Requerente atualizado!');
            return;
        }
    }
    // Cadastra novo
    await fetch('/cadastrar_requerente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    alert('Requerente cadastrado!');
}

// Eventos para buscar ao sair do campo CPF
['cpf', 'cpf2'].forEach(function (id) {
    const prefixo = id === 'cpf' ? '' : '2';
    document.addEventListener('DOMContentLoaded', function () {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('blur', function () {
                buscarRequerenteMancomunhao(el.value, prefixo);
            });
        }
    });
});

// Eventos para cadastrar ao clicar em botões (adicione botões no HTML se quiser)
// Exemplo: <button type="button" onclick="cadastrarRequerenteMancomunhao('')">Salvar Requerente 1</button>
// Exemplo: <button type="button" onclick="cadastrarRequerenteMancomunhao('2')">Salvar Requerente 2</button>
