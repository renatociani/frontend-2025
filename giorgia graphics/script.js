// ==================== VERSIONE COMPLETA E CORRETTA ====================

// Definizione isMobile all'inizio (GLOBALE)
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

console.log('📱 Dispositivo:', isMobile ? 'Mobile' : 'Desktop');

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
        if (navLinks) navLinks.classList.remove('active');
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
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

// Contact form handling
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (successMessage) {
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// ==================== BOLLE CHE CADONO (funziona su mobile E desktop) ====================

function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // Dimensioni: più piccole su mobile
    const size = isMobile ? Math.random() * 40 + 15 : Math.random() * 70 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    bubble.style.left = `${Math.random() * 100}%`;
    
    // Durata: più veloce su mobile
    const duration = isMobile ? Math.random() * 5 + 3 : Math.random() * 8 + 4;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${Math.random() * 3}s`;
    bubble.style.opacity = isMobile ? Math.random() * 0.3 + 0.15 : Math.random() * 0.5 + 0.2;
    
    document.body.appendChild(bubble);
    
    setTimeout(() => {
        if (bubble && bubble.remove) bubble.remove();
    }, duration * 1000);
}

// Bolle su TUTTI i dispositivi (frequenza adattata)
const bubbleInterval = isMobile ? 1200 : 500;
let bubbleIntervalId = setInterval(createBubble, bubbleInterval);

// Pausa bolle quando la pagina non è visibile (performance)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(bubbleIntervalId);
    } else {
        bubbleIntervalId = setInterval(createBubble, bubbleInterval);
    }
});

// ==================== ICONE FLUTTUANTI ====================

const floatingIconsList = [
    { src: '/immagini/pc.webp', name: 'pc' },
    { src: '/immagini/orsetto3ottobre.webp', name: 'orsetto' }
];

function createFloatingIcon() {
    const randomIcon = floatingIconsList[Math.floor(Math.random() * floatingIconsList.length)];
    
    const icon = document.createElement('img');
    icon.src = randomIcon.src;
    icon.alt = randomIcon.name;
    icon.classList.add('floating-icon');
    
    // Dimensioni adattate al dispositivo
    const size = isMobile ? Math.random() * 50 + 30 : Math.random() * 80 + 40;
    icon.style.width = `${size}px`;
    icon.style.height = 'auto';
    
    icon.style.left = `${Math.random() * 100}%`;
    icon.style.top = `${Math.random() * 100}%`;
    
    icon.style.animationDelay = `${Math.random() * 10}s`;
    icon.style.animationDuration = `${isMobile ? Math.random() * 12 + 12 : Math.random() * 15 + 15}s`;
    
    if (isMobile) {
        icon.style.opacity = '0.4';
    }
    
    document.body.appendChild(icon);
    
    setTimeout(() => {
        if (icon && icon.remove) icon.remove();
    }, 30000);
}

// Icone su TUTTI i dispositivi
const iconInterval = isMobile ? 10000 : 7000;
let iconIntervalId = setInterval(createFloatingIcon, iconInterval);

// Crea alcune icone iniziali
const initialIcons = isMobile ? 2 : 4;
for (let i = 0; i < initialIcons; i++) {
    setTimeout(createFloatingIcon, i * 2000);
}

// ==================== TYPING EFFECT ====================

const subtitleElement = document.querySelector('.subtitle');
if (subtitleElement && !isMobile) {  // Solo desktop per typing effect
    const originalText = subtitleElement.innerHTML;
    subtitleElement.innerHTML = '';
    subtitleElement.classList.add('typing-text');
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < originalText.length) {
            subtitleElement.innerHTML += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 80);
        } else {
            subtitleElement.classList.remove('typing-text');
        }
    }
    
    setTimeout(typeWriter, 500);
}

// ==================== MOUSE TRAIL (solo desktop) ====================

if (!isMobile) {
    let mouseX = 0, mouseY = 0;
    let trailElements = [];

    function createTrail() {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.width = '6px';
        trail.style.height = '6px';
        trail.style.backgroundColor = 'rgba(255,20,147,0.5)';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9999';
        trail.style.transition = 'opacity 0.5s';
        trail.style.left = `${mouseX - 3}px`;
        trail.style.top = `${mouseY - 3}px`;
        
        document.body.appendChild(trail);
        trailElements.push(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => {
                if (trail && trail.remove) trail.remove();
                trailElements = trailElements.filter(t => t !== trail);
            }, 500);
        }, 800);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (Math.random() > 0.85) {
            createTrail();
        }
    });
}

// ==================== SCROLL PROGRESS BAR ====================

const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.width = '0%';
progressBar.style.height = isMobile ? '3px' : '4px';
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

// ==================== PARALLAX ====================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        const parallaxAmount = isMobile ? scrolled * 0.02 : scrolled * 0.05;
        aboutImage.style.transform = `translateY(${parallaxAmount}px)`;
    }
});

// ==================== TOUCH FEEDBACK per mobile ====================

document.querySelectorAll('.cta-button, .submit-button, .project-card, .social-link').forEach(element => {
    element.addEventListener('touchstart', function(e) {
        this.style.transform = 'scale(0.97)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
    
    element.addEventListener('touchend', function(e) {
        this.style.transform = '';
    });
});

// ==================== CARD STILE ROSA DINAMICA ====================

const styleImagesList = [
    '/immagini/stile_rosa.png',
    '/immagini/stile_rosa2.png',
    '/immagini/stile_rosa3.png',
    '/immagini/stile_rosa4.png'
];

let currentImgIndex = 0;
let rotationInterval = null;
let isCardHovering = false;

const changingImg = document.getElementById('changingImage');
const dotsList = document.querySelectorAll('.dot');

function changeStyleImageSafe() {
    if (!changingImg) return;
    if (isCardHovering) return;
    
    currentImgIndex = (currentImgIndex + 1) % styleImagesList.length;
    
    changingImg.style.opacity = '0.5';
    changingImg.style.transition = 'opacity 0.3s';
    
    setTimeout(() => {
        if (changingImg) {
            changingImg.src = styleImagesList[currentImgIndex];
            changingImg.style.opacity = '1';
        }
    }, 150);
    
    updateDotsSafe();
}

function updateDotsSafe() {
    if (!dotsList.length) return;
    dotsList.forEach((dot, index) => {
        if (index === currentImgIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function startSafeRotation() {
    if (rotationInterval) clearInterval(rotationInterval);
    rotationInterval = setInterval(changeStyleImageSafe, 3000);
}

function stopSafeRotation() {
    if (rotationInterval) {
        clearInterval(rotationInterval);
        rotationInterval = null;
    }
}

if (changingImg) {
    changingImg.src = styleImagesList[0];
    startSafeRotation();
}

const styleCardElement = document.querySelector('.style-card');
if (styleCardElement) {
    styleCardElement.addEventListener('mouseenter', () => {
        isCardHovering = true;
        stopSafeRotation();
    });
    
    styleCardElement.addEventListener('mouseleave', () => {
        isCardHovering = false;
        startSafeRotation();
    });
    
    // Touch per mobile
    styleCardElement.addEventListener('touchstart', () => {
        isCardHovering = true;
        stopSafeRotation();
    });
    
    styleCardElement.addEventListener('touchend', () => {
        setTimeout(() => {
            isCardHovering = false;
            startSafeRotation();
        }, 3000);
    });
}

if (dotsList.length) {
    dotsList.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (currentImgIndex !== index && changingImg) {
                currentImgIndex = index;
                changingImg.src = styleImagesList[currentImgIndex];
                updateDotsSafe();
                stopSafeRotation();
                startSafeRotation();
            }
        });
    });
}

// ==================== CONTATORE CLIENTI ====================

function startCounterSafe() {
    const counterEl = document.querySelector('.counter');
    if (!counterEl) return;
    
    const targetNum = parseInt(counterEl.getAttribute('data-target')) || 30;
    let currentNum = 0;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && currentNum === 0) {
                const interval = setInterval(() => {
                    if (currentNum >= targetNum) {
                        clearInterval(interval);
                        counterEl.textContent = targetNum;
                    } else {
                        currentNum++;
                        counterEl.textContent = currentNum;
                    }
                }, 40);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterObserver.observe(counterEl);
}

startCounterSafe();

// 2. CARICAMENTO RECENSIONI
// ==================== LOAD RECENSIONI ====================

function loadReviewsSafe() {
    const scrollTrack = document.getElementById('scrollTrack');
    if (!scrollTrack) return;
    
    for (let r = 1; r <= 5; r++) {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card');
        const img = document.createElement('img');
        img.src = `/immagini/recensioni/recensione${r}.png`;
        img.alt = `Recensione ${r}`;
        img.loading = 'lazy';
        img.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="400"%3E%3Crect width="280" height="400" fill="%23rgba(255,255,255,0.1)"/%3E%3Ctext x="140" y="200" text-anchor="middle" fill="white"%3ERecensione ' + r + '%3C/text%3E%3C/svg%3E';
        };
        reviewCard.appendChild(img);
        scrollTrack.appendChild(reviewCard);
    }
}

loadReviewsSafe();

// ==================== SCROLL CONTROLS ====================

const scrollContainer = document.getElementById('scrollContainer');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -320, behavior: 'smooth' });
    });
    scrollRightBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: 320, behavior: 'smooth' });
    });
    
    // Drag scroll per mobile
    let isDown = false;
    let startX;
    let scrollLeftPos;
    
    scrollContainer.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - scrollContainer.offsetLeft;
        scrollLeftPos = scrollContainer.scrollLeft;
    });
    
    scrollContainer.addEventListener('touchend', () => {
        isDown = false;
    });
    
    scrollContainer.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeftPos - walk;
    });
}


// ==================== EFFETTO NEON ====================

const neonHeadings = document.querySelectorAll('h1, h2, h3, .subtitle, .logo');
neonHeadings.forEach((el) => {
    el.addEventListener('mouseenter', (e) => {
        e.target.style.transition = 'text-shadow 0.3s';
        e.target.style.textShadow = '0 0 20px #FF1493, 0 0 40px #B967FF';
    });
    el.addEventListener('mouseleave', (e) => {
        e.target.style.textShadow = '';
    });
});

// ==================== SOTTOLINEA NEON ====================

const h2Elements = document.querySelectorAll('h2');
h2Elements.forEach((h2) => {
    const underline = document.createElement('div');
    underline.style.width = '0%';
    underline.style.height = '3px';
    underline.style.background = 'linear-gradient(90deg, #FF1493, #B967FF, #FF1493)';
    underline.style.margin = '10px auto 0';
    underline.style.borderRadius = '3px';
    underline.style.transition = 'width 0.8s ease';
    h2.insertAdjacentElement('afterend', underline);
    
    const underlineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                underline.style.width = '80%';
            }
        });
    }, { threshold: 0.5 });
    underlineObserver.observe(h2);
});

// ==================== PRELOAD IMMAGINI ====================

const imagesToPreload = [
    '/immagini/pc.webp',
    '/immagini/orsetto3ottobre.webp',
    '/immagini/orsetto.webp',
    '/immagini/stile_rosa.png',
    '/immagini/stile_rosa2.png'
];

imagesToPreload.forEach(imgSrc => {
    const img = new Image();
    img.src = imgSrc;
});

// ==================== CONTATORE VISITE ====================

let visitCount = localStorage.getItem('visitCount');
if (!visitCount) {
    visitCount = 1;
} else {
    visitCount = parseInt(visitCount) + 1;
}
localStorage.setItem('visitCount', visitCount);
console.log(`🎨 Benvenuto! Visita numero ${visitCount} - Mobile: ${isMobile}`);

// ==================== FINE ====================
console.log('✅ Tutte le animazioni sono attive!');


// ==================== CARD STILE ROSA DINAMICA ====================

// Array delle immagini da alternare
const styleImages = [
    '/immagini/stile_rosa.png',
    '/immagini/stile_rosa2.png',
    '/immagini/stile_rosa3.png',
    '/immagini/stile_rosa4.png'
];

let currentImageIndex = 0;
let imageInterval;
let isHovering = false;

// Elementi DOM
const changingImage = document.getElementById('changingImage');
const dots = document.querySelectorAll('.dot');

// Funzione per cambiare immagine
function changeStyleImage() {
    if (!changingImage) return;
    if (isHovering) return; // Pausa se l'utente sta interagendo
    
    // Cambia indice (0 -> 1 -> 0)
    currentImageIndex = (currentImageIndex + 1) % styleImages.length;
    
    // Aggiungi classe per animazione
    changingImage.classList.add('image-changing');
    
    // Cambia immagine dopo un breve delay per l'animazione
    setTimeout(() => {
        changingImage.src = styleImages[currentImageIndex];
    }, 100);
    
    // Rimuovi classe animazione dopo che è finita
    setTimeout(() => {
        changingImage.classList.remove('image-changing');
    }, 600);
    
    // Aggiorna pallini indicatori
    updateDots();
}

// Aggiorna i pallini indicatori
function updateDots() {
    dots.forEach((dot, index) => {
        if (index === currentImageIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Avvia il timer per il cambio immagine
function startImageRotation() {
    if (imageInterval) clearInterval(imageInterval);
    imageInterval = setInterval(changeStyleImage, 3000); // Ogni 3 secondi
}

// Ferma il timer
function stopImageRotation() {
    if (imageInterval) {
        clearInterval(imageInterval);
        imageInterval = null;
    }
}

// Gestione hover sulla card
const styleCard = document.querySelector('.style-card');
if (styleCard) {
    // Metti in pausa il cambio immagine quando l'utente passa sopra
    styleCard.addEventListener('mouseenter', () => {
        isHovering = true;
        stopImageRotation();
    });
    
    styleCard.addEventListener('mouseleave', () => {
        isHovering = false;
        startImageRotation();
    });
    
    // Touch per mobile
    styleCard.addEventListener('touchstart', () => {
        isHovering = true;
        stopImageRotation();
    });
    
    styleCard.addEventListener('touchend', () => {
        setTimeout(() => {
            isHovering = false;
            startImageRotation();
        }, 3000);
    });
}

// Click sui pallini per cambiare manualmente l'immagine
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (currentImageIndex !== index) {
            currentImageIndex = index;
            
            // Animazione cambio
            changingImage.classList.add('image-changing');
            setTimeout(() => {
                changingImage.src = styleImages[currentImageIndex];
            }, 100);
            setTimeout(() => {
                changingImage.classList.remove('image-changing');
            }, 600);
            
            updateDots();
            
            // Reset timer dopo interazione manuale
            stopImageRotation();
            startImageRotation();
        }
    });
});

// Caricamento iniziale
if (changingImage) {
    // Assicurati che l'immagine iniziale sia corretta
    changingImage.src = styleImages[0];
    
    // Gestione errore immagine (fallback)
    changingImage.onerror = function() {
        console.warn('Immagine non trovata:', this.src);
        // Prova a caricare l'altra immagine
        if (this.src.includes('stile_rosa.png')) {
            this.src = '/immagini/stile_rosa2.png';
        } else if (this.src.includes('stile_rosa2.png')) {
            this.src = '/immagini/stile_rosa.png';
        } 
    };
}

// Avvia la rotazione automatica
startImageRotation();

// Pausa rotazione quando la pagina non è visibile (performance)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopImageRotation();
    } else {
        if (!isHovering) {
            startImageRotation();
        }
    }
});

// Log di conferma
console.log('✨ Card stile rosa dinamica attivata! Cambia immagine ogni 3 secondi');