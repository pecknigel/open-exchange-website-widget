const mockData = {
  TSM: 97.40377661117827,
  DTO: 51.35884532641455,
  VRD: 97.53000083056509,
  JFC: 97.83627459809185
};

class Widget {
  currencyTypes;
  currentCurrency
  shadowDom;
  location;

  constructor(location) {
    this.currencyTypes = ["Pound", "Dollar", "Euro", "Yen"];
    this.currentCurrency = "£";
    this.location = location;

    this.errorCheck();
    this.createShadowDom();
    this.createTable();
    // this.configureButtons();
  }

  errorCheck() {
    if (!this.location) {
      throw new Error("Missing location");
    } else if (typeof this.location !== "string") {
      throw new Error("Location is not a string type");
    } else if (document.querySelectorAll(this.location).length < 1) {
      throw new Error("Location doesn't exist");
    } else if (document.querySelectorAll(this.location).length > 1) {
      throw new Error("Location is present in more than one place.");
    }
  }

  createShadowDom() {
    this.shadowDom = document.querySelector(this.location).attachShadow({mode: "closed"});
    // implement styles and elements
  }

  createTable() {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.appendChild(thead);
    table.appendChild(tbody);
    thead.appendChild(document.createElement("tr"));

    for (const [key, value] of Object.entries(mockData)) {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      const td = document.createElement("td");
      tr.appendChild(th);
      tr.appendChild(td);
      th.textContent = key;
      th.scope = "row";
      td.textContent = `${this.currentCurrency}${value.toFixed(2)}`;

      tbody.appendChild(tr);
    }

    if (this.shadowDom.querySelector("table")) this.shadowDom.querySelector("table").remove();
    this.shadowDom.appendChild(table);
  }

  configureButtons() {
    this.currencyTypes.forEach(currency => {
      const button = this.location.getElementById(`button${currency}`);
      button.addEventListener("click", () => this.updateCurrency(currency));
    })
  }

  updateCurrency(newCurrency) {
    switch (newCurrency) {
      case "Pound":
        this.currentCurrency = "£";
        break;
      case "Dollar":
        this.currentCurrency = "$";
        break;
      case "Euro":
        this.currentCurrency = "€";
        break;
      case "Yen":
        this.currentCurrency = "¥";
        break;
    }
    this.createTable();
  }
}

const tickerWidget = new Widget("#widget-goes-here");