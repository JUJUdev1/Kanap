// créer une class pour stocker mes fonctions et les utiliser
class Basket {
  constructor() {  // constructeur de ma class Basket
    let cart = localStorage.getItem("cart");   // recuperer le localStorage
    if (cart == null) { // si le localStorage est vide
      this.cart = []; // je créer un tableau vide
    } else { // sinon
      this.cart = JSON.parse(cart); // je recupere le localStorage
    }
  }
  // fonction pour recupérer l'api de tout les produits dans ma class Basket
  getApi() {
    return fetch("http://localhost:3000/api/products") // recuperer l'api de tout les produits
      .then((response) => response.json()) // recuperer le json de l'api
      .then((data) => data); // stocker le json dans une variable
  }

  // fonction pour recuperer l api de l id seulement
  getApiId(id) {
    return fetch(`http://localhost:3000/api/products/${id}`) // recuperer l'api de l'id seulement
      .then((response) => response.json()) // recuperer le json de l'api
      .then((data) => data); // stocker le json dans une variable
  }

  // fonction pour sauvegarder mon cart
  saveCart() { 
    localStorage.setItem("cart", JSON.stringify(this.cart)); // sauvegarder le cart dans le localStorage
  }

  // fonction pour supprimer un produit du localStorage
  deleteItem(id, color) {
    for (let i in this.cart) { // pour chaque element du cart
      if (this.cart[i].id === id && this.cart[i].color === color) { // si l'id et la couleur sont identiques
        this.cart.splice(i, 1); // supprimer l'element
        this.saveCart(); // sauvegarder le cart
      }
    }
  }

  // fonction pour ajouter un produit au localStorage
  updateQuantity(id, color, quantity) {
    for (let i in this.cart) { // pour chaque element du cart
      if (this.cart[i].id === id && this.cart[i].color === color) { // si l'id et la couleur sont identiques
        this.cart[i].quantity = quantity; // mettre la quantité a la nouvelle valeur
        this.saveCart(); // sauvegarder le cart
      }
    }
  }

  // fonction pour calculer le prix total du panier
  async getTotalPrice() {
    // calculer le prix total du panier
    let total = 0; // initialiser le prix total a 0
    const data = await basket.getApi(); // recuperer l'api de tout les produits
    for (let cartItem of basket.cart) { // pour chaque element du cart
      for (let product of data) { // pour chaque element de l'api
        if (product._id === cartItem.id) { // si l'id de l'api est identique a l'id du cart
          total += product.price * cartItem.quantity; // calculer le prix total
        }
      }
    }

    // calculer le nom total du panier
    let totalQuantitys = 0; // initialiser la quantité total a 0
    for (let cartItem of basket.cart) { // pour chaque element du cart
      totalQuantitys += cartItem.quantity; // calculer la quantité total
    }

    // afficher le prix total du panier et le nom de l'article
    function displayTotalPriceArticle() {
      totalPrice.textContent = total; // afficher le prix total
      totalQuantity.textContent = totalQuantitys; // afficher la quantité total
    }
    displayTotalPriceArticle(); 
  }
}
const basket = new Basket(); // créer une instance de ma class Basket
