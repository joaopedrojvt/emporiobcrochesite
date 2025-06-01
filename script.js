document.addEventListener('DOMContentLoaded', () => {
    const counterDigitsContainer = document.getElementById('counter-digits-container');
    const digitBoxes = counterDigitsContainer ? counterDigitsContainer.querySelectorAll('.digit-box') : [];

    // Recupera o número de visitas do localStorage
    let visits = localStorage.getItem('site_visits');

    // Se não existir, inicializa com 0
    if (visits === null) {
        visits = 0;
    } else {
        // Converte para número, pois localStorage armazena como string
        visits = parseInt(visits, 10);
    }

    // Incrementa o contador de visitas
    visits++;

    // Formata o número com zeros à esquerda (ex: 000003)
    const formattedVisits = String(visits).padStart(6, '0');

    // Atualiza cada caixa de dígito individualmente
    if (digitBoxes.length === formattedVisits.length) {
        for (let i = 0; i < formattedVisits.length; i++) {
            digitBoxes[i].textContent = formattedVisits[i];
        }
    } else {
        // Fallback caso o número de dígitos no HTML não corresponda
        console.warn('O número de digit-boxes no HTML não corresponde ao formato esperado (6 dígitos).');
        if (counterDigitsContainer) {
            counterDigitsContainer.textContent = formattedVisits; // Mostra o número completo sem caixas
        }
    }

    // Salva o novo número de visitas no localStorage
    localStorage.setItem('site_visits', visits);

    // Animação para títulos
    const animatedHeadings = document.querySelectorAll('.animated-heading');
    animatedHeadings.forEach(heading => {
        heading.style.animation = 'none';
        heading.offsetHeight; /* trigger reflow */
        heading.style.animation = null;
    });
});