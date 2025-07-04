// Controle do botão Cadastrar conforme CPF e alterações nos campos

document.addEventListener('DOMContentLoaded', function () {
    const cpfInput = document.getElementById('cpf');
    const form = document.getElementById('form-cadastro');
    const btnCadastrar = document.querySelector('button[type="submit"]');
    let dadosOriginais = null;
    let cpfExiste = false;

    function desabilitarBotao() {
        if (btnCadastrar) btnCadastrar.disabled = true;
    }
    function habilitarBotao() {
        if (btnCadastrar) btnCadastrar.disabled = false;
    }

    function compararCampos() {
        if (!dadosOriginais) return false;
        let alterado = false;
        for (const campo in dadosOriginais) {
            const input = document.getElementsByName(campo)[0];
            if (input && input.value !== dadosOriginais[campo]) {
                alterado = true;
                break;
            }
        }
        return alterado;
    }

    if (cpfInput && form && btnCadastrar) {
        // Ao sair do campo CPF, busca cliente
        cpfInput.addEventListener('blur', function () {
            const cpf = cpfInput.value.replace(/\D/g, '');
            if (!cpf || cpf.length < 11) {
                dadosOriginais = null;
                cpfExiste = false;
                habilitarBotao();
                return;
            }
            fetch(`/buscar_cliente/${cpf}`)
                .then(response => {
                    if (response.status === 404) {
                        dadosOriginais = null;
                        cpfExiste = false;
                        habilitarBotao();
                        return null;
                    }
                    if (!response.ok) throw new Error('Erro ao buscar cliente');
                    return response.json();
                })
                .then(data => {
                    if (data) {
                        dadosOriginais = {
                            nome: data.nome || '',
                            rg: data.rg || '',
                            cpf: cpfInput.value,
                            telefone: data.telefone || '',
                            nacionalidade: data.nacionalidade || '',
                            estado_civil: data.estado_civil || '',
                            profissao: data.profissao || '',
                            endereco: data.endereco || '',
                            numero: data.numero || '',
                            complemento: data.complemento || '',
                            bairro: data.bairro || '',
                            cidade: data.cidade || '',
                            uf: data.uf || '',
                            email: data.email || ''
                        };
                        cpfExiste = true;
                        desabilitarBotao();
                    } else {
                        dadosOriginais = null;
                        cpfExiste = false;
                        habilitarBotao();
                    }
                })
                .catch(() => {
                    dadosOriginais = null;
                    cpfExiste = false;
                    habilitarBotao();
                });
        });

        // Ao alterar qualquer campo, verifica se pode habilitar
        form.addEventListener('input', function (e) {
            if (cpfExiste && dadosOriginais) {
                if (compararCampos()) {
                    habilitarBotao();
                } else {
                    desabilitarBotao();
                }
            }
        });
    }
});
