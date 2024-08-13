import { IParameterApi, ISessionApi } from "@shapediver/viewer";
import { createParameterDiv } from "../menu/createParamDiv";
import { collapsibleManager } from "../utils/collapsableLogic";

export const createBottomCover = (
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
    contentElement.className = "content density";
    parentDiv.appendChild(contentElement);
  
    // Variable to keep track of the currently checked checkbox
    let currentCheckedCheckbox: HTMLInputElement | null = null;
  
    // Check if parameterObject[0] and its choices are defined before using them
    if (parameterObject[0] && parameterObject[0].choices) {
      const defValIndex = parameterObject[0].choices.indexOf(parameterObject[0].defval) + 1;

      parameterObject[0].choices.forEach((choice, index) => {
        const densityBox = document.createElement("div") as HTMLDivElement;
        densityBox.className = "density-box";
  
        const densityLabel = document.createElement("p") as HTMLParagraphElement;
        densityLabel.textContent = choice;
        densityBox.appendChild(densityLabel);
  
        const densityCheckbox = document.createElement("input") as HTMLInputElement;
        densityCheckbox.type = "radio";
        densityBox.appendChild(densityCheckbox);
  
        contentElement.appendChild(densityBox);
  
        // Check the checkbox if it matches the default value
        if (String(index) === parameterObject[0].defval) {
          densityCheckbox.checked = true;
          currentCheckedCheckbox = densityCheckbox;
          parameterObject[0].value = index.toString(); // Set the parameter value to the default
        }
  
        densityCheckbox.addEventListener("change", async () => {
          if (densityCheckbox.checked) {
            // Uncheck the previous checkbox if a new one is checked
            if (currentCheckedCheckbox && currentCheckedCheckbox !== densityCheckbox) {
              currentCheckedCheckbox.checked = false;
            }
            currentCheckedCheckbox = densityCheckbox;
            parameterObject[0].value = index.toString(); // Update the correct parameterObject[0].value
            await session.customize().then((data) => {
              const event = new CustomEvent('priceUpdated')
              document.dispatchEvent(event);
            })
          } else {
            // If the current checkbox is unchecked, clear the reference
            if (currentCheckedCheckbox === densityCheckbox) {
              currentCheckedCheckbox = null;
              parameterObject[0].value = ''; // Clear the value if no checkbox is checked
              await session.customize().then((data) => {
                const event = new CustomEvent('priceUpdated')
                document.dispatchEvent(event);
              })
            }
          }
        });
      });
    }
  };