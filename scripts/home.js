const scriptURL = 'https://script.google.com/macros/s/AKfycbyxSvDj3FxPCOHjGhRK1_Z9xn2q3LeE4NTaYZ-AnwNfNSNOPjMouKLd7U3GJDqmWaCwXg/exec'; // Vérifie que c'est la bonne URL !

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



// login logic