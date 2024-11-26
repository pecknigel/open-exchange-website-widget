const mockData = {
  TSM: 97.40377661117827,
  DTO: 51.35884532641455,
  VRD: 97.53000083056509,
  JFC: 97.83627459809185
};

const widgetElement = document.querySelector(".widget");
const table = document.querySelector(".widget-table tbody");
const error = document.getElementById("widget-error");
const widgetTemplate = document.getElementById("widget-template");
const rowTemplate = document.getElementById("widget-row-template");
const currencyTypes = ["Pound", "Dollar", "Euro", "Yen"];
let currentCurrency = "£"; // set default currency based off region.

configure();

// configuration
function configure() {
  renderTable()

  currencyTypes.forEach(currency => {
    const button = document.getElementById(`button${currency}`)
    button.addEventListener("click", () => updateCurrency(currency))
  })
}

// Widget Functions
function renderTable() {
  const templateClone = widgetTemplate.content.cloneNode(true);

  // Removes and adds the widget element.
  if (widgetElement) widgetElement.remove();
  document.getElementById("widget-wrapper").appendChild(templateClone);

  // Adds the table rows.
  for (const [key, value] of Object.entries(mockData)) {
    table.appendChild(addTableRow(key, value));
  }

  // Hides the error message.
  error.classList.add("hidden");
}

function addTableRow(tickerId, price) {
  const templateClone = rowTemplate.content.cloneNode(true);
  templateClone.querySelector("th").textContent = tickerId;
  templateClone.querySelector("td").textContent = `${currentCurrency}${price.toFixed(2)}`;
  return templateClone;
}

function updateCurrency(newCurrency) {
  switch (newCurrency) {
    case "Pound":
      currentCurrency = "£";
      break;
    case "Dollar":
      currentCurrency = "$";
      break;
    case "Euro":
      currentCurrency = "€";
      break;
    case "Yen":
      currentCurrency = "¥";
      break;
  }
  renderTable()
}

// Debug tools
const portraitButton = document.getElementById("portrait-button");
const landscapeButton = document.getElementById("landscape-button");

portraitButton.addEventListener("click", () => widgetElement.dataset.display = "portrait");
landscapeButton.addEventListener("click", () => widgetElement.dataset.display = "landscape");