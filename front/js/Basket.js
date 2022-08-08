// créer une class pour stocker mes fonctions et les utiliser
class Basket {
  constructor() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
      this.cart = [];
    } else {
      this.cart = JSON.parse(cart);
    }
    console.log("Vous avez recuperer le cart bravo", cart);
  }
  // fonction pour recupérer l'api de tout les produits dans ma class Basket 
  getApi() {
    return fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => data);
  }
}

const basket = new Basket();
