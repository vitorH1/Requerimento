// JS base para todos os formulários de requerimentos
console.log("🚀 requerimentos_form.js carregado!");

document.addEventListener('DOMContentLoaded', function () {
    console.log("📋 DOMContentLoaded executado em requerimentos_form.js");
    // Exibe a data formatada na cidade
    const cidade = "Monte Carmelo";
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const dataFormatada = cidade + " - " + dia + "/" + mes + "/" + ano;
    const cidadeData = document.getElementById('cidade-data');
    if (cidadeData) cidadeData.textContent = dataFormatada;

    // Busca automática de cliente pelo CPF
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('blur', function () {
            const cpf = this.value.replace(/\D/g, '');
            if (!cpf || cpf.length < 11) return; // Ignora CPFs incompletos

            const form = document.getElementById('form-cadastro');
            if (form) form.classList.add('loading');

            fetch(`/buscar_cliente/${cpf}`)
                .then(response => {
                    if (response.status === 404) {
                        if (form) form.classList.remove('loading');
                        return null;
                    }
                    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
                    return response.json();
                })
                .then(data => {
                    if (form) form.classList.remove('loading');
                    if (data) {
                        document.getElementById('nome').value = data.nome || '';
                        document.getElementById('rg').value = data.rg || '';
                        document.getElementById('telefone').value = data.telefone || '';
                        document.getElementById('nacionalidade').value = data.nacionalidade || '';
                        document.getElementById('estado_civil').value = data.estado_civil || '';
                        document.getElementById('profissao').value = data.profissao || '';
                        document.getElementById('endereco').value = data.endereco || '';
                        document.getElementById('numero').value = data.numero || '';
                        document.getElementById('complemento').value = data.complemento || '';
                        document.getElementById('bairro').value = data.bairro || '';
                        document.getElementById('cidade').value = data.cidade || '';
                        document.getElementById('uf').value = data.uf || '';
                        document.getElementById('email').value = data.email || '';
                    }
                })
                .catch(error => {
                    if (form) form.classList.remove('loading');
                    // Opcional: console.error('Erro ao buscar cliente:', error);
                });
        });
    }

    // Garante que a modal de sucesso sempre comece oculta ao carregar a página
});

// Atualiza assinatura em tempo real com nome e CPF (global)
document.addEventListener('DOMContentLoaded', function () {
    function atualizarAssinaturaGlobal() {
        var nome = document.getElementById('nome');
        var cpf = document.getElementById('cpf');
        var assinatura = document.getElementById('assinatura-preenchida');
        if (nome && cpf && assinatura) {
            assinatura.textContent = nome.value && cpf.value ? nome.value + ' - CPF: ' + cpf.value : '';
        }
    }
    var nomeInput = document.getElementById('nome');
    var cpfInput = document.getElementById('cpf');
    if (nomeInput && cpfInput) {
        nomeInput.addEventListener('input', atualizarAssinaturaGlobal);
        cpfInput.addEventListener('input', atualizarAssinaturaGlobal);
        nomeInput.addEventListener('change', atualizarAssinaturaGlobal);
        cpfInput.addEventListener('change', atualizarAssinaturaGlobal);
        nomeInput.addEventListener('paste', function () { setTimeout(atualizarAssinaturaGlobal, 10); });
        cpfInput.addEventListener('paste', function () { setTimeout(atualizarAssinaturaGlobal, 10); });
        atualizarAssinaturaGlobal();
    }
    var form = document.getElementById('form-cadastro');
    if (form) {
        form.addEventListener('change', atualizarAssinaturaGlobal);
        form.addEventListener('input', atualizarAssinaturaGlobal);
    }
    // Força atualização após preenchimento automático (ex: autocomplete do navegador)
    setTimeout(atualizarAssinaturaGlobal, 300);
    setTimeout(atualizarAssinaturaGlobal, 1000);
    // Observa mudanças no value dos campos nome e cpf (útil para preenchimento automático)
    if (window.MutationObserver) {
        var observer = new MutationObserver(atualizarAssinaturaGlobal);
        if (nomeInput) observer.observe(nomeInput, { attributes: true, childList: true, subtree: true, characterData: true });
        if (cpfInput) observer.observe(cpfInput, { attributes: true, childList: true, subtree: true, characterData: true });
    }
    // Atualiza assinatura a cada 500ms por 3 segundos após o carregamento (garante para qualquer tipo de auto-preenchimento)
    for (let i = 1; i <= 6; i++) {
        setTimeout(atualizarAssinaturaGlobal, i * 500);
    }
});

