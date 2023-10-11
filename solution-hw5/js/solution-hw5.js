//JavaScript objects to represent price adaptations based on user selections.

const glazingOptions = {
    name: ['Original', 'Sugar Milk', 'Vanilla Milk', 'Double Chocolate'],
    price: [0.00, 0.00, 0.50, 1.50]
};

const packSizeOptions = {
    name: ['1', '3', '6', '12'],
    price: [1, 3, 5, 10]
};


//create empty array

const cart = [];


//Define class Roll

class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
    }
}


//Get base price

function basePrice(rollType) {
    return rolls[rollType].basePrice;
}


//Make four new Roll objects

const roll1 = new Roll("Original", "Sugar Milk", "1", basePrice("Original"));
const roll2 = new Roll("Walnut", "Vanilla Milk", "12", basePrice("Walnut"));
const roll3 = new Roll("Raisin", "Sugar Milk", "3", basePrice("Raisin"));
const roll4 = new Roll("Apple", "Original", "3", basePrice("Apple"));


//Add them to the cart

cart.push(roll1, roll2, roll3, roll4);


//Write function to calculate the price based on base price, glazing, and pack size options

function calculatedPrice(rollType, glazing, packSize) {

    //get price of glazing based on name
    const glazingIndex = glazingOptions.name.indexOf(glazing);
    const glazingPrice = glazingOptions.price[glazingIndex];

    //get price of packsize based on name
    const packSizeIndex = packSizeOptions.name.indexOf(packSize);
    const packSizePrice = packSizeOptions.price[packSizeIndex];

    //calculate price
    const finalPrice = (rolls[rollType].basePrice + glazingPrice) * packSizePrice;

    return finalPrice;
}

//Write function to update total

function updateTotal() {
    
    let totalPrice = 0;

    //Loop through price
    for (const roll of cart) {
        const addedPrice = calculatedPrice(roll.type, roll.glazing, roll.size);
        totalPrice += addedPrice;
    }

    //Update price
    if (cart.length === 0) {
        document.querySelector("#total-price").textContent = "$0.00";
    }
    else {
        document.querySelector("#total-price").textContent = "$" + totalPrice.toFixed(2);
    }

}

//Write function to append the appropriate DOM elements to the shopping cart page

function appendToCart(roll) {

    //Clone template
    const template = document.getElementById("cart-item-template");
    const clone = template.content.cloneNode(true);

    // Populate with data
    clone.querySelector(".cart-item-img").src = "../assets/products/" + rolls[roll.type].imageFile;
    clone.querySelector(".cart-item-img").alt = roll.type;
    clone.querySelector(".item-name").textContent = roll.type;
    clone.querySelector(".glazing-option").textContent = roll.glazing;
    clone.querySelector(".pack-size-option").textContent = roll.size;
    const itemPrice = calculatedPrice(roll.type, roll.glazing, roll.size);
    clone.querySelector(".item-price").textContent = "$" + itemPrice.toFixed(2);

    //Append to cart
    const cartList = document.getElementById("cart-item-list");
    cartList.appendChild(clone);

    updateTotal();

}


//Add four items to cart

appendToCart(roll1);
appendToCart(roll2);
appendToCart(roll3);
appendToCart(roll4);


// Write remove functions

function remove(roll) {

    //Find matching item
    const cartItems = document.querySelectorAll(".cart-item");
    let cartItem = null;

    for (const item of cartItems) {
        if (
            roll.type === item.querySelector(".item-name").textContent &&
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

    // Remove entry from DOM
    cartItem.remove();

    // Update total
    updateTotal();

}

// Add event listener to button
const removeButtons = document.querySelectorAll(".remove-button");
removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const cartItem = button.closest(".cart-item");
        for (const roll of cart) {
            if (
                roll.type === cartItem.querySelector(".item-name").textContent &&
                roll.glazing === cartItem.querySelector(".glazing-option").textContent &&
                roll.size === cartItem.querySelector(".pack-size-option").textContent
            ) {
                remove(roll);
                break;
            }
        }
    });
});
