import { ISessionApi, IViewportApi } from "@shapediver/viewer";
import { fetchConversionRate } from "../utils/currencyConversion";



interface PriceProp {
  name: string;
  data: number;
}

interface OutputContent {
  name: string;
  content: PriceProp[];
}

export function createMenu(
  session: ISessionApi,
  initialConversionRate = 0.91,
  viewport: IViewportApi
): void {

//  const menuDiv = document.getElementById("menu") as HTMLDivElement;
  const infoMenu = document.getElementById("info-menu") as HTMLDivElement;

  const unitPriceLabel = document.createElement("div");
  unitPriceLabel.innerText = "PRICE";
  unitPriceLabel.className = "unit-price-label";
  unitPriceLabel.style.fontFamily = "Montserrat";
  unitPriceLabel.style.fontWeight = "400";
  unitPriceLabel.style.fontSize = "small";
  unitPriceLabel.style.marginTop="5px" ; 
  unitPriceLabel.style.display="grid";
  unitPriceLabel.style.gridTemplateColumns = "35% 30%";
  infoMenu.appendChild(unitPriceLabel);

  const quantityAndPriceContainer = document.createElement("div");
  quantityAndPriceContainer.className = "qty-price-container";
  quantityAndPriceContainer.style.fontWeight="600";
  unitPriceLabel.appendChild(quantityAndPriceContainer);

  const labelWithPrice = document.createElement("div");
  labelWithPrice.className = "label-price-container";
  quantityAndPriceContainer.appendChild(labelWithPrice);


  const priceSelect = createCurrencySelect(session, initialConversionRate);
  const price = document.createElement("div");
  price.className = "price";
  price.id = "price-selector";
  labelWithPrice.appendChild(price);
  
  //labelWithPrice.appendChild(priceSelect);

  const priceOutput = getPriceOutput(session);
  const qty = document.getElementById("qty-value") as HTMLInputElement;
  const qtyValue = Number(qty?.value) || 1;
  
  updatePrice(initialConversionRate, priceOutput, price, labelWithPrice, qtyValue);

  /*
  const quantityContainer = createQuantityContainer();
  quantityAndPriceContainer.appendChild(quantityContainer);

  const materialAndPanel = createMaterialAndPanel(session);
  menuDiv.appendChild(materialAndPanel);
  */

  // Add additional menu elements here...


  /*
  const menuButtons = document.getElementById("menu-buttons");
  const pdfButton = document.createElement("button") as HTMLButtonElement;
  pdfButton.id = "pdf-export";
  pdfButton.innerText = "DOWNLOAD ESTIMATION";
  const dwgButton = document.createElement("button") as HTMLButtonElement;
  dwgButton.id = "dwg-export";
  dwgButton.innerText = "REQUEST DWG";
  menuButtons?.appendChild(pdfButton);
  menuButtons?.append(dwgButton);

  */
  
}

function createCurrencySelect(
  session: ISessionApi,
  initialConversionRate: number
): HTMLSelectElement {

  const priceSelect = document.createElement("select") as HTMLSelectElement;
  priceSelect.className = "label";
  priceSelect.id = "currency-select";

  const options = [
    { value: "USD", text: "USD", rate: 1 },
    //{ value: "AED", text: "AED", rate: 3.67 },
    { value: "GBP", text: "GBP", rate: 0.78 },
    { value: "EUR", text: "EUR", rate: 0.91 },
    //{ value: "SAR", text: "SAR", rate: 3.75 },
    //{ value: "KWD", text: "KWD", rate: 0.31 },
    //{ value: "OMR", text: "OMR", rate: 0.39 },
    //{ value: "QAR", text: "QAR", rate: 3.64 },
  ];

  options.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.text = optionData.text;
    if (optionData.value === "EUR") {
      option.selected = true; // Default to AED
    }
    priceSelect.add(option);
  });

  if (initialConversionRate)

  priceSelect.onchange = async (event) => {
    const valueToFind = (event.target as HTMLSelectElement).value;
    //const selectedCurrency = options.find(option => option.value === valueToFind)?.rate.toFixed(2).toString()
    const selectedCurrency =  "EUR";

    if (!selectedCurrency) return
    try {
      const newConversionRate = selectedCurrency;
      const priceOutput = getPriceOutput(session);
      const price = document.querySelector(".price") as HTMLDivElement;
      const labelWithPrice = document.querySelector(".label-price-container") as HTMLDivElement;
      const qty = document.getElementById("qty-value") as HTMLInputElement;
     // const qtyValue = Number(qty.value);
      const qtyValue = Number(1);
      updatePrice(Number(newConversionRate), priceOutput, price, labelWithPrice,qtyValue);
    } catch (error) {
      priceSelect.value = "EUR";
      const usdConversionRate = 1;
      const priceOutput = getPriceOutput(session);
      const price = document.querySelector(".price") as HTMLDivElement;
      const labelWithPrice = document.querySelector(".label-price-container") as HTMLDivElement;
      //const qty = document.getElementById("qty-value") as HTMLInputElement;
      //const qtyValue = Number(qty.value);
      const qtyValue = Number(1);
      updatePrice(usdConversionRate, priceOutput, price, labelWithPrice,qtyValue);
    }
  };

  document.addEventListener("priceUpdated", async (event) => {
    
    //ESTO SIGUIENTE NO SE USA YA Q EL PRECIO ESTA EN EYURPS, NO NECESITA EL SELECTOR
    //const grabSelectElement = document.getElementById("currency-select") as HTMLSelectElement;
    //const selectedCurrency = grabSelectElement.value;

    const selectedCurrency = "EUR";
    const price = document.querySelector(".price") as HTMLDivElement;
    const labelWithPrice = document.querySelector(".label-price-container") as HTMLDivElement;

    const newConversionRate = options.find(option => option.value === selectedCurrency)?.rate.toFixed(2).toString();
    const priceOutput = getPriceOutput(session);
//    const qty = document.getElementById("qty-value") as HTMLInputElement;
    const qtyValue = Number(1);
    updatePrice(Number(newConversionRate), priceOutput, price, labelWithPrice, qtyValue);
  });

  return priceSelect;
}

