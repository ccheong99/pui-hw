//create empty array

const cart = [];


//Parse the URL parameter and store the current roll type as a variable

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");


//Update name

const rollName = document.querySelector("#title");
rollName.innerText = rollType + " Cinnamon Roll"


//Update price

const basePrice = rolls[rollType].basePrice;
const finalPrice = document.querySelector("#final-price");
finalPrice.innerText = "$" + basePrice;


//Update img

const rollImage = document.querySelector('#product-detail-img');
rollImage.src = "../assets/products/" + rolls[rollType].imageFile;


//JavaScript objects to represent price adaptations based on user selections.

const glazingOptions = {
    name: ['Keep Original', 'Sugar milk', 'Vanilla milk', 'Double chocolate'],
    price: [0.00, 0.00, 0.50, 1.50]
};

const packSizeOptions = {
    name: ['1', '3', '6', '12'],
    price: [1, 3, 5, 10]
};


//Function to populate the options of drop-down fields with objects

function populate(elementId, options) {
    const dropdown = document.getElementById(elementId);

    for (let i = 0; i < options.name.length; i++){
        const selectOption = document.createElement('option');
        selectOption.value = options.price[i];
        selectOption.textContent = options.name[i];
        dropdown.appendChild(selectOption);
    }
}


//Apply function to glazing options and pack size options

populate("glazing-option", glazingOptions);
populate("packsize-option", packSizeOptions);


//Compute the updated price

function priceChange() {

    //get glazing price of selected glazing option
    const glazingOption = document.getElementById("glazing-option");
    const glazingPrice = parseFloat(glazingOption.value);

    //get pack size price of selected pack size option
    const packSizeOption = document.getElementById("packsize-option");
    const packSizePrice = parseFloat(packSizeOption.value);

    const totalPrice = (basePrice + glazingPrice) * packSizePrice;

    const finalPriceUpdate = document.getElementById("final-price");
    finalPriceUpdate.textContent = "$" + totalPrice.toFixed(2);

}


//Define class Roll

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

//Create a function that saves all of the current product information

function addToCart() {
    
    const glazingOption = document.getElementById("glazing-option");
    const saveGlazingOption = glazingOption.options[glazingOption.selectedIndex].textContent;
    const packSizeOption = document.getElementById("packsize-option");
    const savePackSizeOption = packSizeOption.options[packSizeOption.selectedIndex].textContent;
    const newRoll = new Roll(rollType, saveGlazingOption, savePackSizeOption, basePrice);
    cart.push(newRoll);
    console.log(cart);

}


//Apply function to button

const addToCartButton = document.getElementById('add-to-cart-button');
addToCartButton.addEventListener('click', addToCart);