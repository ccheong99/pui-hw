// Retrieve the cart from the local storage
function getCart() {
    let cartStorage = localStorage.getItem('cart');
    if (cartStorage !== null) {
        return JSON.parse(cartStorage);
    } 
    else {
        cartStorage = [];
        return cartStorage;
    }
};

// Convert the updated cart to JSON, save it in the local storage
function saveCart(cart) {
    const newCart = JSON.stringify(cart);
    localStorage.setItem("cart", newCart);
}

// Function to store data in the cart
function storeData() {
    const rollTitle = document.getElementById("title").textContent;
    const rollType = rollTitle.replace(" Cinnamon Roll", "");
    const glazingOption = document.getElementById("glazing-option");
    const glazing = glazingOption.options[glazingOption.selectedIndex].textContent;
    const packSizeOption = document.getElementById("packsize-option");
    const packSize = packSizeOption.options[packSizeOption.selectedIndex].textContent;

    // create a Roll instance
    const roll = new Roll(rollType, glazing, packSize, basePrice);

    // Get cart
    const cart = getCart();

    // Add it to cart array
    cart.push(roll);

    // Save data in the local storage
    saveCart(cart);

    // Print the current contents of the cart
    console.log(cart);
}


// Add function to "Add to Cart" button on click
document.getElementById("add-to-cart-button").addEventListener("click", storeData);