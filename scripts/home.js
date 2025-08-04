const scriptURL = `https://script.google.com/macros/s/AKfycbzKi-1KWm-3l4ZypbyvjuxsmrcazmfXIs2EMl86rGhsmzyHOPWJrb3a6Cbgkht3WXd77w/exec`;
const form = document.getElementById('contactForm');
const responseMessage = document.getElementById('responseMessage');
form.addEventListener('submit', e => {
  e.preventDefault();
  
  // Créez un objet FormData à partir du formulaire
  const formData = new FormData(form);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => {
      // Gérer la réponse du script Apps Script
      if (response.ok) {
        responseMessage.textContent = `Application received. Don't hope too much though. I'm lazy and it might take years before I read it.`;
        form.reset(); // Effacer le formulaire
      } else {
        responseMessage.textContent = `Something wrong happened. Yes, you have to do it again. Or not.`;
      }
      return response.json();
    })
    .catch(error => {
      console.error('Erreur:', error.message);
      responseMessage.textContent = 'A connection error has occurred. Please check your internet connection.';
    });
});