function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
  let cart = localStorage.getItem("cart");
  if ((cart = null)) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

// 
function addToCart(id) {
  let cart = getCart();
  let founditem = cart.find(item => item.id === id.id && item.colors === id.colors);
  if (founditem) {
    founditem.quantity += id.quantity;
  } else {
    cart.push(id);
  }
  saveCart(cart);
  addToCart();
}

// test
console.log('test');
  

