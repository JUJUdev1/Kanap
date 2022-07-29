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
  let founditem = cart.find(item => item.id === data.id && item.colors === data.colors);
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
  

