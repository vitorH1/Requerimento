document.addEventListener("DOMContentLoaded", () => {
    const camposMaiusculos = ['nome', 'nacionalidade', 'estado_civil', 'complemento','profissao','endereco' , 'bairro', 'cidade'];
    
    camposMaiusculos.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.addEventListener('input', () => {
                campo.value = campo.value.toUpperCase();
            });
        }  
    });

    const cpf = document.getElementById('cpf');
if (cpf) {
    let alertandoCPF = false;

    cpf.addEventListener('blur', () => {
        const valor = cpf.value.trim();
        
        // Só valida se o campo não estiver completamente vazio
        if (valor.length > 0 && !validarCPF(valor) && !alertandoCPF) {
            alertandoCPF = true;
            alert('CPF inválido');
            setTimeout(() => {
                cpf.focus();
                alertandoCPF = false;
            }, 100);
        }
    });

    cpf.addEventListener('input', formatarCPF);
}




function formatarRG(e) {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 9) valor = valor.slice(0, 9);

    valor = valor.replace(/^(\d{2})(\d{3})(\d{0,3})(\d?)$/, (_, p1, p2, p3, p4) => {
        let result = `${p1}.${p2}`;
        if (p3) result += `.${p3}`;
        if (p4) result += `-${p4}`;
        return result;
    });

    e.target.value = valor;
}

function validarRG(rg) {
    return rg.length >= 7 && rg.length <= 9;
}


const telefone = document.getElementById('telefone');
if (telefone) {
    telefone.addEventListener('input', () => {
        let tel = telefone.value.replace(/\D/g, '');
        if (tel.length > 11) tel = tel.slice(0, 11);

        if (tel.length <= 10) {
            // Formato: (XX) XXXX-XXXX
            telefone.value = tel.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})$/, (match, p1, p2, p3) => {
                return `${p1 ? '(' + p1 : ''}${p1 && p2 ? ') ' + p2 : p2}${p2 && p3 ? '-' + p3 : ''}`;
            });
        } else {
            // Formato: (XX) XXXXX-XXXX
            telefone.value = tel.replace(/^(\d{0,2})(\d{0,5})(\d{0,4})$/, (match, p1, p2, p3) => {
                return `${p1 ? '(' + p1 : ''}${p1 && p2 ? ') ' + p2 : p2}${p2 && p3 ? '-' + p3 : ''}`;
            });
        }
    });
}

    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
        for (let i = 9; i < 11; i++) {
            let sum = 0;
            for (let j = 0; j < i; j++) {
                sum += parseInt(cpf[j]) * (i + 1 - j);
            }
            let check = (sum * 10) % 11;
            if (check === 10) check = 0;
            if (check !== parseInt(cpf[i])) return false;
        }
        return true;
    }

    function validarRG(rg) {
        rg = rg.replace(/\D/g, '');
        return rg.length >= 7 && rg.length <= 9;
    }

    function formatarCPF(e) {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length > 11) valor = valor.slice(0, 11);
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = valor;
    }
});
