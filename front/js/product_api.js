// set mon input a false par defaut
let defaultInput = {
  firstName: false,
  lastName: false,
  address: false,
  city: false,
  email: false,
};

// fonction pour controler la saisie du formulaire de commande
function controler() {
  // regex pour controler les champs
  let regexFistName = /^[a-zA-Z]{2,}$/;
  let regexLastName = /^[a-zA-Z]{2,}$/;
  let regexAddress = /^[a-zA-Z0-9]{2,}$/;
  let regexCity = /^[a-zA-Z]{2,}$/;
  let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // on recupere les champs du formulaire
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;
  // on controle les champs
  if (regexFistName.test(firstName)) {
    defaultInput.firstName = true;
  }
  if (regexLastName.test(lastName)) {
    defaultInput.lastName = true;
  }
  if (regexAddress.test(address)) {
    defaultInput.address = true;
  }
  if (regexCity.test(city)) {
    defaultInput.city = true;
  }
  if (regexEmail.test(email)) {
    defaultInput.email = true;
  }
  // on controle si tous les champs sont remplis
  if (
    defaultInput.firstName &&
    defaultInput.lastName &&
    defaultInput.address &&
    defaultInput.city &&
    defaultInput.email
  ) {
    msgError.textContent = "Veuillez saisir un prénom valide."; // affiche le msg d'erreur
    msgError.style.display = "block"; // affiche le msg d'erreur
    defaultInput.firstName = false; // met la variable de validation a false
  } else {
    // on valide le formulaire
    msgError.textContent = ""; // supprime le msg d'erreur
    msgError.style.display = "none"; // supprime le msg d'erreur
  }
}
