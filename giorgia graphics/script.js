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