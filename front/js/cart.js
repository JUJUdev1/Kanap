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

let regex = {
  firstName: /^([a-zA-Z,éêèàëÉÈÊË.'-]+[ ]?){2,}$/,
  lastName: /^([a-zA-Z,éêèàëÉÈÊË.'-]+[ ]?){2,}$/,
  address: /(^.{1,}[a-zA-ZÀ-ÿ0-9]+$)/,
  city: /(^([a-zA-Z,éêèàëÉÈÊË.'-]+[ ]?){2,}$)/,
  email: /(^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-zA-Z]{2,4}$)/,
};
// creer des message d'erreur pour chaque input
function controler(input, idForMsgError, regex) {
  input.addEventListener("input", function (event) {
    let ElementInput = event.target.value;
    let valid = regex.test(ElementInput);
    let msgError = document.getElementById(idForMsgError);
    if (!valid) {
      msgError.textContent = `Veuillez entrer un ${input.name} valide`;
      msgError.style.display = "block";
      defaultInput[input] = false;
    } else {
      msgError.style.display = "none";
      defaultInput[input] = true;
    }
  });
}
controler(firstName, "firstNameErrorMsg", regex.firstName);
controler(lastName, "lastNameErrorMsg", regex.lastName);
controler(address, "addressErrorMsg", regex.address);
controler(city, "cityErrorMsg", regex.city);
controler(email, "emailErrorMsg", regex.email);

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
    if (firstName && lastName && address && city && email) {
      event.preventDefault();
      if (
        defaultInput.firstName &&
        defaultInput.lastName &&
        defaultInput.address &&
        defaultInput.city &&
        defaultInput.email
      ) {
        basket.sendContact(contact);
        console.log(contact);
      }
    }
  });
}
sendForm(); // appelle la fonction sendForm
//////////////////////////////////////////////////////////////////END//////////////////////////////////////////////////////////////////////////////

displayAllProducts(); // appelle la fonction displayAllProducts

// https://jsbin.com/keqinisiro/edit?js,console