export function getPriceOutput(
  session: ISessionApi
): [string, OutputContent] | undefined {
  return Object.entries(session.outputs).find(
    (item) =>
      item[1].name === "Price" &&
      item[1].content?.some((prop) => prop.name === "Price")
      
 //esta funcion devuelv 1286fb4b49acee98a2bd1e5a8172924f
  ) as [string, OutputContent] | undefined;
  
}

function updatePrice(
  conversionRate: number,
  priceOutput: [string, OutputContent] | undefined,
  priceElement: HTMLDivElement,
  labelWithPrice: HTMLDivElement,
  qty: number
): void {
  if (!conversionRate) {
    conversionRate = 1
  }
  if (priceOutput) {
    const priceProp = priceOutput[1].content?.find(
      (prop: PriceProp) => prop.name === "Price"
    );
    if (priceProp) {
      const convertedPrice = Number((priceProp.data * conversionRate) * Number(qty || 1)).toFixed(2);
      priceElement.innerText ="€ " + convertedPrice;
      labelWithPrice.appendChild(priceElement);
      console.log('convertedPrice', convertedPrice); 
    }
  }
}



/*

function createQuantityContainer() {
  const quantityContainer = document.createElement("div");
  quantityContainer.className = "qty-container";

  const qtyLabel = document.createElement("div");
  qtyLabel.className = "qty-label";
  qtyLabel.innerText = "Quantity";
  quantityContainer.appendChild(qtyLabel);

  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.defaultValue = "1";
  qtyInput.id = "qty-value";

  // Function to handle input change
  qtyInput.addEventListener("change", function (e) {
    const target = e.target as HTMLInputElement; // Asertamos que el objetivo es un HTMLInputElement
    qtyInput.value = target.value; // Ahora TypeScript sabe que target es un HTMLInputElement
    const event = new CustomEvent('priceUpdated')
        document.dispatchEvent(event);
  });

  quantityContainer.appendChild(qtyInput);

  return quantityContainer;
}

function createMaterialAndPanel(session: ISessionApi): HTMLDivElement {
  const materialAndPanel = document.createElement("div");
  materialAndPanel.className = "material-panel-container";

  const materialOutput = Object.entries(session.outputs).find(
    (item) =>
      item[1].name === "Material" &&
      item[1].content?.some((prop) => prop.name === "Material")
  );

  const panelsOutput = Object.entries(session.outputs).find(
    (item) =>
      item[1].name === "Panels" &&
      item[1].content?.some((prop) => prop.name === "Panels")
  );

  const materialData = materialOutput
    ? materialOutput[1].content?.find((prop) => prop.name === "Material")?.data
    : "";

  const panelsData = panelsOutput
    ? panelsOutput[1].content?.find((prop) => prop.name === "Panels")?.data ||
      ""
    : "";

  materialAndPanel.innerText = `${
    materialOutput ? `MATERIAL: ${String(materialData).toUpperCase()}` : ""
  } ${
    panelsData.length > 2 ? `- PANELS: ${String(panelsData).toUpperCase()}` : ""
  }`;

  return materialAndPanel;
}
*/