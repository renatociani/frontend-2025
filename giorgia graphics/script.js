// Mobile menu toggle
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const decoCircles = document.querySelectorAll('.deco-circle');
    decoCircles.forEach((circle, index) => {
        if (circle) {
            circle.style.transform = `rotate(${scrolled * (0.1 + index * 0.05)}deg)`;
        }
    });
});

// Add animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .about-text, .info-card-single').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Contact form handling con FormSubmit
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    });
}

// ==================== NUOVE ANIMAZIONI ====================

// 1. CREAZIONE BOLLE CHE CADONO
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // Dimensioni casuali tra 10px e 80px
    const size = Math.random() * 70 + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Posizione orizzontale casuale
    bubble.style.left = `${Math.random() * 100}%`;
    
    // Durata animazione casuale tra 4 e 12 secondi
    const duration = Math.random() * 8 + 4;
    bubble.style.animationDuration = `${duration}s`;
    
    // Ritardo casuale
    bubble.style.animationDelay = `${Math.random() * 5}s`;
    
    // Opacità casuale
    bubble.style.opacity = Math.random() * 0.5 + 0.2;
    
    document.body.appendChild(bubble);
    
    // Rimuovi la bolla dopo l'animazione
    setTimeout(() => {
        bubble.remove();
    }, duration * 1000);
}

// Crea bolle ogni 500ms (solo su desktop per performance)
if (window.innerWidth > 768) {
    setInterval(createBubble, 500);
}

// 2. CREAZIONE ICONE FLUTTUANTI (pc.webp e orsetto3ottobre.webp)
const floatingIcons = [
    { src: '/immagini/pc.webp', name: 'pc' },
    { src: '/immagini/orsetto3ottobre.webp', name: 'orsetto' }
    /*{ src: '/immagini/gomma.webp', name: 'gomma' }*/
    
];

function createFloatingIcon() {
    const icon = document.createElement('img');
    const randomIcon = floatingIcons[Math.floor(Math.random() * floatingIcons.length)];
    
    icon.src = randomIcon.src;
    icon.alt = randomIcon.name;
    icon.classList.add('floating-icon');
    
    // Dimensioni casuali
    const size = Math.random() * 80 + 40;
    icon.style.width = `${size}px`;
    icon.style.height = 'auto';
    
    // Posizione casuale
    icon.style.left = `${Math.random() * 100}%`;
    icon.style.top = `${Math.random() * 100}%`;
    
    // Ritardo animazione casuale
    icon.style.animationDelay = `${Math.random() * 10}s`;
    icon.style.animationDuration = `${Math.random() * 15 + 15}s`;
    
    document.body.appendChild(icon);
    
    // Rimuovi l'icona dopo 30 secondi
    setTimeout(() => {
        icon.remove();
    }, 30000);
}

// Crea icone fluttuanti ogni 8 secondi (solo desktop)
if (window.innerWidth > 768) {
    setInterval(createFloatingIcon, 8000);
    
    // Crea 5 icone iniziali
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingIcon, i * 1000);
    }
}

// 3. TYPING EFFECT PER IL SOTTOTITOLO
const subtitle = document.querySelector('.subtitle');
if (subtitle && window.innerWidth > 768) {
    const originalText = subtitle.innerHTML;
    subtitle.innerHTML = '';
    subtitle.classList.add('typing-text');
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            subtitle.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            subtitle.classList.remove('typing-text');
        }
    }
    
    // Avvia l'effetto dopo 1 secondo
    setTimeout(typeWriter, 1000);
}

// 4. EFFETTO MOUSE TRAIL (scia al mouse)
let mouseX = 0, mouseY = 0;
let trailElements = [];

