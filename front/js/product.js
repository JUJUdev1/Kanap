// importer la config de l API
import { productApi } from "./http/product_config.js";

// récupérer l id items et leur class
const img = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
const quantity = document.getElementById("quantity");

// récupérer le fetch pour récuperer les données par produit en fonction de l id
(async () => {
  const params = new URLSearchParams(window.location.search);
  const data = await productApi.fetch(params.get("id"));

  // changer le titre du document
  document.querySelector("title").textContent = data.name;

  // Insérer un produit et ses détails dans la page Produit
  let img2 = document.createElement("img");
  img.appendChild(img2);
  img2.src = data.imageUrl;
  img2.alt = data.altTxt;

  title.textContent = data.name;
  price.textContent = data.price;
  description.textContent = data.description;

  data.colors.forEach((color) => {
    let option = document.createElement("option");
    option.textContent = color;
    option.value = color;
    colors.appendChild(option);
  });

  // créer une fonction pour récuperer le localStorage
  function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
      return [];
    } else {
      return JSON.parse(cart);
    }
  }

  // si on ajoute un produit identique au panier alors on additionne la quantité du panier sinon on ajoute le produit au panier
  function compare(product) {
    let cart = getCart();
    for (let i in cart) {
      let productInCart = cart[i];
      if (
        productInCart.id === product.id &&
        productInCart.color === product.color
      ) {
        productInCart.quantity = product.quantity + productInCart.quantity;
        saveCart(cart);
        return;
      }
    }
    cart.push(product);
    saveCart(cart);
    return;
  }

  // sauvegarder le panier dans le localStorage
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // fonction pour ajouter un produit au panier
  function addEventListener() {
    let addToCart = document.getElementById("addToCart");
    addToCart.addEventListener("click", () => {
      const product = {
        id: data._id,
        color: colors.value,
        quantity: parseInt(quantity.value),
      };

      // si la couleurs est vide alors on affiche un message d'erreur
      if (colors.value === "") {
        return alert("Veuillez choisir une couleur");
      }

      // si la quandité est vide alors on affiche un message d'erreur
      if (quantity.value <= 0) {
        return alert("Veuillez choisir une quantité");
      }
      // si la quantité est supérieur à 0 et la couleur est non vide alors on ajoute le produit au panier
      if (quantity.value > 0 && colors.value !== "") {
        compare(product);
        return alert("Le produit a été ajouté au panier");
      }
      console.log(cart);
    });
  }
  addEventListener();
})();
