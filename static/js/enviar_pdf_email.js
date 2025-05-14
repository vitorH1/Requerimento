// Este script lida com a funcionalidade de envio de PDF por e-mail
// Utiliza a biblioteca html2pdf para converter o conteúdo HTML em um arquivo PDF
document.getElementById('btn-enviar-email').onclick = function() {
    const formWrapper = document.querySelector('.form-wrapper');
    formWrapper.classList.add('pdf-clean');
    document.querySelectorAll('.no-print, .nao-imprimir').forEach(el => el.classList.add('hide-on-pdf'));

    const element = document.querySelector('.form-wrapper');
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const email = document.getElementById('email').value;
    if (!cpf) {
        mostrarModal('Preencha o CPF antes de enviar o PDF por email.');
        document.querySelectorAll('.no-print, .nao-imprimir').forEach(el => el.classList.remove('hide-on-pdf'));
        formWrapper.classList.remove('pdf-clean');
        return;
    }
    if (!email) {
        mostrarModal('Preencha o email antes de enviar o PDF.');
        document.querySelectorAll('.no-print, .nao-imprimir').forEach(el => el.classList.remove('hide-on-pdf'));
        formWrapper.classList.remove('pdf-clean');
        return;
    }
    const nome_pdf = `requerimento-alteracao-denom-rua-${cpf}.pdf`;
    const opt = {
        margin: 0.2,
        filename: nome_pdf,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, scrollY: 0 },
        jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    html2pdf().set(opt).from(element).outputPdf('blob').then(function(pdfBlob) {
        const formData = new FormData();
        formData.append('pdf', pdfBlob, nome_pdf);
        formData.append('cpf', cpf);
        formData.append('email', email);
        fetch('/enviar_pdf_email/', {
            method: 'POST',
            body: formData
        })
        .then(r => r.json())
        .then(data => {
            if (data.erro) {
                mostrarModal('Erro: ' + data.erro);
            } else {
                mostrarModal(data.mensagem || 'PDF enviado por email com sucesso!');
            }
        })
        .catch(() => {
            mostrarModal('Erro ao enviar o PDF por email.');
        });
    }).finally(() => {
        formWrapper.classList.remove('pdf-clean');
        document.querySelectorAll('.no-print, .nao-imprimir').forEach(el => el.classList.remove('hide-on-pdf'));
    });
}