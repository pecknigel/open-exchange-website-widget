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
  /*
  ERRORS: - This function won't find the global constants declared at the top of the page.
         - "document.querySelector(".widget")" is supposed to be "widgetElement".
         - "document.querySelector(".widget-table tbody")" is supposed to be "table".
         - It returns "null" when you console.log each of the variables even though they exist since line 41 adds the template content to the page, which includes the selectors each variable is trying to find (see bottom of function for console.log code).
         - Do they need to be parsed into the function for some reason? I wouldn't assume so?

         - The render works when you click a currency. It switches the currency symbol.
         - It only works once though, if you click another symbol it doesn't update, I'm not sure why?
  */
  const templateClone = widgetTemplate.content.cloneNode(true);

  // Removes and adds the widget element.
  if (document.querySelector(".widget")) document.querySelector(".widget").remove();
  document.getElementById("widget-wrapper").appendChild(templateClone);

  // Adds the table rows.
  for (const [key, value] of Object.entries(mockData)) {
    document.querySelector(".widget-table tbody").appendChild(addTableRow(key, value));
  }

  // Hides the error.
  error.classList.add("hidden");

  // Temporary - Extends ERRORS comment.
  console.log(widgetElement);
  console.log(table);
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