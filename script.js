document.addEventListener('DOMContentLoaded', async () => {
    const counterDigitsContainer = document.getElementById('counter-digits-container');
    const digitBoxes = counterDigitsContainer ? counterDigitsContainer.querySelectorAll('.digit-box') : [];

    try {
        // 1. Tenta obter a contagem GLOBAL da API
        const globalResponse = await fetch('https://api.countapi.xyz/hit/emporiobcroche/visits');
        const globalData = await globalResponse.json();
        const globalVisits = globalData.value;

        // 2. Atualiza a contagem LOCAL para exibição mais rápida em futuras visitas
        const localVisits = localStorage.getItem('site_visits') || 0;
        localStorage.setItem('site_visits', globalVisits);

        // 3. Usa o maior valor entre global e local (para casos de falha na API)
        const visitsToShow = Math.max(globalVisits, parseInt(localVisits, 10));
        updateCounterDisplay(visitsToShow);

    } catch (error) {
        console.error('Falha ao acessar a API, usando localStorage:', error);
        
        // Fallback: usa apenas localStorage se a API falhar
        let visits = localStorage.getItem('site_visits');
        visits = visits ? parseInt(visits, 10) + 1 : 1;
        localStorage.setItem('site_visits', visits);
        updateCounterDisplay(visits);
    }

    function updateCounterDisplay(visits) {
        const formattedVisits = String(visits).padStart(6, '0');
        
        if (digitBoxes.length === formattedVisits.length) {
            digitBoxes.forEach((box, i) => {
                box.textContent = formattedVisits[i];
            });
        } else if (counterDigitsContainer) {
            counterDigitsContainer.textContent = formattedVisits;
        }
    }

    // Animação para títulos (mantido do seu código original)
    const animatedHeadings = document.querySelectorAll('.animated-heading');
    animatedHeadings.forEach(heading => {
        heading.style.animation = 'none';
        heading.offsetHeight; /* trigger reflow */
        heading.style.animation = null;
    });
});