import { ISessionApi, IParameterApi } from "@shapediver/viewer";

const canvas = document.getElementById("canvas-container") as HTMLDivElement;

const createIconElement = (
  src: string,
  height: string,
  width: string
): HTMLImageElement => {
  const icon = document.createElement("img") as HTMLImageElement;
  icon.src = src;
  icon.style.height = height;
  icon.style.width = width;
  icon.addEventListener("click", () => {
    const menu = document.getElementById("params-menu-box") as HTMLDivElement;
    if (menu) {
      if (menu.style.display !== "none") {
        menu.style.display = "none";
      } else {
        menu.style.display = "flex";
      }
    }
  });
  return icon;
};

const createLabelElement = (weightValue: number): HTMLDivElement => {
  const label = document.createElement("p") as HTMLParagraphElement;
  label.className = "weight-label"
  label.style.display = "flex";
  label.style.alignItems = "center";

  const firstWord = document.createElement("div") as HTMLDivElement;
  firstWord.innerText = "WEIGHT: ";

  const secondWord = document.createElement("div") as HTMLDivElement;
  secondWord.id = "weight-value";
  secondWord.innerText = String(weightValue);

  const thirdWord = document.createElement("div") as HTMLDivElement;
  thirdWord.innerText = "KG";

  label.appendChild(firstWord);
  label.appendChild(secondWord);
  label.appendChild(thirdWord);

  const weightLabel = document.createElement("div") as HTMLDivElement;
  weightLabel.appendChild(label);

  return weightLabel;
};

export const getWeightValue = (session: ISessionApi): number | null => {
  const weightOutput = Object.entries(session.outputs).find(
    (output) => output[1].name === "Weight" && output[1].content?.length
  );
  if (weightOutput && weightOutput[1].content) {
    return weightOutput[1].content[0].data;
  }
  return null;
};

const createReferenceElement = (
  session: ISessionApi,
  parameterObject: IParameterApi<string>[]
): void => {
  if (parameterObject[0].name === "Density") return;

  const weightValue = getWeightValue(session);
  const referenceBox = document.createElement("div") as HTMLDivElement;
  referenceBox.className = "reference-box";
  referenceBox.id = "ref-box-id"

  const weightBox = document.createElement("div") as HTMLDivElement;
  weightBox.className = "weight-box";

  const weightIcon = document.createElement("div") as HTMLDivElement;
  const icon = createIconElement(
    "https://drive.google.com/thumbnail?id=11HcE5Mw66C-PxrvHPiZ86MYlKXqajNeT&sz=w1000",
    "48px",
    "48px"
  );
  weightIcon.appendChild(icon);

  weightBox.appendChild(weightIcon);

  if (weightValue !== null) {
    const weightLabel = createLabelElement(weightValue);
    weightBox.appendChild(weightLabel);
  }

  referenceBox.appendChild(weightBox);
  canvas.appendChild(referenceBox);

  const paramsBox = document.createElement("div") as HTMLDivElement;
  paramsBox.id = "params-menu-box";
  paramsBox.className = "params-reference-container";
  const dimensionsParam = Object.entries(session.parameters).find(
    (output) => output[1].name === "General Dimensions"
  );

  const dimensionsToggle = document.createElement("div") as HTMLDivElement;
  dimensionsToggle.className = "dimensions-toggle";
  const label = document.createElement("p") as HTMLParagraphElement;
  label.innerText =
    dimensionsParam?.[1].name === "General Dimensions"
      ? "Dimensions:"
      : String(dimensionsParam?.[1].name);
  dimensionsToggle.appendChild(label);
  const input = document.createElement("input") as HTMLInputElement;
  input.type = "checkbox";
  input.className = "form-check-input";
  input.checked = (dimensionsParam?.[1].defval) === "true" ? true : false
  input.onchange = async () => {
    if (!dimensionsParam) return;
    dimensionsParam[1].value = String(input.checked);
    await session.customize().then((data) => {
      const event = new CustomEvent('priceUpdated')
      document.dispatchEvent(event);
    })
  };
  dimensionsToggle.appendChild(input);

  const referenceToggle = document.createElement("div") as HTMLDivElement;
  referenceToggle.className = "dimensions-toggle";
  const referenceLabel = document.createElement("p") as HTMLParagraphElement;
  referenceLabel.innerText =
    parameterObject[0].name === "General Dimensions"
      ? "Dimensions:"
      : "HUMAN SCALE:";
  referenceToggle.appendChild(referenceLabel);
  const referenceInput = document.createElement("input") as HTMLInputElement;
  referenceInput.type = "checkbox";
  referenceInput.className = "form-check-input";
  referenceInput.checked = (dimensionsParam?.[1].defval) === "true" ? true : false
  referenceInput.onchange = async () => {
    if (!parameterObject) return;
    parameterObject[0].value = String(referenceInput.checked);
    await session.customize().then((data) => {
      const event = new CustomEvent('priceUpdated')
      document.dispatchEvent(event);
    })
  };
  referenceToggle.appendChild(referenceInput);

  paramsBox.appendChild(dimensionsToggle);
  paramsBox.appendChild(referenceToggle);
  referenceBox.appendChild(paramsBox);
};

export { createReferenceElement };
