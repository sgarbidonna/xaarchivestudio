import { IParameterApi } from "@shapediver/viewer";

export const createParameterDiv = (
  parameterObject: IParameterApi<any>,
  parentDiv: HTMLDivElement,
  groupName?: string
) => {
  const collapsibleDiv = document.createElement("div");
  collapsibleDiv.className = "collapsable";

  const label = document.createElement("p");
  label.innerText = (parameterObject.group?.name || groupName || parameterObject.name || "").toUpperCase();
  
  parentDiv.appendChild(collapsibleDiv);
  collapsibleDiv.appendChild(document.createElement("span"));

  return collapsibleDiv;
};
