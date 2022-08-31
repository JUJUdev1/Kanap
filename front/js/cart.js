// récuperer les classes et id
const cartItems = document.getElementById("cart__items");
const totalPrice = document.getElementById("totalPrice");
const totalQuantity = document.getElementById("totalQuantity");
const form = document.querySelector("cart__order__form");

/* ***************************************************Display de mes produits******************************************************************** */
// fonction qui va recuperer les données de chaque produit en fonction des produits dans le localStorage
async function displayAllProducts() {
  const data = await basket.getApi(); // recuperer les données de l'api
  for (let cartItem of basket.cart) {
    // pour chaque produit dans le localStorage
    //creer un filter pour recuperer les données du produit en fonction de son id
    const product = data.filter((p) => p._id == cartItem.id);
    displayCart(product[0], cartItem); // afficher le produit
  }
  return; // retourner la fonction
}
//////////////////////////////////////////////////////////////////END//////////////////////////////////////////////////////////////////////////////

/* ***************************************************Display de mon cart*********************************************************************** */
// fonction pour display les données du localStorage dans la page cart
async function displayCart(product, cartItem) {
  let article = document.createElement("article"); // creer un article
  article.classList.add("cart__item"); // ajouter la class cart__item
  article.dataset.id = cartItem.id; // ajouter un data-id pour le stocker dans le localStorage
  article.dataset.color = cartItem.color; // ajouter un data-color pour le stocker dans le localStorage
  cartItems.appendChild(article); // ajouter l'article dans le cart__items

  let divCartItemImg = document.createElement("div"); // creer un div
  divCartItemImg.classList.add("cart__item__img"); // ajouter la class cart__item__img
  article.appendChild(divCartItemImg); // ajouter le div dans l'article

  let imgCartItem = document.createElement("img"); // creer une image
  imgCartItem.src = product.imageUrl; // ajouter le src de l'image
  imgCartItem.alt = product.altTxt; // ajouter l'alt de l'image
  divCartItemImg.appendChild(imgCartItem); // ajouter l'image dans le div

  let divCartItemContent = document.createElement("div"); // creer un div
  divCartItemContent.classList.add("cart__item__content"); // ajouter la class cart__item__content
  article.appendChild(divCartItemContent); // ajouter le div dans l'article

  let cartItemContentDescription = document.createElement("div"); // creer un div
  cartItemContentDescription.classList.add("cart__item__content__description"); // ajouter la class cart__item__content__description
  divCartItemContent.appendChild(cartItemContentDescription); // ajouter le div dans le div cart__item__content

  let nomDuProduit = document.createElement("h2"); // creer un h2
  nomDuProduit.textContent = product.name; // ajouter le nom du produit
  cartItemContentDescription.appendChild(nomDuProduit); // ajouter le h2 dans le div cart__item__content__description

  let couleurDuProduit = document.createElement("p"); // creer un p
  couleurDuProduit.textContent = cartItem.color; // ajouter la couleur du produit
  cartItemContentDescription.appendChild(couleurDuProduit); // ajouter le p dans le div cart__item__content__description

  let prixDuProduit = document.createElement("p"); // creer un p
  prixDuProduit.textContent = product.price + " €"; // ajouter le prix du produit
  cartItemContentDescription.appendChild(prixDuProduit); // ajouter le p dans le div cart__item__content__description

  let cartItemContentSettings = document.createElement("div"); // creer un div
  cartItemContentSettings.classList.add("cart__item__content__settings"); // ajouter la class cart__item__content__settings
  divCartItemContent.appendChild(cartItemContentSettings); // ajouter le div dans le div cart__item__content

  let cartItemContentSettingsQuantity = document.createElement("div"); // creer un div
  cartItemContentSettingsQuantity.classList.add(
    // ajouter la class cart__item__content__settings__quantity
    "cart__item__content__settings__quantity"
  );
  cartItemContentSettings.appendChild(cartItemContentSettingsQuantity); // ajouter le div dans le div cart__item__content__settings

  let cartItemContentSettintgsQuantityP = document.createElement("p"); // creer un p
  cartItemContentSettintgsQuantityP.textContent = "Qté :"; // ajouter le texte "Qté :"
  cartItemContentSettingsQuantity.appendChild(
    // ajouter le p dans le div cart__item__content__settings__quantity
    cartItemContentSettintgsQuantityP
  );

  let cartItemContentSettingsQuantityInput = document.createElement("input"); // creer un input
  cartItemContentSettingsQuantityInput.classList.add("itemQuantity"); // ajouter la class itemQuantity
  cartItemContentSettingsQuantityInput.type = "number"; // ajouter le type number
  cartItemContentSettingsQuantityInput.value = cartItem.quantity; // ajouter la quantité du produit dans le input
  cartItemContentSettingsQuantityInput.min = "1"; // ajouter le min à 1
  cartItemContentSettingsQuantityInput.max = "100"; // ajouter le max à 100
  cartItemContentSettingsQuantityInput.name = "itemQuantity"; // ajouter le name à itemQuantity
  cartItemContentSettingsQuantity.appendChild(
    // ajouter le input dans le div cart__item__content__settings__quantity
    cartItemContentSettingsQuantityInput
  );

  let cartItemContentSettingsDelete = document.createElement("div"); // creer un div
  cartItemContentSettingsDelete.classList.add(
    // ajouter la class cart__item__content__settings__delete
    "cart__item__content__settings__delete"
  );
  cartItemContentSettings.appendChild(cartItemContentSettingsDelete); // ajouter le div dans le div cart__item__content__settings

  let cartItemContentP = document.createElement("p"); // creer un p
  cartItemContentP.classList.add("deleteItem"); // ajouter la class deleteItem
  cartItemContentP.textContent = "Supprimer"; // ajouter le texte "Supprimer"
  cartItemContentSettingsDelete.appendChild(cartItemContentP); // ajouter le p dans le div cart__item__content__settings__delete

  // fonction pour supprimer un produit au click
  cartItemContentP.addEventListener("click", function () {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      // si on clique sur "oui"
      basket.deleteItem(cartItem.id, cartItem.color); // on supprime le produit du localStorage
    }
    displayAllProducts(); // on affiche les produits
    basket.getTotalPrice(); // on calcule le prix total du panier
  });

  // fonction pour modifier la quantité d'un produit dans le localStorage
  cartItemContentSettingsQuantityInput.addEventListener(
    "change",
    function (event) {
      // au changement de la quantité
      const findParent = event.target.closest("article"); // on cherche le parent de l'input
      const dataId = findParent.dataset.id; // on recupere l'id du produit
      const dataColor = findParent.dataset.color; // on recupere la couleur du produit
      const Quantities = parseInt(event.target.value); // on recupere la quantité du produit
      basket.updateQuantity(dataId, dataColor, Quantities); // on appelle la fonction updateQuantity
      basket.getTotalPrice(); // on calcule le prix total du panier
    }
  );

  // fonction pour calculer le prix total du panier
  basket.getTotalPrice();
}
//////////////////////////////////////////////////////////////////END//////////////////////////////////////////////////////////////////////////////

