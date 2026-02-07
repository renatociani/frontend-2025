// Gestisce il caricamento dei dati prodotto nel form
document.addEventListener('DOMContentLoaded', () => {
    // Recupera i parametri dall'URL
    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('tipo');
    const taglia = urlParams.get('taglia');
    const colore = urlParams.get('colore');
    const quantita = urlParams.get('quantita');
   
    
    // Mappa dei colori per le icone
    const colors = {
        'Rosa': '#ff69b4',
        'Nero': '#1a1a1a',
        'Bianco': '#ffffff',
        'Bordeaux': '#8b0000',
        'Grigio': '#4a4a4a',
        'Verde': '#32cd32'
    };
    
    // Se ci sono dati prodotto, mostrali
    if (tipo && numero && quantita) {
        const productShowcase = document.getElementById('selected-product');
        const prodottoInfo = document.getElementById('prodotto-info');
        const iconColor = colors[colore] || '#dc2626';
        
        // Aggiorna il colore dell'icona
        const icon = productShowcase.querySelector('.product-showcase-icon i');
        icon.style.color = iconColor;
        
        // Aggiungi ombra speciale per il bianco
        if (colore === 'bianco') {
            icon.style.filter = 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3))';
        }
        
        // Aggiorna le informazioni
        //productShowcase.querySelector('.product-showcase-title').textContent = `${colore.charAt(0).toUpperCase() + colore.slice(1)} #${numero}`;
        //productShowcase.querySelector('.product-showcase-desc').textContent = `"${frase}"`;
        productShowcase.querySelector('.product-showcase-price').textContent = 
            `€${prezzo}`;
        
        // Salva info prodotto nel campo nascosto
        prodottoInfo.value = `${colore.charAt(0).toUpperCase() + colore.slice(1)} #${prezzo} - "${frase}" - €${prezzo}`;
    }
    
    // Gestione quantità
    const decreaseBtn = document.getElementById('decrease');
    const increaseBtn = document.getElementById('increase');
    const quantityInput = document.getElementById('quantita');
    
    decreaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
            updateMessage(); // Aggiorna il messaggio quando cambia la quantità
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
        updateMessage(); // Aggiorna il messaggio quando cambia la quantità
    });
    
    // Gestione selezione taglia - SCRIVE AUTOMATICAMENTE NELLA TEXTAREA
    const tagliaSelect = document.getElementById('taglia');
    const tipoSelect = document.getElementById('tipo');
    const coloreSelect = document.getElementById('colore');
    const quantitaSelect = document.getElementById('quantita');
    const messaggioTextarea = document.getElementById('messaggio');
    
    tagliaSelect.addEventListener('change', () => {
        updateMessage();
    });
    
    // Funzione per aggiornare il messaggio automaticamente
    function updateMessage() {
        const taglia = tagliaSelect.value;
        const tipo = tipoSelect.value;
        const colore = coloreSelect.value;
        const quantita = tipoSelect.quantita;
        
        
        if (taglia) {
            // Costruisci il messaggio automatico
            let message = `Ordine: Colore: ${colore} , Tipo: ${tipo} , Taglia : ${taglia} , Quantita: : ${quantita} `;
            
            /*if (quantita > 1) {
                message += `\nQuantità: ${quantita}`;
            }*/
            
            // Aggiungi il messaggio alla textarea
            messaggioTextarea.value = message;
            
            // Aggiungi un piccolo effetto visivo
            messaggioTextarea.style.borderColor = '#dc2626';
            setTimeout(() => {
                messaggioTextarea.style.borderColor = 'rgba(220, 38, 38, 0.2)';
            }, 500);
        }
    }
    
    // Gestione invio form
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        const submitBtn = form.querySelector('.submit-button');
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Invio in corso...</span>';
        submitBtn.disabled = true;
    });
});
