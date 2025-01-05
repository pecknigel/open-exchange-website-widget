const mockData = {
  TSM: 97.40377661117827,
  DTO: 51.35884532641455,
  VRD: 97.53000083056509,
  JFC: 97.83627459809185
};

const currencyTypes = ["Pound", "Dollar", "Euro", "Yen"];
let currentCurrency = "£";

class Widget {
  base;
  baseElement;
  baseLocation;

  constructor(baseElement="div", baseLocation="body") {
    this.baseElement = baseElement;
    this.baseLocation = baseLocation;

    this.renderWidget();
    this.configureButtons();
  }

  renderWidget() {
    if (document.querySelector(".widget")) document.querySelector(".widget").remove();
    this.createBase();
    this.createTable();
  }

  createBase() {
    this.base = document.createElement(this.baseElement);
    document.querySelector(this.baseLocation).appendChild(this.base);
    this.base.classList.add("widget");
  }

  createTable() {
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    for (const [key, value] of Object.entries(mockData)) {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      const td = document.createElement("td");
      tr.appendChild(th);
      tr.appendChild(td);
      th.textContent = key;
      th.scope = "row";
      td.textContent = `${currentCurrency}${value.toFixed(2)}`;

      tbody.appendChild(tr);
    }

    this.base.appendChild(table);
  }

  configureButtons() {
    currencyTypes.forEach(currency => {
      const button = this.base.getElementById(`button${currency}`);
      button.addEventListener("click", () => this.updateCurrency(currency));
    })
  }

  updateCurrency(newCurrency) {
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
    this.renderWidget();
  }
}

const tickerWidget = new Widget();