const items = document.getElementById("items"); // récupérer l id items

const main = async () => { // créer une fonction main pour récupérer les données du produit

  const data = await basket.getApi(); // créer une variable data pour récupérer les données du produit dans ma classe basket
  
  data.forEach((products) => { // créer une boucle pour récupérer chaque produit dans la variable data

    // créer chaque element du dom comme indiqué dans le fichier html
    let a = document.createElement("a"); // créer un element a 
    a.href = "./product.html?id=" + products._id; // ajouter l'attribut href avec la valeur de l'id du produit
    items.appendChild(a); // ajouter l'element a dans l'element items

    let article = document.createElement("article"); // créer un element article
    a.appendChild(article); // ajouter l'element article dans l'element a

    let img = document.createElement("img"); // créer un element img
    let lienImg = products.imageUrl; // créer une variable lienImg pour récupérer l'url de l'image du produit
    (img.src = lienImg), (img.alt = products.atlText); // ajouter l'attribut src et alt de l'image du produit dans l'element img
    article.appendChild(img); // ajouter l'element img dans l'element article

    let h3 = document.createElement("h3"); // créer un element h3
    h3.classList.add("productName"); // ajouter la classe productName à l'element h3
    h3.textContent = products.name; // ajouter le nom du produit dans l'element h3
    article.appendChild(h3); // ajouter l'element h3 dans l'element article

    let p = document.createElement("p"); // créer un element p
    p.classList.add("productDescription"); // ajouter la classe productDescription à l'element p
    p.textContent = products.description; // ajouter la description du produit dans l'element p
    article.appendChild(p); // ajouter l'element p dans l'element article
  });
}; main(); // appeler la fonction main

