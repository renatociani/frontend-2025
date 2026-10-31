// ============================================
// GIORGIA GRAPHICS — SCRIPT MODERNO E LEGGERO
// ============================================

// --- NEWSLETTER POPUP ---
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('newsletterOverlay');
    const mainContent = document.getElementById('mainContent');
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletterEmail');
    const submitBtn = form.querySelector('.submit-button');
    const popupContent = document.querySelector('.popup-content');
    const errorMsg = document.getElementById('popupError');

    // Verifica se l'utente si è già iscritto CON SUCCESSO (localStorage - permanente)
    if (localStorage.getItem('newsletter_subscribed') === 'true') {
        overlay.style.display = 'none';
        mainContent.style.display = 'block';
        return;
    }

    // Mostra il contenuto principale dopo l'iscrizione
    function showMainContent() {
        overlay.style.display = 'none';
        mainContent.style.display = 'block';
        // Salva in localStorage SOLO dopo iscrizione confermata
        localStorage.setItem('newsletter_subscribed', 'true');
    }

    // Gestione del form
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validazione email
        if (!email || !email.includes('@') || !email.includes('.')) {
            errorMsg.textContent = 'Inserisci un indirizzo email valido.';
            errorMsg.style.display = 'block';
            // NON salviamo in localStorage - il popup ricomparirà
            return;
        }

        // Disabilita il pulsante durante l'invio
        submitBtn.disabled = true;
        submitBtn.textContent = 'Invio in corso...';
        errorMsg.style.display = 'none';

        try {
            // Invio dati a FormSubmit (che inoltra a giorgia.graphics22@gmail.com)
            const formData = new FormData();
            formData.append('email', email);
            formData.append('_subject', 'Nuova iscrizione alla newsletter!');
            formData.append('_captcha', 'false');
            formData.append('_template', 'table');

            const response = await fetch('https://formsubmit.co/giorgia.graphics22@gmail.com', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // ✅ SUCCESSO: iscrizione completata correttamente
                // Salva in localStorage (permanente) - il popup non ricomparirà mai più
                localStorage.setItem('newsletter_subscribed', 'true');
                
                // Mostra messaggio di ringraziamento
                popupContent.innerHTML = `
                    <div class="popup-success" style="display:block;">
                        <span class="success-icon">🌸</span>
                        <h3>Grazie per esserti iscritto!</h3>
                        <p>Riceverai presto novità e ispirazioni esclusive.</p>
                        <br>
                        <button onclick="window.location.href='#home'" class="cta-button" style="margin:0 auto;">
                            Inizia a esplorare
                        </button>
                    </div>
                `;
                
                // Mostra il contenuto dopo 2 secondi
                setTimeout(showMainContent, 2000);
            } else {
                // ❌ ERRORE: risposta non OK dal server
                throw new Error('Errore di rete');
            }
        } catch (error) {
            // ❌ ERRORE: problema di rete o altro
            console.error('Errore iscrizione:', error);
            errorMsg.textContent = 'Si è verificato un errore. Riprova più tardi.';
            errorMsg.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Iscriviti';
            
            // IMPORTANTE: NON salviamo in localStorage
            // In caso di errore, il popup ricomparirà al prossimo caricamento
        }
    });
});

// --- MOBILE MENU ---
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });
}

// --- SCROLL SMOOTH ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// --- ANIMAZIONE ENTRY ---
const animatedElements = document.querySelectorAll(
    '.project-card, .about-text, .stats-card, .home-text, .service-card'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
});

// --- CONTATORE CLIENTI ---
const counterEl = document.querySelector('.counter');
if (counterEl) {
    const target = parseInt(counterEl.getAttribute('data-target')) || 30;
    let current = 0;
    let counting = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counting) {
                counting = true;
                const interval = setInterval(() => {
                    current += 1;
                    if (current >= target) {
                        counterEl.textContent = target;
                        clearInterval(interval);
                    } else {
                        counterEl.textContent = current;
                    }
                }, 30);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterObserver.observe(counterEl);
}

// --- CARICAMENTO RECENSIONI ---
function loadReviews() {
    const track = document.getElementById('scrollTrack');
    if (!track) return;

    for (let i = 1; i <= 5; i++) {
        const card = document.createElement('div');
        card.className = 'review-card';
        const img = document.createElement('img');
        img.src = `/immagini/recensioni/recensione${i}.png`;
        img.alt = `Recensione ${i}`;
        img.loading = 'lazy';
        img.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="400"%3E%3Crect width="280" height="400" fill="%23f5dce8"/%3E%3Ctext x="140" y="200" text-anchor="middle" fill="%23b84f7a"%3ERecensione ' + i + '%3C/text%3E%3C/svg%3E';
        };
        card.appendChild(img);
        track.appendChild(card);
    }
}

loadReviews();

// --- SCROLL RECENSIONI ---
const container = document.getElementById('scrollContainer');
const leftBtn = document.getElementById('scrollLeft');
const rightBtn = document.getElementById('scrollRight');

if (container && leftBtn && rightBtn) {
    leftBtn.addEventListener('click', () => {
        container.scrollBy({ left: -300, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
        container.scrollBy({ left: 300, behavior: 'smooth' });
    });

    let isDown = false;
    let startX;
    let scrollLeftPos;

    container.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeftPos = container.scrollLeft;
    });

    container.addEventListener('touchend', () => {
        isDown = false;
    });

    container.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeftPos - walk;
    });
}

// --- CONTACT FORM ---
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('successMessage');

if (form && successMsg) {
    form.addEventListener('submit', (e) => {
        successMsg.style.display = 'block';
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    });
}

// --- PARALLAX DOLCE ---
window.addEventListener('scroll', () => {
    const aboutImg = document.querySelector('.about-image img');
    if (aboutImg && window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const rect = aboutImg.closest('.about-image').getBoundingClientRect();
        const offset = (scrolled - rect.top) * 0.02;
        if (offset > -50 && offset < 50) {
            aboutImg.style.transform = `translateY(${offset}px)`;
        }
    }
});

// --- EFFETTO NEON SUI TITOLI ---
const headings = document.querySelectorAll('h1, h2, h3');
headings.forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.transition = 'text-shadow 0.3s ease';
        el.style.textShadow = '0 0 30px rgba(184, 79, 122, 0.08)';
    });
    el.addEventListener('mouseleave', () => {
        el.style.textShadow = 'none';
    });
});

console.log('🌸 Giorgia Graphics — versione moderna e minimale caricata');