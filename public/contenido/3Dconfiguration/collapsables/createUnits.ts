import { ISessionApi, IParameterApi } from "@shapediver/viewer";

const createUnits = (
  session: ISessionApi,
  parameterObject: IParameterApi<string>[]
) => {
  const getParamsMenu = document.getElementById(
    "params-menu-box"
  ) as HTMLDivElement;
  const parameter = parameterObject[0];

  const unitsToggle = document.createElement("div") as HTMLDivElement;
  unitsToggle.className = "dimensions-toggle";
  const label = document.createElement("p") as HTMLParagraphElement;

  // First line of text: parameter.name
  const paramNameSpan = document.createElement("span");
  paramNameSpan.textContent = parameter.name;

  // Second line of text: CM / INCH
  const unitsSpan = document.createElement("span");
  unitsSpan.id = "units-span"
  unitsSpan.textContent = "CM / INCH";

  // Append both spans to the label element
  label.appendChild(paramNameSpan);
  label.appendChild(document.createElement("br")); // Add a line break between lines
  label.appendChild(unitsSpan);

  // Set the label as the inner content of the unitsToggle
  unitsToggle.appendChild(label);
  const input = document.createElement("input") as HTMLInputElement;
  input.type = "checkbox";
  input.className = "form-check-input";
  input.checked = parameter.defval !== "0";
  input.onchange = async () => {
    if (!parameter) return;

    // Set the parameter value based on the checkbox state
    parameter.value = input.checked ? "1" : "0";

    // Trigger the customization action
    await session.customize().then((data) => {
      const event = new CustomEvent('priceUpdated')
      document.dispatchEvent(event);
    })
  };
  unitsToggle.appendChild(input);

  getParamsMenu.appendChild(unitsToggle);
};

export { createUnits };
