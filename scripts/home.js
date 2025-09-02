const scriptURL = 'https://script.google.com/macros/s/AKfycbzK8n9LfshYVYDsDFz8aXchf3L1BCuOkFZv4C9T6p4QIZIQ7EYkp8IYbEaddpiXKYUtvA/exec'; // Vérifie que c'est la bonne URL !

// Login logic
/* 

remember that navigator needs to remember somehow that he logged on when he refreshes or go to next page
also next page should not be accessible if url typed in navigator bar directly

first let's run some tests on how behaves the memory thing objects grok told me about, then 
i'll fail at writing the doPost function on login on App Script side.
no, en fait first il faut faire le popup formulaire de login mdr. espérons que ça fera pas un truc moche.

*/


// affichage fermeture du popup de connection

const startButton = document.getElementById('startButton');
const closePopup = document.getElementById('closepopup');
const loginPopup = document.getElementById('loginpopup');

startButton.addEventListener('click', (e) => {
  loginPopup.style.display = 'block';
})

closePopup.addEventListener('click', (e) => {
  loginPopup.style.display = 'none';
})


// envoi des identifiants à App Script

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const idInput = document.getElementById('userId');
  const passwordInput = document.getElementById('password');
  const loginData = new FormData();
  loginData.append('userInput', idInput.value);
  loginData.append('passwordInput', passwordInput.value);
  loginData.append('action', 'login');
  fetch(scriptURL, {
    method: 'POST',
    body: loginData,
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.access === 'granted') {
      // enregistrer en mémoire locale les trucs pour les pages d'après
      const userData = {
        user: res.name,
        alliance: res.alliance,
        isTM: res.isTM
      }
      localStorage.setItem('userData', JSON.stringify(userData));
      // rediriger vers la bonne page qui sera remplie de manière dynamique en fonction de l'utilisateur
      // parce que je suis une feignasse
      window.location.href = 'poach-manager.html';
    } else {
      // rediriger vers la page fuck you
      window.location.href = 'fuckyou.html';
    }
  })
  .catch((er) => {
    // autres erreurs de l'échange des données
    console.log(er.message);
  })
})





// Candidatures spontannées
const responseMessage = document.getElementById('responseMessage');
const form = document.getElementById('contactForm');

async function sendFormData(data) {

  const formData = new FormData();
  const dataKeys = Object.keys(data);
  for (let key of dataKeys) {
    formData.append(key, data[key]);
  }

  fetch(scriptURL, {
    method: 'POST',
    body: formData,
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.result === 'success') {
      responseMessage.textContent = `Application received. Don't hope too much though. I'm lazy and it might take years before I read it.`;
    } else {
      responseMessage.textContent = `${res.message}`;
    }
    form.reset();
  })
  .catch((err) => {
    responseMessage.textContent = `${err.message}. Try again, or not. Up to you.`;
  })
  
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    gameId: document.getElementById('gameId').value,
    state: document.getElementById('state').value,
    furnace: document.getElementById('furnace').value,
    power: document.getElementById('power').value,
    message: document.getElementById('message').value,
    action: 'spontCandidate',
  };
  sendFormData(data);
});
