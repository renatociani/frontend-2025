// Carica le magliette grigie dalla pagina
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('grigio-products');
    
    if (!container) return;
    
    try {
        const response = await fetch('scritte_grigio.json');
        const data = await response.json();
        
        data.frasi.forEach((frase, index) => {
            const card = createProductCard(frase, data.prezzo, index);
            container.appendChild(card);
        });
        
        const cards = container.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate__animated', 'animate__fadeInUp');
        });
        
    } catch (error) {
        console.error('Errore nel caricamento delle frasi:', error);
        container.innerHTML = '<p style="color: #dc2626; text-align: center;">Errore nel caricamento dei prodotti. Riprova più tardi.</p>';
    }
});

function createProductCard(frase, prezzo, index) {
    const card = document.createElement('div');
    card.className = 'product-card product-card-detail';
    
    card.innerHTML = `
        <div class="product-image">
            <i class="fa-solid fa-shirt tshirt-icon" style="color: #4a4a4a; font-size: 11rem !important;"></i>
        </div>
        <div class="product-info">
            <h3 class="product-title">Grigio #${index + 1}</h3>
            <p class="product-desc">${frase}</p>
            <div class="product-footer">
                <span class="price">€${prezzo}</span>
            </div>
        </div>
    `;
    
    return card;
}