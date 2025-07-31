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
        responseMessage.textContent = 'Merci ! Votre message a été envoyé avec succès.';
        form.reset(); // Effacer le formulaire
      } else {
        responseMessage.textContent = 'Une erreur est survenue. Veuillez réessayer plus tard.';
      }
      return response.json();
    })
    .catch(error => {
      console.error('Erreur:', error.message);
      responseMessage.textContent = 'Une erreur de connexion est survenue. Veuillez vérifier votre connexion internet.';
    });
});