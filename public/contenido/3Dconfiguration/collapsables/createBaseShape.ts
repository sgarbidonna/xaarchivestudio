import { IParameterApi, ISessionApi } from "@shapediver/viewer";
import { createParameterDiv } from "../menu/createParamDiv";
import { collapsibleManager } from "../utils/collapsableLogic";

export const createBaseShape = (
  session: ISessionApi,
  parameterObject: IParameterApi<string>[],
  parentDiv: HTMLDivElement,
  groupName: string
) => {
  const parameterDiv = createParameterDiv(
    parameterObject[0],
    parentDiv,
    groupName
  );

  const contentElement = document.createElement("div");
  contentElement.className = "content length";
  parentDiv.appendChild(contentElement);

  const filterSides = Object.values(parameterObject).filter(
    (param) => param.name === "Type"
  );
  const sidesContainer = document.createElement("div");
  sidesContainer.className = "sides-container";

  if (filterSides[0] && filterSides[0].choices)
    filterSides[0].choices.forEach((side, index) => {
      const sideBox = document.createElement("div");
      sideBox.className = "density-box";

      const sideLabel = document.createElement("span");
      sideLabel.innerHTML = side.split(" ").pop() || "";

      const sideInput = document.createElement("input") as HTMLInputElement;
      sideInput.type = "radio";
      sideInput.className = "form-check-input-bs";
      sideInput.checked = filterSides[0].defval === String(index); // Check if the index matches defval

      sideInput.onchange = async () => {
        // Uncheck all checkboxes
        document.querySelectorAll(".form-check-input-bs").forEach((input) => {
          (input as HTMLInputElement).checked = false;
        });

        // Check the clicked checkbox
        sideInput.checked = true;

        // Update the filterSides value
        filterSides[0].value = String(index); // Set the value to the index of the selected input
        await session.customize().then((data) => {
        const event = new CustomEvent('priceUpdated')
        document.dispatchEvent(event);
      })}

      sideBox.appendChild(sideLabel);
      sideBox.appendChild(sideInput);
      sidesContainer.appendChild(sideBox);
    });

  contentElement.appendChild(sidesContainer);

  const dimensionsParams = Object.values(parameterObject).filter(
    (param) => param.type === "Float" || param.type === "Int"
  );

  const dimensionsLabel = document.createElement("div") as HTMLDivElement;
  dimensionsLabel.innerText = "DIMENSIONS";
  dimensionsLabel.className = "dimensions-label-bs";
  contentElement.appendChild(dimensionsLabel);

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
      await  await session.customize().then((data) => {
        const event = new CustomEvent('priceUpdated')
        document.dispatchEvent(event);
      })/*;tomize().then((data) => {
        const event = new CustomEvent('priceUpdated')
        document.dispatchEvent(event);
      });
      */
    };

    sliderInfoElement.appendChild(labelElement);
    sliderInfoElement.appendChild(unitsElement);
    sliderInfoElement.appendChild(numberInputElement);

    lengthElement.appendChild(sliderInfoElement);
    lengthElement.appendChild(rangeInputElement);

    contentElement.appendChild(lengthElement);
  });

  parameterDiv.addEventListener("click", function (event) {
    collapsibleManager.toggleCollapsible(parameterDiv);
  });
};
