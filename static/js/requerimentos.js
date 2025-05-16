/**
 * requerimentos.js - Helper script for requerimentos page
 * This ensures styles are properly applied even if there are caching issues
 */

// Function to reload CSS file
function reloadCSS(href) {
    const oldLink = document.querySelector(`link[href^="${href}"]`);
    if (oldLink) {
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = `${href}?v=${new Date().getTime()}`; // Add timestamp to bypass cache
        document.head.appendChild(newLink);
        
        // Remove old link after new one loads
        newLink.onload = function() {
            oldLink.parentNode.removeChild(oldLink);
        };
    }
}

// Ensure styles are applied when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if grid layout is applied correctly
    setTimeout(function() {
        const grid = document.querySelector('.requerimentos-grid');
        if (grid && window.getComputedStyle(grid).display !== 'grid') {
            // Try to reload CSS if the grid style isn't applied
            reloadCSS('/static/css/requerimentos.css');
            reloadCSS('/static/css/requerimentos_override.css');
            
            // Apply inline styles as a fallback
            document.querySelectorAll('.requerimento-card').forEach(card => {
                card.setAttribute('style', 
                    'display: flex !important; ' +
                    'flex-direction: column !important; ' +
                    'background-color: white !important; ' +
                    'border-radius: 10px !important; ' +
                    'box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04) !important; ' +
                    'border: 1px solid #e2e8f0 !important; ' +
                    'padding: 1.5rem !important; ' +
                    'height: 100% !important; ' +
                    'color: inherit !important; ' +
                    'text-decoration: none !important; ' +
                    'transition: all 0.3s ease !important;'
                );
            });
        }
    }, 300);
});
