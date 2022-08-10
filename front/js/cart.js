// récuperer les classes et id
const cartItems = document.getElementById("cart__items");
const totalPrice = document.getElementById("totalPrice");
const totalQuantity = document.getElementById("totalQuantity");
const form = document.querySelector("cart__order__form");

// fonction qui va recuperer les données de chaque produit en fonction des produits dans le localStorage
async function displayAllProducts() {
  const data = await basket.getApi();
  for (let cartItem of basket.cart) {
    //creer un filter pour recuperer les données du produit en fonction de son id
    const product = data.filter((p) => p._id == cartItem.id);
    displayCart(product[0], cartItem);
  }
  return;
}

// fonction pour display les données du localStorage dans la page cart
async function displayCart(product, cartItem) {
  let article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = cartItem.id;
  article.dataset.color = cartItem.color;
  cartItems.appendChild(article);

  let divCartItemImg = document.createElement("div");
  divCartItemImg.classList.add("cart__item__img");
  article.appendChild(divCartItemImg);

  let imgCartItem = document.createElement("img");
  imgCartItem.src = product.imageUrl;
  imgCartItem.alt = product.altTxt;
  divCartItemImg.appendChild(imgCartItem);

  let divCartItemContent = document.createElement("div");
  divCartItemContent.classList.add("cart__item__content");
  article.appendChild(divCartItemContent);

  let cartItemContentDescription = document.createElement("div");
  cartItemContentDescription.classList.add("cart__item__content__description");
  divCartItemContent.appendChild(cartItemContentDescription);

  let nomDuProduit = document.createElement("h2");
  nomDuProduit.textContent = product.name;
  cartItemContentDescription.appendChild(nomDuProduit);

  let couleurDuProduit = document.createElement("p");
  couleurDuProduit.textContent = cartItem.color;
  cartItemContentDescription.appendChild(couleurDuProduit);

  let prixDuProduit = document.createElement("p");
  prixDuProduit.textContent = product.price + " €";
  cartItemContentDescription.appendChild(prixDuProduit);

  let cartItemContentSettings = document.createElement("div");
  cartItemContentSettings.classList.add("cart__item__content__settings");
  divCartItemContent.appendChild(cartItemContentSettings);

  let cartItemContentSettingsQuantity = document.createElement("div");
  cartItemContentSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

  let cartItemContentSettintgsQuantityP = document.createElement("p");
  cartItemContentSettintgsQuantityP.textContent = "Qté :";
  cartItemContentSettingsQuantity.appendChild(
    cartItemContentSettintgsQuantityP
  );

  let cartItemContentSettingsQuantityInput = document.createElement("input");
  cartItemContentSettingsQuantityInput.classList.add("itemQuantity");
  cartItemContentSettingsQuantityInput.type = "number";
  cartItemContentSettingsQuantityInput.value = cartItem.quantity;
  cartItemContentSettingsQuantityInput.min = "1";
  cartItemContentSettingsQuantityInput.max = "100";
  cartItemContentSettingsQuantityInput.name = "itemQuantity";
  cartItemContentSettingsQuantity.appendChild(
    cartItemContentSettingsQuantityInput
  );

  let cartItemContentSettingsDelete = document.createElement("div");
  cartItemContentSettingsDelete.classList.add(
    "cart__item__content__settings__delete"
  );
  cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

  let cartItemContentP = document.createElement("p");
  cartItemContentP.classList.add("deleteItem");
  cartItemContentP.textContent = "Supprimer";
  cartItemContentSettingsDelete.appendChild(cartItemContentP);

  // fonction pour supprimer un produit au click
  cartItemContentP.addEventListener("click", function () {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      basket.deleteItem(cartItem.id, cartItem.color);
    }
  });

  // fonction pour modifier la quantité d'un produit dans le localStorage
  cartItemContentSettingsQuantityInput.addEventListener("change", function () {
    basket.updateQuantity();
  });

  // fonction pour calculer le prix total du panier
  basket.getTotalPrice();
}

