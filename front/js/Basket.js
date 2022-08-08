// créer une class pour stocker mes fonctions et les utiliser
class Basket {
  constructor() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
      this.basket = [];
    } else {
      this.basket = JSON.parse(basket);
    }
    // fonction pour recupérer l'api de tout les produits
  }
  getApi() {
    return fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => data);
  }
  
}
const basket = new Basket();
// console.log('here', getApi);
console.log('here', basket);