function createTrail() {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.width = '8px';
    trail.style.height = '8px';
    trail.style.backgroundColor = 'rgba(255,20,147,0.6)';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9999';
    trail.style.transition = 'opacity 0.5s';
    trail.style.left = `${mouseX - 4}px`;
    trail.style.top = `${mouseY - 4}px`;
    
    document.body.appendChild(trail);
    trailElements.push(trail);
    
    // Rimuovi il trail dopo 1 secondo
    setTimeout(() => {
        trail.style.opacity = '0';
        setTimeout(() => {
            trail.remove();
            trailElements = trailElements.filter(t => t !== trail);
        }, 500);
    }, 1000);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Crea trail ogni 100ms (solo desktop)
    if (window.innerWidth > 768 && Math.random() > 0.7) {
        createTrail();
    }
});

// 5. SCROLL PROGRESS BAR
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.width = '0%';
progressBar.style.height = '4px';
progressBar.style.backgroundColor = '#FF1493';
progressBar.style.zIndex = '10000';
progressBar.style.transition = 'width 0.3s';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// 6. PARALLAX PER LE IMMAGINI
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        aboutImage.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
});

// 7. EFFETTO GLASS MORPHISM AL CLICK
document.querySelectorAll('.cta-button, .submit-button').forEach(button => {
    button.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// 8. CONTATORE VISITE (opzionale - mostra in console)
let visitCount = localStorage.getItem('visitCount');
if (!visitCount) {
    visitCount = 1;
} else {
    visitCount = parseInt(visitCount) + 1;
}
localStorage.setItem('visitCount', visitCount);
console.log(`🎨 Benvenuto! Questa è la tua visita numero ${visitCount} su Giorgia Graphics`);

// 9. PRELOAD DELLE IMMAGINI PER ANIMAZIONI PIÙ FLUIDE
const imagesToPreload = [
    '/immagini/pc.webp',
    '/immagini/orsetto3ottobre.webp',
    '/immagini/orsetto.webp'
    /*'/immagini/gomma.webp'*/
];

imagesToPreload.forEach(imgSrc => {
    const img = new Image();
    img.src = imgSrc;
});

// 10. RESIZE EVENT PER RICREARE ANIMAZIONI SU MOBILE
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        // Disabilita alcune animazioni su mobile
        document.querySelectorAll('.bubble, .floating-icon').forEach(el => el.remove());
    }
});

// ==================== NUOVE FUNZIONALITÀ ====================

