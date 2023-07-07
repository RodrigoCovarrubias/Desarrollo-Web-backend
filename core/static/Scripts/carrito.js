
function incrementQuantity(btn) {
    var quantityInput = btn.closest('.card-body').querySelector('.quantity-input');
    var quantity = parseInt(quantityInput.value);
    quantity++;
    quantityInput.value = quantity;
}

function decrementQuantity(btn) {
    var quantityInput = btn.closest('.card-body').querySelector('.quantity-input');
    var quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
    }
}
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

var shoppingCart = (function() {

    cart = [];
    
    // Constructor
    function Item(id,name, price, count,img) {
      this.id=id;
      this.name = name;
      this.price = price;
      this.count = count;
      this.rutaImg = img
    }

    function comprar(){
        var data ={cart:this.cart};
        fetch('/comprar/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(result => {
              // Process the response from the backend
              if (result.success) {
                // Cart data was successfully processed, update the stock on the frontend
                updateStock();
                // Clear the cart
                cart = [];
                saveCart();
                // Display success message or perform other actions
                console.log('Cart checkout successful');
              } else {
                // Display error message or handle the error case
                console.error('Cart checkout failed');
              }
            })
            .catch(error => {
              // Handle any error that occurred during the request
              console.error('Error:', error);
            });
    }

    
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
      
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    obj.comprarItem=function comprar(){
        var data ={cart:cart};
        fetch('/comprar/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(result => {
              if (result.success) {             
                cart = [];
                saveCart();
                $('#popup').modal('show');
                // location.reload()
              } else {
                console.error('Compra rechazada');
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
    }
    
    obj.addItemToCart = function(id, name, price, count, cantidad,img) {
        fetch(`api/validaproducto/${id}`)
          .then(response => response.json())
          .then(data => {
            let currentQuantityInCart = 0;
            for (var item in cart) {
              if (cart[item].name === name) {
                currentQuantityInCart = cart[item].count;
                break;
              }
            }
            if (data.stock >= currentQuantityInCart + cantidad) {
              for (var item in cart) {
                if (cart[item].name === name) {
                  cart[item].count += cantidad;
                  saveCart();
                  displayCart();
                  return;
                }
              }
              var item = new Item(id, name, price, cantidad,img);
              cart.push(item);
              saveCart();
              displayCart();
            } else {
              alert('No suficientes productos');
            }
          })
          .catch(error => console.error('Error:', error));
      };
    
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
    };
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();

  $('.add-to-cart').click(function(e) {
    e.preventDefault();
    var id = Number($(this).data('productid'));  
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    var quantity = Number($(`.quantity-input[data-productid='${id}']`).val());
    var img = $(this).data('img');
    shoppingCart.addItemToCart(id, name, price, 1,quantity,img);
    displayCart();
});

$('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })

  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>"
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'>"        
        + "<span class='item-count' data-idProducto='" + cartArray[i].id + "'>" + cartArray[i].count + "</span></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-idProducto='" + cartArray[i].id + "'>X</button></td>"
        + "<td>" + cartArray[i].total + "</td>"
        + "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  

$('.show-cart').on("click", ".delete-item", function(e) {
    e.preventDefault();
    var id = Number($(this).data('idproducto'));
    console.log("Delete button clicked. Item id:", id);
    shoppingCart.removeItemFromCartAll(id);
    displayCart();
});

$('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });

$('.botonComprar').click(function(e){
    e.preventDefault();
    shoppingCart.comprarItem();
    displayCart();
})
  

displayCart();

