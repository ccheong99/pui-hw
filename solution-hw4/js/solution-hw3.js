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

function populate(elementId, options){
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

    //Define base price
    const basePrice = 2.49;

    const totalPrice = (basePrice + glazingPrice) * packSizePrice;

    const finalPrice = document.getElementById("final-price");
    finalPrice.textContent = "$" + totalPrice.toFixed(2);

}