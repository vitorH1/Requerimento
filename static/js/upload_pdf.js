const { jsPDF } = window.jspdf;
console.log("📤 upload_pdf.js carregado!");

document.getElementById('btn-gerar-upload-pdf').onclick = async function () {
    // 1. Coletar dados do formulário
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    if (!cpf) {
        mostrarModal('Preencha o CPF.');
        return;
    }

    // 2. Gerar nome do arquivo
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();
    const hora = String(agora.getHours()).padStart(2, '0');
    const minuto = String(agora.getMinutes()).padStart(2, '0');
    const nome_pdf = `${dia}-${mes}-${ano}-${hora}-${minuto}-${cpf}.pdf`;

    // 3. Gerar PDF do formulário (exemplo simples com jsPDF)
    const doc = new jsPDF();
    doc.text("REQUERIMENTO – AVERBAÇÃO DE DEMOLIÇÃO", 10, 10);
    // Adicione aqui os campos do formulário no PDF, um por um
    // Exemplo:
    doc.text("Nome: " + document.getElementById('nome').value, 10, 20);
    // ... repita para os outros campos

    // 4. Gerar o arquivo PDF como Blob
    const pdfBlob = doc.output('blob');

    // 5. Enviar para o backend
    const formData = new FormData();
    formData.append('pdf', pdfBlob, nome_pdf); // nome termina com .pdf
    formData.append('cpf', cpf);

    fetch('/upload_pdf/', {
        method: 'POST',
        body: formData
    })
        .then(r => r.json())
        .then(data => {
            if (data.erro) {
                mostrarModal(`Erro: ${data.erro}`);
            } else {
                mostrarModal(data.mensagem || 'PDF gerado e enviado com sucesso!');
            }
        })
        .catch(() => {
            mostrarModal('Erro ao enviar o PDF.');
        });
};

function gerarPDFBlob(callback) {
    const container = document.querySelector('.container');
    if (!container) return;

    // Clona o conteúdo da .container
    const clone = container.cloneNode(true);
    clone.style.background = 'white';
    clone.style.boxShadow = 'none';
    clone.style.maxWidth = '100%';
    clone.style.padding = '20px';
    clone.style.margin = '0';

    // Adiciona as regras principais do @media print + ajustes sugeridos
    const printStyle = document.createElement('style');
    printStyle.innerHTML = `
        html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
        .header-bar, .no-print, .footer, footer, .sistema-footer, .dashboard-footer, .main-footer, .navbar, .sidebar, .sidebar-menu, .dashboard-nav, .dashboard-header, .sistema-header, .sistema-sidebar, .sistema-content, .mensagens, .btn-requerimentos, .breadcrumb, .breadcrumbs, .menu, .menu-lateral, .menu-superior, .user-info, .user-menu, .logo, .logo-area, header, nav, aside, button, .btn, .action-buttons { display: none !important; }
        .container, .form-wrapper { max-width: 100% !important; padding: 20px !important; overflow: visible !important; background: white !important; box-shadow: none !important; border: none !important; }
        .form-control, input.form-control, textarea.form-control, select.form-control { border: none !important; border-bottom: 1.5px solid #000 !important; border-radius: 0 !important; background: white !important; box-shadow: none !important; color: #000 !important; padding-left: 0 !important; padding-right: 0 !important; }
        .form-footer { display: block !important; position: relative !important; margin-top: 1.5cm !important; page-break-inside: avoid !important; background: none !important; box-shadow: none !important; height: auto !important; min-height: 2.5cm !important; visibility: visible !important; }
        .signature-line { width: 60% !important; min-width: 200px !important; max-width: 340px !important; margin: 1.2cm auto 0 !important; text-align: center !important; position: relative !important; min-height: 1.1cm !important; }
        .signature-line hr { border: none !important; border-top: 2px solid #000 !important; height: 1px !important; margin: 0 !important; background: none !important; display: block !important; }
        .signature-label { font-size: 12px !important; color: #111 !important; position: static !important; display: block !important; margin: 2px 0 0 0 !important; padding: 0 !important; line-height: 1 !important; text-align: center !important; background: none !important; transform: none !important; }
        .form-row, .row { flex-wrap: wrap !important; min-width: 0 !important; }
        input.form-control, select.form-control, textarea.form-control { min-width: 0 !important; max-width: 100% !important; }
        body, .container, .form-wrapper, .form-header, .form-header h2, .form-header h3, label, .form-content, .form-group, .form-row, .vem-requerer, .option-group, .option, .info-group, .hint, .form-footer, .signature-label, .observations, .observations p, .observations ol, .observations li, .form-control, input.form-control, textarea.form-control, select.form-control, p, span, div, td, th { color: #111 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        /* AJUSTES SUGERIDOS PELO USUÁRIO */
        .vem-requerer { margin: 2px 0 2px 0 !important; gap: 4px !important; padding: 0 !important; }
        .vem-requerer p { margin: 0 !important; font-size: 13px !important; white-space: nowrap !important; padding: 0 !important; }
        .vem-requerer .form-control { margin: 0 !important; padding: 2px 4px !important; font-size: 13px !important; height: 22px !important; min-width: 80px !important; max-width: 1000px !important; }
        .option-group { margin-bottom: 10px !important; }
        .option { display: flex !important; align-items: center !important; gap: 4px !important; margin-bottom: 2px !important; padding: 0 !important; }
        .option input[type="checkbox"] { margin: 0 4px 0 0 !important; align-self: center !important; vertical-align: middle !important; position: relative !important; top: 0 !important; width: 15px !important; height: 15px !important; }
        .option label { margin: 0 !important; padding: 0 !important; font-size: 13px !important; line-height: 1.2 !important; vertical-align: middle !important; }
        .observations { margin-top: -65px !important; padding-top: 0 !important; border-top: none !important; page-break-before: avoid !important; }
        /* Força o conteúdo a não quebrar página e remove page-breaks extras */
        .container, .form-wrapper, form, body, html { page-break-before: avoid !important; page-break-after: avoid !important; page-break-inside: avoid !important; }
    `;
    clone.insertBefore(printStyle, clone.firstChild);

    // Corrige valores dos campos de formulário no clone
    clone.querySelectorAll('input, textarea, select').forEach(function (el) {
        if (el.type === 'checkbox' || el.type === 'radio') {
            if (el.checked) el.setAttribute('checked', 'checked');
            else el.removeAttribute('checked');
        } else if (el.tagName === 'SELECT') {
            Array.from(el.options).forEach(opt => opt.removeAttribute('selected'));
            if (el.selectedIndex >= 0) el.options[el.selectedIndex].setAttribute('selected', 'selected');
        } else {
            el.setAttribute('value', el.value);
        }
    });

    // Cria um container temporário fora da tela para renderizar o clone
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'fixed';
    tempDiv.style.left = '-9999px';
    tempDiv.appendChild(clone);
    document.body.appendChild(tempDiv);

    html2pdf()
        .set({
            margin: 0,
            filename: 'requerimento.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1, useCORS: true, backgroundColor: null },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all'] } // Remove 'css' e 'legacy' para evitar páginas extras
        })
        .from(clone)
        .outputPdf('blob')
        .then(blob => {
            document.body.removeChild(tempDiv);
            if (callback) callback(blob);
        })
        .catch(() => {
            document.body.removeChild(tempDiv);
            mostrarModal('Erro ao gerar PDF.');
        });
}

