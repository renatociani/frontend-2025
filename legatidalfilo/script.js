/*script.js*/ 
let cartCount = 0;

function addToCart() {
    cartCount++;
    document.getElementById('cartCount').textContent = cartCount;
    
    // Animazione del carrello
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 300);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVIGAZIONE ALLE PAGINE COLORE =====
// ===== NAVIGAZIONE ALLE PAGINE COLORE =====
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const title = card.querySelector('.product-title');
        if (title) {
            const color = title.textContent.trim().toLowerCase().replace(' ', '_');
            
            card.addEventListener('click', () => {
                // Animazione click
                card.style.transform = 'scale(0.98)';
                
                // Mappa dei colori alle pagine
                const colorPages = {
                    'rosa': 'rosa.html',
                    'nero': 'nero.html',
                    'bianco': 'bianco.html',
                    'bordeaux': 'bordeaux.html',
                    'grigio': 'grigio.html',
                    'verde': 'verde.html'
                };
                
                // Naviga alla pagina del colore
                if (colorPages[color]) {
                    setTimeout(() => {
                        window.location.href = colorPages[color];
                    }, 200);
                } else {
                    console.log(`Pagina per ${color} non trovata`);
                }
            });
        }
    });
});
