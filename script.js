// Configuração do Firebase (você precisará criar um projeto no Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyCYjXSrvqJ33H79O3MHgVtOp8AB8lUuHpM",
  authDomain: "emporiobcroche-counter.firebaseapp.com",
  databaseURL: "https://emporiobcroche-counter-default-rtdb.firebaseio.com",
  projectId: "emporiobcroche-counter",
  storageBucket: "emporiobcroche-counter.firebasestorage.app",
  messagingSenderId: "467297511268",
  appId: "1:467297511268:web:9532ec95c2fc6e6a07bc71"
  
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.addEventListener('DOMContentLoaded', () => {
  const counterDigitsContainer = document.getElementById('counter-digits-container');
  const digitBoxes = counterDigitsContainer.querySelectorAll('.digit-box');

  // Referência para o contador no banco de dados
  const visitsRef = database.ref('visits');

  // Incrementa o contador no servidor
  visitsRef.transaction((currentCount) => {
    return (currentCount || 0) + 1;
  }).then(() => {
    // Atualiza a exibição com o valor mais recente
    visitsRef.on('value', (snapshot) => {
      const visits = snapshot.val();
      updateCounterDisplay(visits);
      
      // Armazena localmente para carregamento mais rápido na próxima visita
      localStorage.setItem('site_visits', visits);
    });
  }).catch((error) => {
    console.error("Erro ao atualizar contador:", error);
    // Fallback: usa localStorage se o Firebase falhar
    
    updateCounterDisplay(localVisits + 1);
    localStorage.setItem('site_visits', localVisits + 1);
  });

  function updateCounterDisplay(visits) {
    const formattedVisits = String(visits).padStart(6, '0');
    digitBoxes.forEach((box, index) => {
      box.textContent = formattedVisits[index];
    });
  }

  // Animação para títulos (mantido do seu código original)
  const animatedHeadings = document.querySelectorAll('.animated-heading');
  animatedHeadings.forEach(heading => {
    heading.style.animation = 'none';
    heading.offsetHeight;
    heading.style.animation = null;
  });
});