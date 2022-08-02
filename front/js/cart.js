import { productApi } from "./http/product_config.js";

const cartItems = document.getElementById("cart__items");

// fonction qui va recuperer les données de chaque produit en fonction des produits dans le localStorage
async function displayAllProducts() {
  let cart = getCart();
  const data = await productApi.fetchAll();
  for (let cartItem of cart) {
    //creer un filter pour recuperer les données du produit en fonction de son id
    const product = data.filter(p => p._id == cartItem.id);
    displayCart(product[0], cartItem);
  }
  return
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
    divCartItemImg.appendChild(imgCartItem);

    let divCartItemContent = document.createElement("div");
    divCartItemContent.classList.add("cart__item__content");
    article.appendChild(divCartItemContent);

    let cartItemContentDescription = document.createElement("div");
    cartItemContentDescription.classList.add(
      "cart__item__content__description"
    );
    divCartItemContent.appendChild(cartItemContentDescription);

    let nomDuProduit = document.createElement("h2");
    cartItemContentDescription.appendChild(nomDuProduit);

    let couleurDuProduit = document.createElement("p");
    cartItemContentDescription.appendChild(couleurDuProduit);

    let prixDuProduit = document.createElement("p");
    cartItemContentDescription.appendChild(prixDuProduit);

    let cartItemContentSettings = document.createElement("div");
    divCartItemContent.appendChild(cartItemContentSettings);

    let cartItemContentSettingsQuantity = document.createElement("div");
    cartItemContentSettings = cartItemContentSettingsQuantity;

    let cartItemContentSettintgsQuantityP = document.createElement("p");
    cartItemContentSettingsQuantity.appendChild(
      cartItemContentSettintgsQuantityP
    );

    let cartItemContentSettingsQuantityInput = document.createElement("input");
    cartItemContentSettingsQuantity.appendChild(
      cartItemContentSettingsQuantityInput
    );

    let cartItemContentSettingsDelete = document.createElement("div");
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

    let cartItemContentP = document.createElement("p");
    // cartItemContentP = ('Qté : ' + cartItem.quantity);
    cartItemContentSettings.appendChild(cartItemContentP);
}

displayCart();
displayAllProducts();