// Fallback: força atualização da assinatura após o carregamento completo da página
window.addEventListener('load', function () {
    var nome = document.getElementById('nome');
    var cpf = document.getElementById('cpf');
    var assinatura = document.getElementById('assinatura-preenchida');
    if (nome && cpf && assinatura) {
        assinatura.textContent = nome.value && cpf.value ? nome.value + ' - CPF: ' + cpf.value : '';
    }
    // Atualiza novamente após 1s para garantir preenchimento automático
    setTimeout(function () {
        if (nome && cpf && assinatura) {
            assinatura.textContent = nome.value && cpf.value ? nome.value + ' - CPF: ' + cpf.value : '';
        }
    }, 1000);
});

// Envio do formulário com feedback de sucesso/erro
const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const jsonData = {};
        formData.forEach((value, key) => { jsonData[key] = value; });
        fetch('/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    mostrarModal(data.erro === 'cpf_duplicado' ? 'CPF já cadastrado.' : `Erro: ${data.erro}`);
                } else {
                    mostrarModal(data.mensagem || 'Cadastro salvo com sucesso!');
                }
            })
            .catch(() => {
                mostrarModal('Erro ao salvar os dados. Tente novamente.');
            });
    });
}

// Função para exibir modal centralizada
function mostrarModal(mensagem) {
    const modalElement = document.getElementById('modalSucesso');
    const mensagemElement = document.getElementById('mensagemModal');
    if (mensagemElement) mensagemElement.textContent = mensagem;
    if (modalElement) modalElement.classList.add('active');
}

// Função para fechar modal
function fecharModal() {
    const modalElement = document.getElementById('modalSucesso');
    if (modalElement) modalElement.classList.remove('active');
}

// Função de impressão centralizada
async function printRequerimento() {
    console.log('🖨️ printRequerimento: Função chamada no porto:', window.location.port);
    console.log('🖨️ printRequerimento: Verificando typeof uploadPDF:', typeof uploadPDF);
    console.log('🖨️ printRequerimento: Verificando typeof window.uploadPDF:', typeof window.uploadPDF);

    // Primeiro fazer upload do PDF antes de imprimir
    if (typeof uploadPDF === 'function') {
        console.log('🖨️ printRequerimento: Executando uploadPDF...');
        try {
            await uploadPDF(false); // false = mostra modal de sucesso/erro
            console.log('🖨️ printRequerimento: uploadPDF executado com sucesso');
        } catch (e) {
            console.error('🖨️ printRequerimento: Erro ao executar uploadPDF:', e);
            mostrarModal('Erro ao enviar PDF. Impressão cancelada.');
            return;
        }
    } else if (window.uploadPDF) {
        console.log('🖨️ printRequerimento: Executando window.uploadPDF... no porto:', window.location.port);
        try {
            await window.uploadPDF(false);
            console.log('🖨️ printRequerimento: window.uploadPDF executado com sucesso');
        } catch (e) {
            console.error('🖨️ printRequerimento: Erro ao executar window.uploadPDF:', e);
            mostrarModal('Erro ao enviar PDF. Impressão cancelada.');
            return;
        }
    } else {
        console.error("🖨️ printRequerimento: Função uploadPDF não encontrada! Porto:", window.location.port);
        mostrarModal('Função de upload PDF não encontrada.');
        return;
    }

    console.log('🖨️ printRequerimento: Procedendo com impressão... Porto:', window.location.port);
    const printButton = document.querySelector('.no-print');
    const headerBar = document.querySelector('.header-bar');
    const originalPrintDisplay = printButton ? printButton.style.display : '';
    const originalHeaderDisplay = headerBar ? headerBar.style.display : '';
    if (printButton) printButton.style.display = 'none';
    if (headerBar) headerBar.style.display = 'none';
    const style = document.createElement('style');
    style.innerHTML = `
        @media print {
            @page { size: A4; margin: 1cm; }
        }
    `;
    document.head.appendChild(style);
    setTimeout(() => {
        console.log('🖨️ printRequerimento: Executando window.print(). Porto:', window.location.port);
        window.print();
        document.head.removeChild(style);
        if (printButton) printButton.style.display = originalPrintDisplay;
        if (headerBar) headerBar.style.display = originalHeaderDisplay;
        console.log('🖨️ printRequerimento: Impressão concluída. Porto:', window.location.port);
    }, 100);
}
window.printRequerimento = printRequerimento;
console.log("🖨️ window.printRequerimento definido no Porto:", window.location.port, typeof window.printRequerimento);
