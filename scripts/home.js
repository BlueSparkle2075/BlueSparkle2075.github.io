const scriptURL = 'https://script.google.com/macros/s/AKfycbyxSvDj3FxPCOHjGhRK1_Z9xn2q3LeE4NTaYZ-AnwNfNSNOPjMouKLd7U3GJDqmWaCwXg/exec'; // Vérifie que c'est la bonne URL !

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
