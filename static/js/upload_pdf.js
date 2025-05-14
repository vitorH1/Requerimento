const { jsPDF } = window.jspdf;

document.getElementById('btn-gerar-upload-pdf').onclick = async function() {
    // 1. Coletar dados do formulário
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    if (!cpf) {
        alert('Preencha o CPF.');
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
    formData.append('pdf', pdfBlob, nome_pdf);
    formData.append('nome_pdf', nome_pdf);
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
        alert('Erro ao enviar o PDF.');
    });
};