import { IParameterApi, ISessionApi,IViewportApi } from "@shapediver/viewer";
import { createParameterDiv } from "../menu/createParamDiv";
import { collapsibleManager } from "../utils/collapsableLogic";

import { createMenu, getPriceOutput } from "../menu/menuCreation";

export const createDimensionsElement = (
  session: ISessionApi,
  parameterObject: IParameterApi<string>[],
  parentDiv: HTMLDivElement,
  groupName: string,
  viewport:IViewportApi,
) => {
  const parameterDiv = createParameterDiv(parameterObject[0], parentDiv, groupName,);

  const contentElement = document.createElement("div");
  contentElement.className = "content length";
  contentElement.style.maxWidth = "80vw";
  contentElement.style.display = "grid";
  contentElement.style.gridTemplateRows = "auto auto auto";
  contentElement.style.gap = "10px";
  contentElement.style.paddingTop = "10px";

  parentDiv.appendChild(contentElement);

  const filterSides = Object.values(parameterObject).filter(
    (param) => param.type === "Bool"
  );

  // NOMBRE
  const infoMenu = document.getElementById("info-menu");
  const product = document.createElement("div");
  product.className="product";
  product.textContent="PRODUCT: PERGOLA";
  infoMenu.appendChild(product);

  // PRICE
  const conversionRate = 0.91; // AED DEFAULT // lo cambie a EUR
  createMenu(session, conversionRate, viewport);

  
  // SIDES 
  const sidesContainer = document.createElement("div");
  sidesContainer.className = "sides-container";
  const sidesLabel = document.createElement("div");
  sidesLabel.className = "sides-label";
  sidesLabel.innerText = "SIDES";
  sidesContainer.appendChild(sidesLabel);

  sidesContainer.style.display="grid";
  sidesContainer.style.gap="10px";
  sidesContainer.style.alignItems="center";
  sidesContainer.style.justifyContent="space-around";


  filterSides.forEach((side) => {
    const sideBox = document.createElement("div");
    sideBox.className = "form-check form-switch";
    sideBox.style.display="grid";
    sideBox.style.gridTemplateColumns="10% 15%";
    sideBox.style.alignItems="center";
    
    const sideLabel = document.createElement("span");
    sideLabel.className = "form-check-label";
    sideLabel.innerHTML = `${side.name.split(" ").pop()}` || "";
    
    const sideInput = document.createElement("input");
    sideInput.type = "checkbox";
    sideInput.className = "form-check-input";
    sideInput.checked = Boolean(side.value) === true || side.value === "true";
    
    sideInput.onchange = async () => {
      side.value = String(sideInput.checked);
      await session.customize().then((data) => {
        const event = new CustomEvent('priceUpdated');
        document.dispatchEvent(event);
      })
    };

    sideBox.appendChild(sideLabel);
    sideBox.appendChild(sideInput);
    sidesContainer.appendChild(sideBox);
  });

  contentElement.appendChild(sidesContainer);


  // PARAMETROS (LENGHT WIDTH HEIGHT)
  const dimensionsParams = Object.values(parameterObject).filter(
    (param) => param.type === "Float" || param.type === "Int"
  );

  dimensionsParams.forEach((param) => {

    if (param.name != 'Side Height' ){

      const lengthElement = document.createElement("div");
      lengthElement.className = "sd-control spacer";
      lengthElement.style.display="grid";
      lengthElement.style.gap="10px";
      lengthElement.style.alignItems="center";

      

      const sliderInfoElement = document.createElement("div");
      sliderInfoElement.className = "sd-slider-info";
      sliderInfoElement.style.padding="0 1vw";
      sliderInfoElement.style.fontSize="small";
      sliderInfoElement.style.width="25vw";
      sliderInfoElement.style.textTransform="uppercase";
      sliderInfoElement.style.display="flex";
      sliderInfoElement.style.justifyContent='center';
      sliderInfoElement.style.width="20%";
      sliderInfoElement.style.alignItems="center";


      const labelElement = document.createElement("label");
      labelElement.className = "sd-slider-label";
      labelElement.textContent = param.name;
      labelElement.style.display="flex";
      labelElement.style.justifyContent='center';
      labelElement.style.width="20%";
      labelElement.style.alignItems="center";


  /*
      const unitsElement = document.createElement("div");
      unitsElement.className = "sd-units length";
      unitsElement.textContent = "cm";
  */
      const numberInputElement = document.createElement("div");
      numberInputElement.className = "sd-slider-value length";
      numberInputElement.textContent= param.value  + "  " + "cm";
      numberInputElement.style.padding="0 1vw";
      numberInputElement.style.fontSize="small";
      numberInputElement.style.textTransform="uppercase";

  /*
      numberInputElement.onchange = async () => {
        param.value = numberInputElement.value;
        await session.customize().then((data) => {
          const event = new CustomEvent('priceUpdated')
          document.dispatchEvent(event);
        })
      };
  
    */

      const rangeInputElement = document.createElement("input");
      rangeInputElement.className = "slider";
      rangeInputElement.id = "slider"
      rangeInputElement.type = "range";
      rangeInputElement.min = String(param.min);
      rangeInputElement.max = String(param.max);
      rangeInputElement.step = "1";
      rangeInputElement.value = param.value || "100";
      rangeInputElement.style.width="70%";
      rangeInputElement.style.padding="0 5vw";
      rangeInputElement.style.fontSize="small";
      rangeInputElement.style.display="flex";
      rangeInputElement.style.justifyContent='center';
      rangeInputElement.style.alignItems="center";
      
      rangeInputElement.addEventListener("input", () => {
        numberInputElement.textContent = rangeInputElement.value  + " " + "cm";

      });
   
      rangeInputElement.onchange = async () => {
        param.value = rangeInputElement.value;
        await session.customize().then((data) => {
          const event = new CustomEvent('priceUpdated')
          document.dispatchEvent(event);
        })
      };
  
      sliderInfoElement.appendChild(labelElement);
      //sliderInfoElement.appendChild(unitsElement);
  
      lengthElement.appendChild(sliderInfoElement);
      lengthElement.appendChild(rangeInputElement);
  
      lengthElement.appendChild(numberInputElement);
      contentElement.appendChild(lengthElement);




      parameterDiv.addEventListener("click", function (event) {
        collapsibleManager.toggleCollapsible(parameterDiv);

    });

    }


});
};