/* ***************************************************Regex et control du formulaire************************************************************ */
let defaultInput = {
  firstName: false,
  lastName: false,
  address: false,
  city: false,
  email: false,
};

// creer les prametres de chaque input du formulaire et les ajouter dans un objet
let inputParameters = {
  firstName: {
    regex: /^([a-zA-Z,éêèàëÉÈÊË.'-]+[ ]?){2,}$/, // regex pour le nom
    error: "Veuillez entrer un prénom valide", // message d'erreur
  },
  lastName: {
    regex: /^([a-zA-Z,éêèàëÉÈÊË.'-]+[ ]?){2,}$/,  // regex pour le nom
    error: "Veuillez entrer un nom valide", // message d'erreur
  },
  address: {
    regex: /(^.{1,}[a-zA-ZÀ-ÿ0-9]+$)/, // regex pour l'adresse
    error: "Veuillez entrer une adresse valide", // message d'erreur
  },
  city: {
    regex: /(^([a-zA-Z,éêèàëÉÈÊË.'-]+[ ]?){2,}$)/, // regex pour la ville
    error: "Veuillez entrer une ville valide", // message d'erreur
  },
  email: {
    regex: /(^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-zA-Z]{2,4}$)/, // regex pour l'email
    error: "Veuillez entrer un email valide", // message d'erreur
  },
  }


// creer des message d'erreur pour chaque input
function controler(input, idForMsgError, inputParameters) { // on passe en parametre l'input, l'id du message d'erreur et l'objet inputParameters
  input.addEventListener("input", function (event) { // au changement de l'input
    let ElementInput = event.target.value; // on recupere la valeur de l'input
    let valid = inputParameters.regex.test(ElementInput); // on test la regex avec la valeur de l'input
    let msgErrorr = document.getElementById(idForMsgError); // on recupere le message d'erreur
    if (!valid) { // si la regex ne correspond pas
      msgErrorr.textContent = `${inputParameters.error}`; // on affiche le message d'erreur
      msgErrorr.style.display = "block"; 
      defaultInput = false; // on change la valeur de l'input dans l'objet defaultInput

      console.log('ici',defaultInput);
    } else {
      msgErrorr.style.display = "none"; // on cache le message d'erreur
      defaultInput = true; // on change la valeur de l'input dans l'objet defaultInput
      console.log('la', defaultInput);
    }
  });
}
controler(firstName, "firstNameErrorMsg", inputParameters.firstName); // on appelle la fonction controler pour le premier input
controler(lastName, "lastNameErrorMsg", inputParameters.lastName); // on appelle la fonction controler pour le second input
controler(address, "addressErrorMsg", inputParameters.address); // on appelle la fonction controler pour le troisieme input
controler(city, "cityErrorMsg", inputParameters.city); // on appelle la fonction controler pour le quatrieme input
controler(email, "emailErrorMsg", inputParameters.email); // on appelle la fonction controler pour le cinquieme input

/* ***************************************************Envoi du formulaire*********************************************************************** */
// fonction pour envoyer le formulaire
function sendForm() {
  const order = document.getElementById("order"); // recupere le formulaire
  order.addEventListener("click", function (event) {
    // ecoute le click sur le bouton de commande
    const firstName = document.getElementById("firstName").value; // recupere le prénom
    const lastName = document.getElementById("lastName").value; // recupere le nom
    const address = document.getElementById("address").value; // recupere l'adresse
    const city = document.getElementById("city").value; // recupere la ville
    const email = document.getElementById("email").value; // recupere l'email
    const contact = {
      // crée un objet contact
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    };

    // si un message d'erreur est affiché
    if (
      firstNameErrorMsg.style.display == "block" ||
      lastNameErrorMsg.style.display == "block" ||
      addressErrorMsg.style.display == "block" ||
      cityErrorMsg.style.display == "block" ||
      emailErrorMsg.style.display == "block" ||
      basket.alertEmptyCart() // si le panier est vide
    ) {
      event.preventDefault(); // on empeche l'envoi du formulaire
    }
    // sinon on envoi le formulaire
    else {
      basket.sendContact(contact); // on appelle la fonction sendContact
    }
  });
}
sendForm(); // appelle la fonction sendForm
//////////////////////////////////////////////////////////////////END//////////////////////////////////////////////////////////////////////////////

displayAllProducts(); // appelle la fonction displayAllProducts
