//JavaScript objects to represent price adaptations based on user selections.

const glazingOptions = [
    {
        name: 'Keep Original',
        price: 0.00,
    },
    {
        name: 'Sugar milk',
        price: 0.00,
    },
    {
        name: 'Vanilla milk',
        price: 0.50,
    },
    {
        name: 'Double chocolate',
        price: 1.50,
    },
];

const packSizeOptions = [
    {
        name: '1',
        price: 1,
    },
    {
        name: '3',
        price: 3,
    },
    {
        name: '6',
        price: 5,
    },
    {
        name: '12',
        price: 10,
    },
];


//Function to populate the options of drop-down fields with objects

function populate(elementId, options){
    const dropdown = document.getElementById(elementId);

    for (let i = 0; i < options.length; i++){
        const selectOption = document.createElement('option');
        selectOption.value = options[i].price;
        selectOption.textContent = options[i].name;
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