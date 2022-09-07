const img = document.querySelector(".item__img"); // récupérer l'element img
const title = document.getElementById("title"); // récupérer l'element title
const price = document.getElementById("price"); // récupérer l'element price
const description = document.getElementById("description"); // récupérer l'element description
const colors = document.getElementById("colors"); // récupérer l'element colors
const quantity = document.getElementById("quantity"); // récupérer l'element quantity

const main = async () => { // créer une fonction main pour récupérer les données du produit

  let params = new URLSearchParams(document.location.search); // créer une variable params pour récupérer 
  let idParams = params.get("id");                            // l'id du produit dans l'url

  // créer une variable data pour récupérer les données du produit dans ma classe basket
  const data = await basket.getApiId(idParams); 

  document.querySelector("title").textContent = data.name;  // changer le titre du document

  // Insérer un produit et ses détails dans la page Produit
  let img2 = document.createElement("img"); // créer un element img
  img.appendChild(img2); // ajouter l'element img dans l'element img
  img2.src = data.imageUrl; // ajouter l'attribut src de l'image du produit dans l'element img
  img2.alt = data.altTxt; // ajouter l'attribut alt de l'image du produit dans l'element img

  title.textContent = data.name; // ajouter le nom du produit dans l'element title
  price.textContent = data.price; // ajouter le prix du produit dans l'element price
  description.textContent = data.description; // ajouter la description du produit dans l'element description

  data.colors.forEach((color) => { // créer une boucle pour récupérer chaque couleur dans la variable data
    let option = document.createElement("option"); // créer un element option
    option.textContent = color; // ajouter la couleur du produit dans l'element option
    option.value = color; // ajouter la valeur de la couleur du produit dans l'element option
    colors.appendChild(option); // ajouter l'element option dans l'element colors
  });

 
  function compare(product) { // créer une fonction compare pour comparer les produits
    let cart = basket.cart; // créer une variable cart pour récupérer le panier
    for (let i in cart) { // créer une boucle pour comparer les produits
      let productInCart = cart[i]; // créer une variable productInCart pour récupérer le produit dans le panier
      if ( // si le produit dans le panier est égal au produit dans la page produit
        productInCart.id === product.id &&
        productInCart.color === product.color
      ) {
        productInCart.quantity = product.quantity + productInCart.quantity; // alors on additionne la quantité du produit dans
        // le panier avec la quantité du produit dans la page produit

        basket.saveCart(); // on sauvegarde le panier en récupérant la fonction saveCart de la classe basket  
        return; // on quitte la fonction compare
      }
    }
    cart.push(product); // sinon on ajoute le produit dans le panier
    basket.saveCart(); // on sauvegarde le panier en récupérant la fonction saveCart de la classe basket
    return; // on quitte la fonction compare
  }

  
  function addEventListener() { // fonction pour ajouter un produit au panier 
    let addToCart = document.getElementById("addToCart"); // créer une variable addToCart pour récupérer l'element addToCart
    addToCart.addEventListener("click", () => { // ajouter un événement click sur l'element addToCart
      const product = { // créer une variable product pour récupérer les données du produit dans la page produit
        id: data._id, 
        color: colors.value,
        quantity: parseInt(quantity.value), 
      }; 

      
      if (colors.value === "") { // si la couleurs est vide alors on affiche un message d'erreur
        return alert("Veuillez choisir une couleur");
      }

      
      if (quantity.value <= 0) { // si la quandité est vide on affiche un message d'erreur
        return alert("Veuillez choisir une quantité valide");
      }
      if (quantity.value > 100) { // si la quandité est supérieure à 100 on affiche un message d'erreur
        return alert("Veuillez choisir une quantité entre 1 et 100");
      }
      
      if (quantity.value > 0 && colors.value !== "") { // si la quantité est supérieur à 0 et la couleur est non vide 
        compare(product);// alors on ajoute le produit au panier en récupérant la fonction compare
        return alert("Le produit a été ajouté au panier"); // on affiche un message de confirmation
      }
    });
  }
  addEventListener(); // on appelle la fonction addEventListener
};
main(); // on appelle la fonction main
