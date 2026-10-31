// Gestione del form di contatto
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = document.querySelector('.submit-button');
    const formMessage = document.getElementById('formMessage');
    
    // Disabilita il pulsante durante l'invio
    submitButton.disabled = true;
    submitButton.textContent = 'Invio in corso...';
    
    // Ottieni i valori dal form
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value || 'Non fornito',
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Ottieni il nome del servizio selezionato
    const subjectText = {
        'osteopatia': 'Osteopatia',
        'massoterapia': 'Massoterapia',
        'pilates': 'Pilates',
        'altro': 'Informazioni generali'
    };
    
    // Simula invio email (sostituisci con il tuo servizio email preferito)
    // Per un invio reale, usa EmailJS, Formspree, o un backend PHP
    
    setTimeout(() => {
        // Mostra messaggio di successo
        formMessage.className = 'form-message success';
        formMessage.textContent = '✓ Messaggio inviato con successo! Ti risponderemo al più presto.';
        
        // Reset del form
        document.getElementById('contactForm').reset();
        
        // Riabilita il pulsante
        submitButton.disabled = false;
        submitButton.textContent = 'Invia Messaggio';
        
        // Nascondi il messaggio dopo 5 secondi
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
        
    }, 1500);
    
    // In caso di errore (decommentare se usi un servizio reale)
    /*
    .catch(error => {
        formMessage.className = 'form-message error';
        formMessage.textContent = '✗ Errore nell\'invio. Riprova o contattaci direttamente via email.';
        submitButton.disabled = false;
        submitButton.textContent = 'Invia Messaggio';
    });
    */
});

// Validazione in tempo reale per l'email
document.getElementById('email').addEventListener('blur', function() {
    const email = this.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        this.classList.add('error');
        this.classList.remove('success');
    } else if (email) {
        this.classList.add('success');
        this.classList.remove('error');
    } else {
        this.classList.remove('error', 'success');
    }
});

// Validazione telefono (opzionale, formato italiano)
document.getElementById('phone').addEventListener('blur', function() {
    const phone = this.value;
    if (phone) {
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        const phoneRegex = /^(\+39)?[0-9]{9,10}$/;
        
        if (!phoneRegex.test(cleanPhone)) {
            this.classList.add('error');
            this.classList.remove('success');
        } else {
            this.classList.add('success');
            this.classList.remove('error');
        }
    } else {
        this.classList.remove('error', 'success');
    }
});

// Rimuovi classi di errore quando l'utente inizia a digitare
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
        }
    });
});