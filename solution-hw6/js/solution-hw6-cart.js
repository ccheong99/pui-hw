// Function to retrieve the cart from the local storage

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


// Function to convert the updated cart to JSON, save it in the local storage

function saveCart(cart) {
    const newCart = JSON.stringify(cart);
    localStorage.setItem("cart", newCart);
}


//When the cart page is loaded, perform the following actions

window.addEventListener("load", () => {

    // Retrieve the cart from the local storage
    const cartStorage = getCart();
    
    const cart = [];

    // Create new Roll instances
    cartStorage.forEach((rollData) => {
        const roll = new Roll(rollData.type, rollData.glazing, rollData.size, basePrice(rollData.type));
        cart.push(roll);
    });

    // Populate the DOM with all of the items in the current cart
    cart.forEach((roll) => {
        appendToCart(roll);
    });

});