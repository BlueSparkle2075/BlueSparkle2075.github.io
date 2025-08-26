const scriptURL = `https://script.google.com/macros/s/AKfycbxVLl50vHeoKvv4c6VlNJXzpJFoG7nR42o3b8YnD4zlmjtQpzdDLLJCzzsJCqJxwZgI9A/exec`;


// Sontaneous applications logic

const responseMessage = document.getElementById('responseMessage');
const form = document.getElementById("contactForm");

async function sendFormData(data) {
  const response = await fetch(scriptURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data) 
  });

  const result = await response.json(); // Convertit la réponse JSON en objet JavaScript

  // Vérifier le contenu de la réponse
  if (result.response === 'registered with success') {
    responseMessage.textContent = `Application received. Don't hope too much though. I'm lazy and it might take years before I read it.`;
    form.reset(); // Effacer le formulaire
  } else if (result.response === 'already in data base') {
    responseMessage.textContent = "We got it already. Submitting more than once won't make me less lazy.";
    form.reset(); // Effacer le formulaire
  } else {
    responseMessage.textContent = `Something wrong happened. Yes, you have to submit again. Or not.`;
  }
}


form.addEventListener('submit', e => {
  e.preventDefault();

  // Créer le corps de la requête
  const name = document.getElementById("name").value;
  const gameId = document.getElementById("gameId").value;
  const state = document.getElementById("state").value;
  const furnace = document.getElementById("furnace").value;
  const power = document.getElementById("power").value;
  const message = document.getElementById("message").value;
  const action = 'spontCandidate';
  const body = {
    name,
    gameId,
    state,
    furnace,
    power,
    message,
    action
  };

  sendFormData(body);
  
});


// login logic