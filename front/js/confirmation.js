
let order = new URLSearchParams(document.location.search); // recuperer les données de l'url
let orderId = order.get("orderId"); // recuperer l'id de la commande

function displayOrderId() { // afficher l'id de la commande
    let orderDisplay = document.getElementById("orderId"); // recuperer l'id de la commande
    orderDisplay.textContent = orderId; // afficher l'id de la commande
    localStorage.removeItem("cart"); // supprimer le panier du localStorage
}
displayOrderId();