// Create element instead of templates
const mockData = {
  TSM: 97.40377661117827,
  DTO: 51.35884532641455,
  VRD: 97.53000083056509,
  JFC: 97.83627459809185
};

const widgetTemplate = document.getElementById("widget-template");
const rowTemplate = document.getElementById("widget-row-template");
const widgetWrapper = document.getElementById("widget-wrapper");
const error = document.getElementById("widget-error");
const currencyTypes = ["Pound", "Dollar", "Euro", "Yen"];
let currentCurrency = "£"; // set default currency based off region.

configure();

function configure() {
  renderTable()
}

// Widget Functions
function renderTable() {
  const widgetElement = document.querySelector(".widget");
  const templateClone = widgetTemplate.content.cloneNode(true);

  // Remove the widget element.
  if (widgetElement) widgetElement.remove();

  // Add currency button event listeners
  currencyTypes.forEach(currency => {
    const button = templateClone.getElementById(`button${currency}`);
    button.addEventListener("click", () => updateCurrency(currency));
  })

  // Adds the widget element.
  widgetWrapper.appendChild(templateClone);

  // Adds the table rows.
  const table = document.querySelector(".widget-table tbody");
  for (const [key, value] of Object.entries(mockData)) {
    table.appendChild(addTableRow(key, value));
  }

  // Hides the error message.
  error.classList.add("hidden");

  // Configure temporary debug tools
  configureDebug();
}

function addTableRow(tickerId, price) {
  const templateClone = rowTemplate.content.cloneNode(true);
  templateClone.querySelector("th").textContent = tickerId;
  templateClone.querySelector("td").textContent = `${currentCurrency}${price.toFixed(2)}`;
  return templateClone;
}

function updateCurrency(newCurrency) {
  console.log("# run updateCurrency")
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
  console.log('newCurrency = ', newCurrency);
  console.log('currentCurrency = ', currentCurrency);
  renderTable()
}

function configureDebug() {
  const widgetElement = document.querySelector(".widget");
  const portraitButton = document.getElementById("portrait-button");
  const landscapeButton = document.getElementById("landscape-button");

  portraitButton.addEventListener("click", () => widgetElement.dataset.display = "portrait");
  landscapeButton.addEventListener("click", () => widgetElement.dataset.display = "landscape");
}
