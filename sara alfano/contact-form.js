// Gestione del form di contatto
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ottieni i valori dal form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Costruisci il corpo dell'email
    const emailBody = `Nome: ${name}%0D%0A` +
                      `Email: ${email}%0D%0A` +
                      `Telefono: ${phone || 'Non fornito'}%0D%0A%0D%0A` +
                      `Messaggio:%0D%0A${message}`;
    
    // Oggetto dell'email basato sulla selezione
    let emailSubject = 'Richiesta di contatto';
    switch(subject) {
        case 'osteopatia':
            emailSubject = 'Richiesta informazioni - Osteopatia';
            break;
        case 'massoterapia':
            emailSubject = 'Richiesta informazioni - Massoterapia';
            break;
        case 'pilates':
            emailSubject = 'Richiesta informazioni - Pilates';
            break;
        case 'altro':
            emailSubject = 'Richiesta informazioni generali';
            break;
    }
    
    // Crea il link mailto
    const mailtoLink = `mailto:armoniadeisensi.sara@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`;
    
    // Apri il client email
    window.location.href = mailtoLink;
    
    // Mostra messaggio di conferma
    const formMessage = document.getElementById('formMessage');
    formMessage.className = 'form-message success';
    formMessage.textContent = 'Il tuo client email si aprirà a breve. Se non dovesse aprirsi, controlla le impostazioni del browser.';
    
    // Opzionale: reset del form dopo 3 secondi
    setTimeout(() => {
        document.getElementById('contactForm').reset();
        formMessage.style.display = 'none';
    }, 5000);
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
        // Rimuovi spazi e caratteri speciali per la validazione
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