// 1. CONTATORE NUMERICO (30+ clienti)
function startCounter() {
    const counterElement = document.querySelector('.counter');
    if (!counterElement) return;
    
    const target = parseInt(counterElement.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const updateCounter = () => {
        current += increment;
        if (current >= target) {
            counterElement.textContent = target;
            return;
        }
        counterElement.textContent = Math.floor(current);
        setTimeout(updateCounter, stepTime);
    };
    
    // Osserva quando la sezione diventa visibile
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && counterElement.textContent === '0') {
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(counterElement);
}

// 2. CARICAMENTO RECENSIONI
const reviewImages = [
    '/immagini/recensioni/recensione1.png',
    '/immagini/recensioni/recensione2.png',
    '/immagini/recensioni/recensione3.png',
    '/immagini/recensioni/recensione4.png',
    '/immagini/recensioni/recensione5.png',
    '/immagini/recensioni/recensione6.png',
    '/immagini/recensioni/recensione7.png',
    '/immagini/recensioni/recensione8.png',
    '/immagini/recensioni/recensione9.png',
    '/immagini/recensioni/recensione10.png'
];

function loadReviews() {
    const scrollTrack = document.getElementById('scrollTrack');
    if (!scrollTrack) return;
    
    reviewImages.forEach((imgSrc, index) => {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card');
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Recensione cliente ${index + 1}`;
        img.loading = 'lazy';
        
        // Se l'immagine non esiste, mostra un placeholder
        img.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="400" viewBox="0 0 280 400"%3E%3Crect width="280" height="400" fill="%23rgba(255,255,255,0.1)" rx="15"/%3E%3Ctext x="140" y="200" text-anchor="middle" fill="white" font-size="14"%3ERecensione %23' + (index + 1) + '%3C/text%3E%3C/svg%3E';
        };
        
        reviewCard.appendChild(img);
        scrollTrack.appendChild(reviewCard);
    });
}

// 3. SCROLL ORIZZONTALE RECENSIONI
function initScrollControls() {
    const scrollContainer = document.getElementById('scrollContainer');
    const scrollLeft = document.getElementById('scrollLeft');
    const scrollRight = document.getElementById('scrollRight');
    
    if (!scrollContainer || !scrollLeft || !scrollRight) return;
    
    const scrollAmount = 350;
    
    scrollLeft.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    scrollRight.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Scroll con drag su mobile
    let isDown = false;
    let startX;
    let scrollLeftPos;
    
    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeftPos = scrollContainer.scrollLeft;
    });
    
    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    scrollContainer.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeftPos - walk;
    });
    
    // Touch per mobile
    scrollContainer.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - scrollContainer.offsetLeft;
        scrollLeftPos = scrollContainer.scrollLeft;
    });
    
    scrollContainer.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeftPos - walk;
    });
    
    scrollContainer.addEventListener('touchend', () => {
        isDown = false;
    });
}

// 4. EFFETTO NEON DINAMICO SU TUTTI I TESTI
function addDynamicNeon() {
    const allHeadings = document.querySelectorAll('h1, h2, h3, .subtitle, .logo');
    
    allHeadings.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'text-shadow 0.3s';
            el.style.textShadow = '0 0 20px #FF1493, 0 0 40px #FF1493, 0 0 80px #B967FF';
        });
        
        el.addEventListener('mouseleave', () => {
            setTimeout(() => {
                el.style.textShadow = '';
            }, 300);
        });
    });
}

// 5. AGGIUNGI PARTICOLINE NEON SOTTO I TITOLI
function addNeonUnderline() {
    const headings = document.querySelectorAll('h2');
    
    headings.forEach(h2 => {
        const underline = document.createElement('div');
        underline.style.width = '0%';
        underline.style.height = '3px';
        underline.style.background = 'linear-gradient(90deg, #FF1493, #B967FF, #FF1493)';
        underline.style.margin = '10px auto 0';
        underline.style.borderRadius = '3px';
        underline.style.transition = 'width 0.8s ease';
        underline.style.boxShadow = '0 0 15px #FF1493';
        
        h2.style.position = 'relative';
        h2.style.display = 'inline-block';
        h2.style.width = '100%';
        h2.style.textAlign = 'center';
        h2.parentElement.style.textAlign = 'center';
        h2.insertAdjacentElement('afterend', underline);
        
        // Anima l'underline quando entra in vista
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    underline.style.width = '80%';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(h2);
    });
}

// 6. EFFETTO PARTICELLE ATTORNO AL MOUSE (neon)
function createNeonParticles() {
    if (isMobile) return;
    
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.backgroundColor = '#FF1493';
            particle.style.borderRadius = '50%';
            particle.style.left = e.clientX + 'px';
            particle.style.top = e.clientY + 'px';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.boxShadow = '0 0 10px #FF1493';
            particle.style.animation = 'fadeOut 1s forwards';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    });
}

// Aggiungi l'animazione fadeOut se non esiste
if (!document.querySelector('#fadeOutKeyframes')) {
    const style = document.createElement('style');
    style.id = 'fadeOutKeyframes';
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(2); }
        }
    `;
    document.head.appendChild(style);
}

// 7. AVVIA TUTTE LE NUOVE FUNZIONI
document.addEventListener('DOMContentLoaded', () => {
    startCounter();
    loadReviews();
    initScrollControls();
    addDynamicNeon();
    addNeonUnderline();
    createNeonParticles();
});

// 8. AGGIUNGI CLASSE PER DISPOSITIVI MOBILE
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobileDevice) {
    document.body.classList.add('is-mobile');
}