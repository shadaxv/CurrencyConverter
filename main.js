const amount = document.querySelector(".amountInput");
const currencySelectFrom = document.querySelector(".converterForm__select--from");
const currencySelectTo = document.querySelector(".converterForm__select--to");
const currencySelects = document.querySelectorAll(".converterForm__select");
const currencySelects2 = document.querySelectorAll(".converterForm__select2");
const url = "https://api.fixer.io/latest";
amount.addEventListener("change", converter);
currencySelects.forEach(currencyInput => currencyInput.addEventListener("change", converter));
currencySelects2.forEach(currencyInput => currencyInput.addEventListener("change", converter));
const form = document.querySelector('.converterForm');
form.addEventListener('submit', preventReload);

function preventReload(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false; // for IE
}

let currencies = {
  EUR: 1.0,
};
// currencies = JSON.parse(data.rates) currencies =
fetch('https://api.fixer.io/latest')
  .then((resp) => resp.json())
  // .then((data) => currencies.rates = data.rates)
  // .then((data) => currencies = data.rates)
  .then((data) => Object.assign(currencies, data.rates))
  .then(listCurrency)
  .catch(function(err) {
    // Error :(
  });

let currencies2 = {
  EUR: 1.0,
}


function listCurrency() {
  for (const key in currencies) {
    let option = document.createElement('option');
    option.value = currencies[key];
    option.innerHTML = key.toUpperCase();
    currencySelects.forEach(currencyInput => currencyInput.appendChild(option.cloneNode(true)));
    let currency = key.toUpperCase();
    currencies2[currency] = 1.0;
  }
}


function converter() {
  const from = currencySelectFrom.options[currencySelectFrom.selectedIndex].value;
  const to = currencySelectTo.options[currencySelectTo.selectedIndex].value;
  const amountValue = amount.value;
  const result = (to * amountValue) / from;
  document.getElementById("result").innerHTML = result.toFixed(2);
}
