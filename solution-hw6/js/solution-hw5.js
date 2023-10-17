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


//Write function to calculate the price based on base price, glazing, and pack size options

function calculatedPrice(rollType, glazing, packSize) {

    //get price of glazing based on name
    const glazingIndex = glazingOptions.name.indexOf(glazing);
    const glazingPrice = glazingOptions.price[glazingIndex];

    //get price of packsize based on name
    const packSizeIndex = packSizeOptions.name.indexOf(packSize);
    const packSizePrice = packSizeOptions.price[packSizeIndex];

    //calculate price
    const finalPrice = (basePrice(rollType) + glazingPrice) * packSizePrice;

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
    clone.querySelector(".cart-item-img").alt = roll.type + " Cinnamon Roll";
    clone.querySelector(".item-name").textContent = roll.type + " Cinnamon Roll";
    clone.querySelector(".glazing-option").textContent = roll.glazing;
    clone.querySelector(".pack-size-option").textContent = roll.size;
    const itemPrice = calculatedPrice(roll.type, roll.glazing, roll.size);
    clone.querySelector(".item-price").textContent = "$" + itemPrice.toFixed(2);

    //Append to cart
    const cartList = document.getElementById("cart-item-list");
    cartList.appendChild(clone);

    updateTotal();

}