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
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const title = card.querySelector('.product-title');
        if (title) {
            const color = title.textContent.trim().toLowerCase().replace(' ', '_');
            
            card.addEventListener('click', () => {
                // Animazione click
                card.style.transform = 'scale(0.98)';
                
                // Naviga alla pagina del colore
                if (color === 'rosa') {
                    setTimeout(() => {
                        window.location.href = 'rosa.html';
                    }, 200);
                } else if (color === 'nero') {
                    setTimeout(() => {
                        window.location.href = 'nero.html';
                    }, 200);
                } else {
                    console.log(`Pagina per ${color} non ancora disponibile`);
                }
            });
        }
    });
});