function uploadPDF(silencioso = false) {
    return new Promise((resolve, reject) => {
        const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
        if (!cpf || cpf.length !== 11) {
            if (!silencioso) mostrarModal('Preencha corretamente o CPF (11 dígitos) e cadastre antes de enviar o PDF.');
            console.error('UploadPDF: CPF inválido ou não preenchido.');
            reject('CPF inválido');
            return;
        }
        // Verifica se o cliente já está cadastrado antes de enviar o PDF
        fetch(`/buscar_cliente/${cpf}`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    if (!silencioso) mostrarModal('Cadastre o cliente antes de enviar o PDF.');
                    console.error('UploadPDF: Cliente não cadastrado.', data);
                    reject('Cliente não cadastrado');
                    return;
                }
                gerarPDFBlob(function (blob) {
                    var formData = new FormData();
                    formData.append('pdf', blob, 'requerimento.pdf');
                    formData.append('cpf', cpf);
                    fetch('/upload_pdf/', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'X-CSRFToken': (document.querySelector('[name=csrfmiddlewaretoken]') || {}).value || ''
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.mensagem) {
                                if (!silencioso) mostrarModal(data.mensagem);
                                console.log('UploadPDF: Sucesso!', data);
                                resolve();
                            } else if (data.erro) {
                                if (!silencioso) mostrarModal('Erro: ' + data.erro);
                                console.error('UploadPDF: Erro do backend.', data);
                                reject(data.erro);
                            } else {
                                if (!silencioso) mostrarModal('Erro ao enviar PDF.');
                                console.error('UploadPDF: Erro desconhecido.', data);
                                reject('Erro ao enviar PDF');
                            }
                        })
                        .catch((err) => {
                            if (!silencioso) mostrarModal('Erro ao enviar PDF.');
                            console.error('UploadPDF: Erro na requisição fetch upload_pdf.', err);
                            reject('Erro ao enviar PDF');
                        });
                });
            })
            .catch((err) => {
                if (!silencioso) mostrarModal('Erro ao verificar cadastro do cliente.');
                console.error('UploadPDF: Erro ao buscar cliente.', err);
                reject('Erro ao verificar cadastro do cliente');
            });
    });
}

// Torna uploadPDF global para garantir acesso via window.uploadPDF
window.uploadPDF = uploadPDF;
console.log("🌐 window.uploadPDF definido no Porto:", window.location.port, typeof window.uploadPDF);

// Verificação adicional
setTimeout(() => {
    console.log("🌐 upload_pdf.js: Verificação após 1s - window.uploadPDF no Porto:", window.location.port, typeof window.uploadPDF);
}, 1000);

document.addEventListener('DOMContentLoaded', function () {
    console.log("🌐 upload_pdf.js: DOMContentLoaded. Porto:", window.location.port);
    const btn = document.getElementById('btn-gerar-upload-pdf');
    if (btn) {
        btn.onclick = uploadPDF;
    }
});