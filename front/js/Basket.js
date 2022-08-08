// créer une class pour stocker mes fonctions et les utiliser
class Basket {
  constructor() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
      this.cart = [];
    } else {
      this.cart = JSON.parse(cart);
    }
  }
  // fonction pour recupérer l'api de tout les produits dans ma class Basket
  getApi() {
    return fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => data);
  }

  getApiId(id) {
    return fetch(`http://localhost:3000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => data);
  }

  // fonction pour sauvegarder mon cart
  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  // fonction pour supprimer un produit du localStorage
  deleteItem(id, color) {
    for (let i in this.cart) {
      if (this.cart[i].id === id && this.cart[i].color === color) {
        this.cart.splice(i, 1);
        this.saveCart();
      }
    }
  }

  // fonction pour ajouter un produit au localStorage
  updateQuantity(id, color, quantity) {
    for (let i in this.cart) {
      if (this.cart[i].id === id && this.cart[i].color === color) {
        this.cart[i].quantity = quantity;
        this.saveCart();
      }
    }
  }

  // fonction pour calculer le prix total du panier
  async getTotalPrice() {
    // calculer le prix total du panier
    let total = 0;
    const data = await basket.getApi();
    for (let cartItem of basket.cart) {
      for (let product of data) {
        if (product._id === cartItem.id) {
          total += product.price * cartItem.quantity;
        }
      }
    }

    // calculer le nom total du panier
    let totalQuantitys = 0;
    for (let cartItem of basket.cart) {
      totalQuantitys += cartItem.quantity;
    }

    // afficher le prix total du panier et le nom de l'article
    function displayTotalPriceArticle() {
      totalPrice.textContent = total;
      totalQuantity.textContent = totalQuantitys;
    }
    displayTotalPriceArticle();
  }
}
const basket = new Basket();
