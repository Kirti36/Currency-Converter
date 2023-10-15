let api = `https://v6.exchangerate-api.com/v6/81a5c8cd28d9b2f34c263c98/latest/USD`;
const fromDropDown = document.getElementById("from-currency");
const toDropDown = document.getElementById("to-currency");
const result = document.getElementById("result");
//creating dropdown from the currencies array
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromDropDown.add(option);
});

//reapeating same thing for hte other dropdown
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toDropDown.add(option);
});

//setting default values
fromDropDown.value = "INR";
toDropDown.value = "USD";

let convertCurrency = () => {
    //create refference
    const amount = document.querySelector("#amount").value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    //if amonut iput field is not empty then
    if (amount.length != 0) {
        fetch(api).then(resp => resp.json()).then(data => {
            let fromExchangeRate = data.conversion_rates[fromCurrency];
            let toExchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
            result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        });
    } else {
        alert("Please enter a currency");
    }
};

document.querySelector("#convert-button").addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);