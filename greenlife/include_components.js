function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    
    elements.forEach(element => {
        const file = element.getAttribute('data-include');
        
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`File ${file} non trovato`);
                return response.text();
            })
            .then(data => {
                element.innerHTML = data;
            })
            .catch(error => {
                console.error('Errore:', error);
                element.innerHTML = 'Footer non disponibile';
            });
    });
}

// Esegui quando il DOM è caricato
document.addEventListener('DOMContentLoaded', includeHTML);