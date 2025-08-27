const scriptURL = 'https://script.google.com/macros/s/AKfycbwBSh1zXHsk3pd1y-STfMqoOfI_c29zCm-kasd6Et5HgzWMIKax56iMaVwikW_C_WsgZw/exec'; // Vérifie que c'est la bonne URL !

const responseMessage = document.getElementById('responseMessage');
const form = document.getElementById('contactForm');

async function sendFormData(data) {

  const formData = new FormData();
  const dataKeys = Object.keys(data);
  for (let key of dataKeys) {
    formData.append(key, data[key]);
  }

  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const result = await response.json();
    if (result.response === 'registered with success') {
      responseMessage.textContent = `Application received. Don't hope too much though. I'm lazy and it might take years before I read it.`;
      form.reset();
    } else if (result.response === 'already in data base') {
      responseMessage.textContent = 'We got it already. Submitting more than once won’t make me less lazy.';
      form.reset();
    } else {
      responseMessage.textContent = `Something wrong happened: ${result.message || 'Unknown error'}. Yes, you have to submit again. Or not.`;
    }
  } catch (error) {
    console.error('Erreur lors de l’envoi :', error);
    responseMessage.textContent = `Erreur : ${error.message}. Try again, or not. Up to you.`;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const body = {
    name: document.getElementById('name').value,
    gameId: document.getElementById('gameId').value,
    state: document.getElementById('state').value,
    furnace: document.getElementById('furnace').value,
    power: document.getElementById('power').value,
    message: document.getElementById('message').value,
    action: 'spontCandidate',
  };
  sendFormData(body);
});


// login logic