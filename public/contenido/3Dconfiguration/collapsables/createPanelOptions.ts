import { IParameterApi, ISessionApi } from "@shapediver/viewer";
import { createParameterDiv } from "../menu/createParamDiv";
import { collapsibleManager } from "../utils/collapsableLogic";

export const createPanelOptions = (
  session: ISessionApi,
  parameterObject: IParameterApi<string>[],
  parentDiv: HTMLDivElement,
  groupName: string
) => {
  const parameterDiv = createParameterDiv(parameterObject[0], parentDiv, groupName);

  parameterDiv.addEventListener("click", function (event) {
    collapsibleManager.toggleCollapsible(parameterDiv);
  });

  const contentElement = document.createElement("div");
  contentElement.className = "content panel-options";
  parentDiv.appendChild(contentElement);

  parameterObject.forEach((parameter) => {
    // Create a wrapper div for each parameter
    const parameterWrapper = document.createElement("div");
    parameterWrapper.className = "parameter-wrapper";

    // Create a p element for the parameter name
    const parameterName = document.createElement("p");
    parameterName.textContent = parameter.name;
    parameterWrapper.appendChild(parameterName);

    // Create a container for checkboxes
    const checkboxesContainer = document.createElement("div");
    checkboxesContainer.className = "checkboxes-container";

    // Variable to keep track of the currently checked checkbox for this parameter
    let currentCheckedCheckbox: HTMLInputElement | null = null;

    // Special case for "Mounting Holes" parameter
    if (parameter.name === "Mounting Holes") {
      const yesBox = document.createElement("div") as HTMLDivElement;
      yesBox.className = "checkbox-box";

      const yesLabel = document.createElement("label") as HTMLLabelElement;
      yesLabel.textContent = "Yes";
      const yesCheckbox = document.createElement("input") as HTMLInputElement;
      yesCheckbox.type = "radio";
      yesCheckbox.name = `mounting-holes-${parameter.name}`;
      yesBox.appendChild(yesLabel);
      yesBox.appendChild(yesCheckbox);

      const noBox = document.createElement("div") as HTMLDivElement;
      noBox.className = "checkbox-box";

      const noLabel = document.createElement("label") as HTMLLabelElement;
      noLabel.textContent = "No";
      const noCheckbox = document.createElement("input") as HTMLInputElement;
      noCheckbox.type = "radio";
      noCheckbox.name = `mounting-holes-${parameter.name}`;
      noBox.appendChild(noLabel);
      noBox.appendChild(noCheckbox);

      checkboxesContainer.appendChild(noBox);
      checkboxesContainer.appendChild(yesBox);
      parameterWrapper.appendChild(checkboxesContainer);

      // Set the initial state based on the parameter value
      if (parameter.value === "true") {
        yesCheckbox.checked = true;
        currentCheckedCheckbox = yesCheckbox;
      } else {
        noCheckbox.checked = true;
        currentCheckedCheckbox = noCheckbox;
      }

      yesCheckbox.addEventListener("change", async () => {
        if (yesCheckbox.checked) {
          noCheckbox.checked = false;
          parameter.value = "true";
        } else {
          parameter.value = "false";
        }
        await session.customize().then((data) => {
          const event = new CustomEvent('priceUpdated')
          document.dispatchEvent(event);
        })
      });

      noCheckbox.addEventListener("change", async () => {
        if (noCheckbox.checked) {
          yesCheckbox.checked = false;
          parameter.value = "false";
        } else {
          parameter.value = "true";
        }
        await session.customize().then((data) => {
          const event = new CustomEvent('priceUpdated')
          document.dispatchEvent(event);
        })
      });
    } else if (parameter && parameter.choices) { // General case for parameters with choices
      parameter.choices.forEach((choice, index) => {
        const checkboxBox = document.createElement("div") as HTMLDivElement;
        checkboxBox.className = "checkbox-box";

        const densityLabel = document.createElement("label") as HTMLLabelElement;
        // Check for "Material Thickness" to add "MM" after the value
        densityLabel.textContent = parameter.name === "Material Thickness" ? `${choice} MM` : choice;

        const densityCheckbox = document.createElement("input") as HTMLInputElement;
        densityCheckbox.type = "radio";
        densityCheckbox.name = `density-${parameter.name.split(" ").shift()}`; // Add a name attribute to group radio buttons
        checkboxBox.appendChild(densityLabel);
        checkboxBox.appendChild(densityCheckbox);

        checkboxesContainer.appendChild(checkboxBox);

        // Check the checkbox if it matches the default value
        if (index === Number(parameter.defval)) {
          densityCheckbox.checked = true;
          currentCheckedCheckbox = densityCheckbox;
          parameter.value = String(index); // Set the parameter value to the default
        }

        densityCheckbox.addEventListener("change", async () => {
          if (densityCheckbox.checked) {
            // Uncheck the previous checkbox if a new one is checked
            if (currentCheckedCheckbox && currentCheckedCheckbox !== densityCheckbox) {
              currentCheckedCheckbox.checked = false;
            }
            currentCheckedCheckbox = densityCheckbox;
            parameter.value = index.toString(); // Update the correct parameter value
            await session.customize().then((data) => {
              const event = new CustomEvent('priceUpdated')
              document.dispatchEvent(event);
            })
          } else {
            // If the current checkbox is unchecked, clear the reference
            if (currentCheckedCheckbox === densityCheckbox) {
              currentCheckedCheckbox = null;
              parameter.value = ''; // Clear the value if no checkbox is checked
              await session.customize().then((data) => {
                const event = new CustomEvent('priceUpdated')
                document.dispatchEvent(event);
              })
            }
          }
        });
      });
      parameterWrapper.appendChild(checkboxesContainer);
    }

    // Append the parameterWrapper to the contentElement
    contentElement.appendChild(parameterWrapper);
  });
};
