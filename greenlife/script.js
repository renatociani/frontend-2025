/* ========================================
   MOBILE MENU TOGGLE
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMobile = document.getElementById('navMobile');
    const body = document.body;
    
    if (mobileMenuToggle && navMobile) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMobile.classList.toggle('active');
            
            // Previeni lo scroll quando il menu è aperto
            if (navMobile.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Chiudi il menu quando si clicca su un link
        const navMobileLinks = document.querySelectorAll('.nav-mobile-link');
        navMobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMobile.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }
});

/* ========================================
   SMOOTH SCROLL
   ======================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignora link vuoti o solo "#"
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ========================================
   HEADER SCROLL EFFECT
   ======================================== */

let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Aggiungi ombra più pronunciata quando si scrolla
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
    
    lastScroll = currentScroll;
});

/* ========================================
   FORM VALIDATION - CONTACT FORM
   ======================================== */

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Rimuovi messaggi precedenti
        const prevMessages = contactForm.querySelectorAll('.form-success, .form-error');
        prevMessages.forEach(msg => msg.remove());
        
        // Ottieni valori
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const messaggio = document.getElementById('messaggio').value.trim();
        const privacy = document.getElementById('privacy').checked;
        
        // Validazione
        let errors = [];
        
        if (nome === '') {
            errors.push('Il nome è obbligatorio');
        }
        
        if (email === '') {
            errors.push('L\'email è obbligatoria');
        } else if (!isValidEmail(email)) {
            errors.push('L\'email non è valida');
        }
        
        if (telefono === '') {
            errors.push('Il telefono è obbligatorio');
        }
        
        if (messaggio === '') {
            errors.push('Il messaggio è obbligatorio');
        }
        
        if (!privacy) {
            errors.push('Devi accettare la privacy policy');
        }
        
        // Mostra errori o successo
        if (errors.length > 0) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.innerHTML = '<strong>Errori:</strong><ul>' + 
                errors.map(err => '<li>' + err + '</li>').join('') + 
                '</ul>';
            contactForm.insertBefore(errorDiv, contactForm.firstChild);
            
            // Scroll al form
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            const successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            successDiv.innerHTML = '<strong>Successo!</strong> La tua richiesta è stata inviata. Ti ricontatteremo al più presto.';
            contactForm.insertBefore(successDiv, contactForm.firstChild);
            
            // Reset form
            contactForm.reset();
            
            // Scroll al messaggio
            successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Rimuovi il messaggio dopo 5 secondi
            setTimeout(() => {
                successDiv.style.transition = 'opacity 0.5s';
                successDiv.style.opacity = '0';
                setTimeout(() => successDiv.remove(), 500);
            }, 5000);
        }
    });
}

/* ========================================
   FORM VALIDATION - NEWSLETTER
   ======================================== */

const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email === '' || !isValidEmail(email)) {
            alert('Inserisci un indirizzo email valido');
            return;
        }
        
        // Simula invio
        alert('Grazie per esserti iscritto alla newsletter!');
        newsletterForm.reset();
    });
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/* ========================================
   ACTIVE NAV LINK
   ======================================== */

// Evidenzia il link attivo nella navigazione
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

/* ========================================
   LAZY LOADING IMAGES (OPZIONALE)
   ======================================== */

// Aggiungi lazy loading alle immagini per migliorare le performance
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback per browser che non supportano lazy loading nativo
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

/* ========================================
   ANIMATION ON SCROLL (OPZIONALE)
   ======================================== */

// Aggiungi animazioni quando gli elementi entrano nel viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Osserva gli elementi che vuoi animare
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .service-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
