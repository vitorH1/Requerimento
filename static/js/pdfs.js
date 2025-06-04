// JavaScript para a página de consulta de PDFs

document.addEventListener('DOMContentLoaded', function () {
    // Elementos do DOM
    const pdfGrid = document.getElementById('pdf-grid');
    const pdfCards = document.querySelectorAll('.pdf-card');
    const searchInput = document.getElementById('pdf-search');
    const sortSelect = document.getElementById('sort-select');
    const pdfCountNumber = document.getElementById('pdf-count-number');
    const noResults = document.querySelector('.no-results');
    const clearFilterBtn = document.getElementById('clear-filter');

    // Elementos do modal
    const previewModal = document.getElementById('previewModal');
    const previewFileName = document.getElementById('previewFileName');
    const pdfPreviewFrame = document.getElementById('pdfPreviewFrame');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const openInNewTabBtn = document.getElementById('openInNewTabBtn');
    const closeModalBtn = document.querySelector('.close-modal');

    // Função para truncar nomes de arquivo longos
    const filenameTruncate = () => {
        const pdfTitles = document.querySelectorAll('.pdf-title');
        pdfTitles.forEach(title => {
            if (title.textContent.length > 25) {
                const fullText = title.textContent;
                // Armazena o texto original como um atributo data
                title.setAttribute('data-full-title', fullText);
                // Trunca o texto
                title.textContent = fullText.substring(0, 22) + '...';

                // Adiciona tooltip ao passar o mouse
                title.addEventListener('mouseenter', function () {
                    title.textContent = fullText;
                });
                title.addEventListener('mouseleave', function () {
                    title.textContent = fullText.substring(0, 22) + '...';
                });
            }
        });
    };

    // Adiciona efeitos visuais aos cards
    const setupCardInteractions = () => {
        const cards = document.querySelectorAll('.pdf-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.classList.add('hover');
            });
            card.addEventListener('mouseleave', function () {
                this.classList.remove('hover');
            });
        });
    };

    // Função de filtro
    const filterPDFs = () => {
        const searchTerm = searchInput.value.toLowerCase();
        let visibleCount = 0;

        // Aplicar filtro e contagem
        pdfCards.forEach(card => {
            const fileName = card.getAttribute('data-name').toLowerCase();
            const matches = fileName.includes(searchTerm);

            if (matches) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Atualizar contador e mensagem de "nenhum resultado"
        pdfCountNumber.textContent = visibleCount;

        if (visibleCount === 0) {
            noResults.style.display = 'flex';
        } else {
            noResults.style.display = 'none';
        }
    };

    // Função de ordenação
    const sortPDFs = () => {
        const sortValue = sortSelect.value;
        const cards = Array.from(pdfCards);

        cards.sort((a, b) => {
            if (sortValue === 'name-asc') {
                return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
            }
            else if (sortValue === 'name-desc') {
                return b.getAttribute('data-name').localeCompare(a.getAttribute('data-name'));
            }
            else if (sortValue === 'date-asc') {
                return a.getAttribute('data-timestamp') - b.getAttribute('data-timestamp');
            }
            else { // date-desc (padrão)
                return b.getAttribute('data-timestamp') - a.getAttribute('data-timestamp');
            }
        });

        // Reordenar os cards no DOM
        cards.forEach(card => {
            pdfGrid.appendChild(card);
        });
    };

    // Limpar filtro
    const clearFilter = () => {
        searchInput.value = '';
        filterPDFs();
        searchInput.focus();
    };
    // Funções para o modal de pré-visualização
    const openPreviewModal = (pdfUrl, fileName) => {
        // Configurar o modal
        previewFileName.textContent = fileName;
        pdfPreviewFrame.src = pdfUrl;
        downloadPdfBtn.href = pdfUrl;
        openInNewTabBtn.href = pdfUrl;

        // Mostrar o modal
        previewModal.classList.add('active');

        // Desabilitar o scroll do body
        document.body.style.overflow = 'hidden';
    };

    const closePreviewModal = () => {
        previewModal.classList.remove('active');

        // Limpar o iframe para evitar problemas de memória
        setTimeout(() => {
            pdfPreviewFrame.src = '';
        }, 300);

        // Reativar o scroll do body
        document.body.style.overflow = '';
    };

    // Configurar os cards para abrirem o modal ao clicar
    const setupCardPreviews = () => {
        pdfCards.forEach(card => {
            card.addEventListener('click', function (e) {
                // Não abrir o modal se clicou em um botão ou link
                if (e.target.closest('.pdf-actions')) {
                    return;
                }

                const pdfUrl = this.getAttribute('data-pdf-url');
                const fileName = this.getAttribute('data-name');
                openPreviewModal(pdfUrl, fileName);
            });
        });
    };

    // Event Listeners
    searchInput.addEventListener('input', filterPDFs);
    sortSelect.addEventListener('change', sortPDFs);
    clearFilterBtn.addEventListener('click', clearFilter);

    // Event listeners do modal
    closeModalBtn.addEventListener('click', closePreviewModal);
    previewModal.addEventListener('click', function (e) {
        if (e.target === this) {
            closePreviewModal();
        }
    });

    // Fechar modal com a tecla ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && previewModal.classList.contains('active')) {
            closePreviewModal();
        }
    });

    // Inicialização
    filenameTruncate();
    setupCardInteractions();
    setupCardPreviews();
    sortPDFs(); // Aplicar ordenação inicial
});
