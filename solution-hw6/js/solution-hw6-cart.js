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

    console.log(cartStorage);
    
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


// Function to remove roll

function remove(roll) {

    //Find matching item
    const cartItems = document.querySelectorAll(".cart-item");
    let cartItem = null;

    for (const item of cartItems) {
        if (
            roll.type === item.querySelector(".item-name").textContent.replace(" Cinnamon Roll", "") &&
            roll.glazing === item.querySelector(".glazing-option").textContent &&
            roll.size === item.querySelector(".pack-size-option").textContent
        ) {
            cartItem = item;
            break;
        }
    }

    //Find index in cart
    const index = cart.indexOf(roll);

    //Remove from cart
    if (index > -1) {
        cart.splice(index, 1);
    }

    // Remove item from DOM
    cartItem.remove();

    //Get local storage
    const cartStorage = getCart();

    //Remove from local storage
    const newCartStorage = cartStorage.filter((rollData) => (
        rollData.type !== roll.type ||
        rollData.glazing !== roll.glazing ||
        rollData.size !== roll.size
    ));

    //Save updated cart
    saveCart(newCartStorage);

    // Update total
    updateTotal();

}


// Add event listener to remove buttons

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-button")) {
        const cart = getCart();
        const cartItem = event.target.closest(".cart-item");
        if (cartItem) {
            console.log("Removing item:", cartItem);
            const itemTitle = cartItem.querySelector(".item-name").textContent;
            const itemName = itemTitle.replace(" Cinnamon Roll", "");
            const glazingOption = cartItem.querySelector(".glazing-option").textContent;
            const packSizeOption = cartItem.querySelector(".pack-size-option").textContent;

            const rollToRemove = cart.find((roll) => (
                roll.type === itemName &&
                roll.glazing === glazingOption &&
                roll.size === packSizeOption
            ));

            if (rollToRemove) {
                remove(rollToRemove);
            }
        }
    }
});
