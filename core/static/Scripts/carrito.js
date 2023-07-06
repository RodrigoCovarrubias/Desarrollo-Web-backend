function changeQuantity(btn, increment) {
    var card = btn.closest('.card-body'); 
    var quantityInput = card.querySelector('.quantity-input');
    var currentQuantity = parseInt(quantityInput.value);
    var newQuantity = increment ? currentQuantity + 1 : currentQuantity - 1;
    newQuantity = Math.max(newQuantity, 1);
    quantityInput.value = newQuantity;
 }
 function incrementQuantity(btn) {
    changeQuantity(btn, true);
 }
 function decrementQuantity(btn) {
    changeQuantity(btn, false);
 }

 function addToCart(btn) {
    var productId = btn.getAttribute('data-productid');
    var quantityInput = btn.closest('.card-body').querySelector('.quantity-input');
    var quantity = parseInt(quantityInput.value);
  
    // Retrieve cart from localStorage
    var cart = JSON.parse(localStorage.getItem('cart')) || {};
  
    // Fetch product details from the server
    fetch('/api/product/' + productId + '/')
      .then(response => response.json())
      .then(data => {
        var product = data.product;
  
        // Update cart with the new product and quantity
        cart[productId] = {
          name: product.nombreProducto,
          quantity: quantity
        };
  
        // Save updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
  
        // Show success message or perform any other desired actions
        alert('Product added to cart successfully!');
      })
      .catch(error => {
        console.error(error);
      });
  }