import { productApi } from "./http/product_config.js";

const cartItems = document.getElementById("cart__items");
const totalPrice = document.getElementById("totalPrice");
const totalQuantity = document.getElementById("totalQuantity");

// fonction qui va recuperer les données de chaque produit en fonction des produits dans le localStorage
async function displayAllProducts() {
  let cart = getCart();
  const data = await productApi.fetchAll();
  for (let cartItem of cart) {
    //creer un filter pour recuperer les données du produit en fonction de son id
    const product = data.filter((p) => p._id == cartItem.id);
    displayCart(product[0], cartItem);
  }
  return;
}

// récuperer les données du localStorage
function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

async function displayCart(product, cartItem) {
  let article = document.createElement("article");
  article.classList.add("cart__item");
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

  // fonction qui va supprimer le produit du localStorage

  // calculer le prix total du panier
  let total = 0;
  const data = await productApi.fetchAll();
  for (let cartItem of getCart()) {
    for (let product of data) {
      if (product._id === cartItem.id) {
        total += product.price * cartItem.quantity;
      }
    }
  }

  // calculer le nom total du panier
    let totalQuantitys = 0;
    for (let cartItem of getCart()) {
        totalQuantitys += cartItem.quantity;
    }
    

  // afficher le prix total du panier et le nom de l'article
  function displayTotalPriceArticle() {
    totalPrice.textContent = total;
    totalQuantity.textContent = totalQuantitys;
  }
  displayTotalPriceArticle();
}

displayAllProducts();