/* ***************************************************Regex et control du formulaire************************************************************* */

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
  // regex pour le nom
  const regexName = /(^.{1,}[a-zA-ZÀ-ÿ]+$)/;
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const address = document.getElementById("address");
  // fonction listener pour le nom
  firstName.addEventListener("input", function (event) {
    let nameInput = event.target.value; // recupere la valeur de l'input
    let Valid = regexName.test(nameInput); // teste la regex
    let msgError = document.getElementById("firstNameErrorMsg"); // recupere le msg d'erreur
    if (Valid === false) {
      // si la regex ne correspond pas
      msgError.textContent = "Veuillez saisir un prénom valide."; // affiche le msg d'erreur
      msgError.style.display = "block"; // affiche le msg d'erreur
      defaultInput.firstName = false; // met la variable de validation a false
    } else {
      // si la regex correspond
      defaultInput.firstName = true; // met la variable de validation a true
      msgError.style.display = "none"; // cache le msg d'erreur
    }
  });

  // fonction listener pour le Prénom
  lastName.addEventListener("input", function (event) {
    let nameInput = event.target.value; // recupere la valeur de l'input
    let Valid = regexName.test(nameInput); // teste la regex
    let msgError = document.getElementById("lastNameErrorMsg"); // recupere le msg d'erreur
    if (Valid === false) {
      // si la regex ne correspond pas
      msgError.textContent = "Veuillez saisir un nom valide."; // affiche le msg d'erreur
      msgError.style.display = "block"; // affiche le msg d'erreur
      defaultInput.lastName = false; // met la variable de validation a false
    } else {
      // si la regex correspond
      defaultInput.lastName = true; // met la variable de validation a true
      msgError.style.display = "none"; // cache le msg d'erreur
    }
  });

  // fonction listener pour l'adresse
  address.addEventListener("input", function (event) {
    let addressInput = event.target.value; // recupere la valeur de l'input
    let Valid = /(^.{1,}[a-zA-ZÀ-ÿ0-9]+$)/.test(addressInput); // teste la regex
    let msgError = document.getElementById("addressErrorMsg"); // recupere le msg d'erreur
    if (Valid === false) {
      // si la regex ne correspond pas
      msgError.textContent = "Veuillez saisir une adresse valide."; // affiche le msg d'erreur
      msgError.style.display = "block"; // affiche le msg d'erreur
      defaultInput.address = false; // met la variable de validation a false
    } else {
      // si la regex correspond
      defaultInput.address = true; // met la variable de validation a true
      msgError.style.display = "none"; // cache le msg d'erreur
    }
  });

  // fonction listener pour la ville
  city.addEventListener("input", function (event) {
    let cityInput = event.target.value; // recupere la valeur de l'input
    let Valid = /(^.{1,}[a-zA-ZÀ-ÿ]+$)/.test(cityInput); // teste la regex
    let msgError = document.getElementById("cityErrorMsg"); // recupere le msg d'erreur
    if (Valid === false) {
      // si la regex ne correspond pas
      msgError.textContent = "Veuillez saisir une ville valide."; // affiche le msg d'erreur
      msgError.style.display = "block"; // affiche le msg d'erreur
      defaultInput.city = false; // met la variable de validation a false
    } else {
      // si la regex correspond
      defaultInput.city = true; // met la variable de validation a true
      msgError.style.display = "none"; // cache le msg d'erreur
    }
  });

  // fonction listener pour l'email
  email.addEventListener("input", function (event) {
    let emailInput = event.target.value; // recupere la valeur de l'input
    let Valid = /(^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-zA-Z]{2,4}$)/.test(
      emailInput
    ); // teste la regex
    let msgError = document.getElementById("emailErrorMsg"); // recupere le msg d'erreur
    if (Valid === false) {
      // si la regex ne correspond pas
      msgError.textContent = "Veuillez saisir une adresse email valide."; // affiche le msg d'erreur
      msgError.style.display = "block"; // affiche le msg d'erreur
      defaultInput.email = false; // met la variable de validation a false
    } else {
      // si la regex correspond
      defaultInput.email = true; // met la variable de validation a true
      msgError.style.display = "none"; // cache le msg d'erreur
    }
  });
}
controler();
displayAllProducts();
