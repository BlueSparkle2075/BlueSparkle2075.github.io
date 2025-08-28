const scriptURL = 'https://script.google.com/macros/s/AKfycbyxSvDj3FxPCOHjGhRK1_Z9xn2q3LeE4NTaYZ-AnwNfNSNOPjMouKLd7U3GJDqmWaCwXg/exec'; // Vérifie que c'est la bonne URL !

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

    responseMessage.textContent = `Application received. Don't hope too much though. I'm lazy and it might take years before I read it.`;
  //   const result = await response.json();
  //   if (result.response === 'registered with success') {
  //     responseMessage.textContent = `Application received. Don't hope too much though. I'm lazy and it might take years before I read it.`;
  //     form.reset();
  //   } else if (result.response === 'already in data base') {
  //     responseMessage.textContent = 'We got it already. Submitting more than once won’t make me less lazy.';
  //     form.reset();
  //   } else {
  //     responseMessage.textContent = `Something wrong happened: ${result.message || 'Unknown error'}. Yes, you have to submit again. Or not.`;
  //   }
  } catch (error) {
    console.error('Erreur lors de l’envoi :', error);
    responseMessage.textContent = `${error.message}. Try again, or not. Up to you.`;
  }
  
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


// login logic