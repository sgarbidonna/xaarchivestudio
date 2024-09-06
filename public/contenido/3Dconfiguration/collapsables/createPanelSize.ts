import { IParameterApi, ISessionApi } from "@shapediver/viewer";
import { createParameterDiv } from "../menu/createParamDiv";
import { collapsibleManager } from "../utils/collapsableLogic";

export const createPanelSize = (
  session: ISessionApi,
  parameterObject: IParameterApi<string>[],
  parentDiv: HTMLDivElement,
  groupName: string
) => {
  const parameterDiv = createParameterDiv(parameterObject[0], parentDiv, groupName);

  const contentElement = document.createElement("div");
  contentElement.className = "content length";
  parentDiv.appendChild(contentElement);

  const dimensionsParams = Object.values(parameterObject).filter(
    (param) => param.type === "Float" || param.type === "Int"
  );

  dimensionsParams.forEach((param) => {
    const lengthElement = document.createElement("div");
    lengthElement.className = "sd-control spacer";

    const sliderInfoElement = document.createElement("div");
    sliderInfoElement.className = "sd-slider-info";

    const labelElement = document.createElement("label");
    labelElement.className = "sd-slider-label";
    labelElement.textContent = param.name;

    const unitsElement = document.createElement("div");
    unitsElement.className = "sd-units length";
    unitsElement.textContent = "cm";

    const numberInputElement = document.createElement("input");
    numberInputElement.className = "sd-slider-value length";
    numberInputElement.type = "number";
    numberInputElement.min = String(param.min) || "150";
    numberInputElement.max = String(param.max) || "1000";
    numberInputElement.step = "1";
    numberInputElement.value = param.value || "100";

    numberInputElement.onchange = async () => {
      param.value = numberInputElement.value;
      await session.customize().then((data) => {
        const event = new CustomEvent('priceUpdated')
        document.dispatchEvent(event);
      })
    };

    const rangeInputElement = document.createElement("input");
    rangeInputElement.className = "slider";
    rangeInputElement.type = "range";
    rangeInputElement.min = String(param.min);
    rangeInputElement.max = String(param.max);
    rangeInputElement.step = "1";
    rangeInputElement.value = param.value || "100";

    rangeInputElement.addEventListener("input", () => {
      numberInputElement.value = rangeInputElement.value;
    });

    numberInputElement.addEventListener("input", () => {
      rangeInputElement.value = numberInputElement.value;
    });

    rangeInputElement.onchange = async () => {
      param.value = rangeInputElement.value;
      await session.customize().then((data) => {
        const event = new CustomEvent('priceUpdated')
        document.dispatchEvent(event);
      })
    };

    sliderInfoElement.appendChild(labelElement);
    sliderInfoElement.appendChild(unitsElement);
    sliderInfoElement.appendChild(numberInputElement);

    lengthElement.appendChild(sliderInfoElement);
    lengthElement.appendChild(rangeInputElement);

    contentElement.appendChild(lengthElement);
  });
/*
  parameterDiv.addEventListener("click", function (event) {
    collapsibleManager.toggleCollapsible(parameterDiv);
});
*/
};
