// récupérer l id items
const items = document.getElementById("items");


const main = async () => {
  
  // récupérer le fetch pour récuperer toute les données du produit
  const data = await basket.getApi();
  console.log('bravo Vous avez récupéré l api', data);

  // créer un élément HTML pour chaque produit dans une boucle
  data.forEach((products) => {
    let a = document.createElement("a");
    a.href = "./product.html?id=" + products._id;
    items.appendChild(a);

    let article = document.createElement("article");
    a.appendChild(article);

    let img = document.createElement("img");
    let lienImg = products.imageUrl;
    (img.src = lienImg), (img.alt = products.atlText);
    article.appendChild(img);

    let h3 = document.createElement("h3");
    h3.classList.add("productName");
    h3.textContent = products.name;
    article.appendChild(h3);

    let p = document.createElement("p");
    p.classList.add("productDescription");
    p.textContent = products.description;
    article.appendChild(p);
  });
};
main();
