/*script.js*/ 
/*document.addEventListener('DOMContentLoaded', async () => {
    
    
    try {
        
        const response = await fetch('../html/headers.html');
        const htmlContent = await response.text();
        
        // Converti la stringa HTML in un documento DOM
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        
        // Ora puoi usare getElementById sul documento
         burger = doc.getElementById('burger');
         navLinks = doc.getElementById('navLinks');
        
        console.log('Burger:', burger);
        console.log('NavLinks:', navLinks);
        //burger.addEventListener('click', () => {
                 //navLinks.classList.toggle('active');
           //});
        
        
        
        
        
    } catch (error) {
        console.error('Errore nel caricamento burger', error);
        
    }
});*/
// Inizializza elementi come variabili globali



// Mobile menu toggle
//const burger = document.getElementById('burger');
//console.log(burger)
//const navLinks = document.getElementById('navLinks');


// Mobile menu toggle
//const burger = htmlFile.getElementById('burger');
//const burger = searchInHtmlFiles('../../', 'burger');
//const navLinks = document.getElementById('navLinks');
//console.log(burger)
//console.log(navLinks)

//burger.addEventListener('click', () => {
    //navLinks.classList.toggle('active');
//});
// Mobile menu toggle - versione con HTML in variabile
const headerHTML = `
<header>
    <nav>
        <div class="logo">LegatiDalFilo</div>
        <ul class="nav-links" id="navLinks">
            <li><a href="../index.html">Home</a></li>
            <li><a href="../la_nostra_collezione.html">Collezione</a></li>
            <li><a href="../chi_siamo.html">Chi Siamo</a></li>
        </ul>

        <div class="burger" id="burger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </nav>
</header>
`;

// Inserisci l'HTML nel DOM (esempio: all'inizio del body)
document.body.insertAdjacentHTML('afterbegin', headerHTML);

// DOPO aver inserito l'HTML nel DOM, puoi selezionare gli elementi
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
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
                    'rosa': '../../../rosa.html',
                    'nero': '../../../nero.html',
                    'bianco': '../../../bianco.html',
                    'bordeaux':'../../../bordeaux.html',
                    'grigio': '../../../grigio.html',
                    'verde': '../../../verde.html'
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
