/**
 * Pro Clean – script.js
 * Funzionalità: navbar scroll, hamburger menu, scroll reveal,
 *               contatore animato, form validazione, scroll-to-top
 */

/* ============================================================
   1. NAVBAR – sticky con cambio stile allo scroll
============================================================ */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
  // Classe "scrolled" oltre 60px
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Aggiorna link attivo in base alla sezione visibile
  updateActiveLink();

  // Mostra / nasconde il bottone scroll-to-top
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);

  // Trigger reveal elements
  revealElements();
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ============================================================
   2. MENU HAMBURGER (mobile)
============================================================ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobLinks   = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  // blocca lo scroll del body quando il menu è aperto
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Chiudi il menu cliccando su un link
mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ============================================================
   3. ACTIVE LINK – evidenzia la voce corrente nel menu
============================================================ */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${current}`
    );
  });
}

/* ============================================================
   4. SCROLL REVEAL – fade-in + slide-up delle sezioni
============================================================ */
const revealEls = document.querySelectorAll('.reveal');

function revealElements() {
  const triggerBottom = window.innerHeight * 0.88;
  revealEls.forEach(el => {
    if (el.getBoundingClientRect().top < triggerBottom) {
      el.classList.add('visible');
    }
  });
}

// Prima esecuzione (per elementi già visibili al caricamento)
revealElements();

/* ============================================================
   5. CONTATORE ANIMATO (Chi siamo – statistiche)
============================================================ */
const counters   = document.querySelectorAll('.stat-num');
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  const section = document.getElementById('chi-siamo');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    countersStarted = true;
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      const duration = 1600; // ms
      const steps    = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, duration / steps);
    });
  }
}

window.addEventListener('scroll', animateCounters, { passive: true });

/* ============================================================
   6. FORM – validazione e invio simulato
============================================================ */
/* ============================================================
   6. FORM – Invio con Formspree (AJAX)
============================================================ */
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const btnText = document.getElementById('btn-text');

function validateField(field, errEl) {
  const value = field.value.trim();
  let message = '';

  if (!value) {
    message = 'Questo campo è obbligatorio.';
  } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    message = 'Inserisci un indirizzo email valido.';
  }

  if (message) {
    field.classList.add('error');
    errEl.textContent = message;
    errEl.classList.add('show');
    return false;
  }

  field.classList.remove('error');
  errEl.textContent = '';
  errEl.classList.remove('show');
  return true;
}

// Rimuovi errore quando l'utente inizia a scrivere
['name', 'email', 'message'].forEach(id => {
  const field = document.getElementById(id);
  const errEl = document.getElementById(`err-${id}`);
  if (field && errEl) {
    field.addEventListener('input', () => {
      if (field.value.trim()) {
        field.classList.remove('error');
        errEl.classList.remove('show');
      }
    });
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const messageField = document.getElementById('message');

  const nameValid = validateField(nameField, document.getElementById('err-name'));
  const emailValid = validateField(emailField, document.getElementById('err-email'));
  const messageValid = validateField(messageField, document.getElementById('err-message'));

  if (!nameValid || !emailValid || !messageValid) return;

  // Disabilita il bottone durante l'invio
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  btnText.textContent = 'Invio in corso…';

  try {
    const formData = new FormData(form);
    
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'  // Importante per Formspree
      }
    });

    if (response.ok) {
      // Successo!
      form.style.display = 'none';
      formSuccess.classList.add('show');
      
      // Reset dopo 6 secondi
      setTimeout(() => {
        form.reset();
        form.style.display = '';
        submitBtn.disabled = false;
        btnText.textContent = 'Invia richiesta';
        formSuccess.classList.remove('show');
      }, 6000);
    } else {
      const data = await response.json();
      let errorMsg = "Oops! C'è stato un problema.";
      if (data && data.errors) {
        errorMsg = data.errors.map(err => err.message).join(", ");
      }
      alert(errorMsg);
      submitBtn.disabled = false;
      btnText.textContent = 'Invia richiesta';
    }
  } catch (error) {
    console.error('Errore:', error);
    alert("Errore di connessione. Riprova più tardi.");
    submitBtn.disabled = false;
    btnText.textContent = 'Invia richiesta';
  }
});

/* ============================================================
   7. SCROLL-TO-TOP BUTTON
============================================================ */
const scrollTopBtn = document.getElementById('scroll-top');

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   8. ANNO CORRENTE nel footer
============================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   9. SMOOTH SCROLL per tutti i link interni (#)
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 8;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================================
   10. INIT – esegui all'avvio
============================================================ */
onScroll();           // navbar state iniziale
animateCounters();    // per desktop con finestra alta
