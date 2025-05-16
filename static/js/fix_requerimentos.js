// Arquivo para corrigir problemas de exibição dos requerimentos
console.log("Debug: Carregando script de correção de requerimentos...");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM carregado. Iniciando aplicação de estilos de correção...");
    
    // Detector de erros JavaScript
    window.addEventListener('error', function(event) {
        console.error('Erro JavaScript detectado:', event.error);
        
        // Adicionar mensagem visível na página
        const errorDiv = document.createElement('div');
        errorDiv.style.background = '#fee2e2';
        errorDiv.style.color = '#b91c1c';
        errorDiv.style.padding = '10px';
        errorDiv.style.margin = '10px 0';
        errorDiv.style.borderRadius = '4px';
        errorDiv.style.border = '1px solid #f87171';
        errorDiv.innerHTML = '<strong>Erro JavaScript:</strong> ' + 
                                event.error.message + '<br><small>Em: ' + event.filename + ' (linha ' + event.lineno + ')</small>';
        
        document.body.insertBefore(errorDiv, document.body.firstChild);
    });
    
    // Force apply critical styles that might not be loading correctly
    function aplicarEstilosCorrecao() {
        console.log("Aplicando estilos de correção aos elementos...");
        
        // Verificar e estilizar o grid
        const grid = document.querySelector('.requerimentos-grid');
        if (grid) {
            console.log("Grid encontrado, aplicando estilos forçados...");
            grid.setAttribute('style', 'display: grid !important; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important; gap: 1.5rem !important;');
        } else {
            console.warn("ATENÇÃO: Grid de requerimentos não encontrado no DOM!");
        }
        
        // Verificar e estilizar os cards
        const cards = document.querySelectorAll('.requerimento-card');
        console.log(`Encontrados ${cards.length} cards para estilizar`);
        
        if (cards.length === 0) {
            console.warn("ATENÇÃO: Nenhum card de requerimento encontrado!");
            
            // Verificar se há dados de requerimentos disponíveis
            const diagnosticoPanel = document.querySelector('.requerimentos-lista div[style*="background: #f0f4ff"]');
            if (diagnosticoPanel) {
                console.log("Painel de diagnóstico encontrado, verificando dados...");
                const totalText = diagnosticoPanel.querySelector('p strong:contains("Total de requerimentos:")');
                if (totalText && totalText.parentElement.textContent.includes('Nenhum')) {
                    console.error("Não há requerimentos disponíveis na página!");
                }
            }
        } else {
            // Aplicar estilo a cada card
            cards.forEach(function(card, index) {
                card.setAttribute('style', `
                    display: flex !important;
                    flex-direction: column !important;
                    background-color: white !important;
                    border-radius: 10px !important;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04) !important;
                    border: 1px solid #e2e8f0 !important;
                    padding: 1.5rem !important;
                    height: 100% !important;
                    color: inherit !important;
                    text-decoration: none !important;
                    transition: all 0.3s ease !important;
                    animation-delay: ${index * 0.05}s !important;
                `);
                
                // Adicionar eventos de hover
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.08)';
                    this.style.borderColor = '#bfdbfe';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                    this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.04)';
                    this.style.borderColor = '#e2e8f0';
                });
            });
        }
    }
    
    // Aplicar estilos imediatamente
    aplicarEstilosCorrecao();
    
    // E aplicar novamente após um curto delay (para casos de carregamento tardio de CSS)
    setTimeout(aplicarEstilosCorrecao, 500);
    setTimeout(aplicarEstilosCorrecao, 1000);
});

// Função para criar visualização alternativa caso os cards não apareçam
function criarVisualizacaoAlternativa() {
    console.log("Verificando necessidade de visualização alternativa...");
    setTimeout(function() {
        const grid = document.querySelector('.requerimentos-grid');
        const cards = document.querySelectorAll('.requerimento-card');
        
        // Se grid existe mas não tem altura ou não tem cards visíveis
        if ((grid && grid.offsetHeight < 10) || cards.length === 0) {
            console.warn("Grid sem altura ou sem cards, criando visualização alternativa...");
            
            // Criar link para recarregar a página
            const reloadDiv = document.createElement('div');
            reloadDiv.style.textAlign = 'center';
            reloadDiv.style.margin = '20px 0';
            reloadDiv.innerHTML = '<button style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">Recarregar página</button>';
            
            reloadDiv.querySelector('button').addEventListener('click', function() {
                window.location.reload();
            });
            
            // Inserir após o grid
            if (grid && grid.parentNode) {
                grid.parentNode.insertBefore(reloadDiv, grid.nextSibling);
            }
        }
    }, 1500); // Verificar após 1.5 segundos
}

// Executar verificação de visualização alternativa
criarVisualizacaoAlternativa();
