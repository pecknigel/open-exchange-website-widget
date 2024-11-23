// option: landscape & portrait display
// option: control number of prices shown; options for 1, 5 (default 5)
// option: change currency

const mockData = {
  TSM: 97.40377661117827,
  DTO: 51.35884532641455,
  VRD: 97.53000083056509,
  JFC: 97.83627459809185
};

const widget = document.querySelector(".widget");
const table = document.querySelector(".widget-table tbody");
const template = document.getElementById("widget-price-template");
const error = document.getElementById("widget-error");
const currencies = ["Pound", "Dollar", "Euro", "Yen"];
let currency = "£"; // set default currency based off region.

configure();

// configuration
function configure() {
  widget.classList.remove("hidden");
  error.classList.add("hidden");
  
  currencies.forEach(curr => {
    const button = document.getElementById(`button${curr}`) 
    button.addEventListener("click", () => updateCurrency(curr))
  })
  
  for (const [key, value] of Object.entries(mockData)) {
    table.appendChild(addTableRow(key, value));
  }
}

function addTableRow(tickerId, price) {
  const templateClone = template.content.cloneNode(true);
  templateClone.querySelector("th").textContent = tickerId;
  templateClone.querySelector("td").textContent = `${currency}${price.toFixed(2)}`;
  return templateClone;
}

function updateCurrency(newCurrency) {
  switch (newCurrency) {
    case "Pound":
      currency = "£";
      break;
    case "Dollar":
      currency = "$";
      break;
    case "Euro":
      currency = "€";
      break;
    case "Yen":
      currency = "¥";
      break;
  }
  console.log(newCurrency)
}

// Debug tools
const portraitButton = document.getElementById("portrait-button");
const landscapeButton = document.getElementById("landscape-button");

portraitButton.addEventListener("click", () => widget.dataset.display = "portrait");
landscapeButton.addEventListener("click", () => widget.dataset.display = "landscape");