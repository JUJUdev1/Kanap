const img = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
const quantity = document.getElementById("quantity");

// Récuperer les paramétres de l'url
let str = window.location;
let url = new URL(str);
let id = url.searchParams.get("id");
console.log(id);

let host = "http://localhost:3000/";
let idUrl = host + "api/products/" + id;

// Récuperer les données du produit
fetch(idUrl).then((response) => {
  if (response.ok) {
    response.json().then((id) => {
      console.log(id);

      // changer le titre du document
      document.querySelector("title").textContent = id.name;
      // Insérer un produit et ses détails dans la page Produit
      let img2 = document.createElement("img");
      img.appendChild(img2);
      img2.src = id.imageUrl;
      img2.alt = id.altTxt;

      title.textContent = id.name;
      price.textContent = id.price;
      description.textContent = id.description;

      id.colors.forEach((color) => {
        let option = document.createElement("option");
        option.textContent = color;
        option.value = color;
        colors.appendChild(option);
      });

      // Ajouter un produit au panier
      let addToCart = document.getElementById("addToCart");
      addToCart.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart"));

        // si le produits est déjà dans le panier on augmente la quantité
        if (cart) {
          let founditem = cart.find(item => item.id === id.id && item.colors === id.colors);
          if (founditem) {
            founditem.quantity += quantity.value;
          } else {
            cart.push({
              id: id.id,
              colors: id.colors,
              quantity: (quantity.value),
            });
          }
        }

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
          if (cart === null) {
            cart = [];
          }
          cart.push({
            id: id.id,
            name: id.name,
            color: colors.value,
            quantity: quantity.value,
          });

          localStorage.setItem("cart", JSON.stringify(cart));
          return alert("Le produit a été ajouté au panier");
        }
        console.log(cart);
      });
    });
  }
});
