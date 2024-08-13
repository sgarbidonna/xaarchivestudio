import { ISessionApi, IViewportApi } from "@shapediver/viewer";
import {
    getOrderedParameters,
  groupParameters,
} from "../utils/parameterUtils";
// import { createPatternDesignElement } from "../collapsables/createPatternDesign";
import { createPatternColorElement } from "../collapsables/createPatternColor";
import { createDimensionsElement } from "../collapsables/createDimensions";
//import { createDensityElement } from "../collapsables/createDensity";
import { createMenu, getPriceOutput } from "./menuCreation";
import { createReferenceElement } from "../collapsables/createReference";
import { createBaseShape } from "../collapsables/createBaseShape";
import { createPanelSize } from "../collapsables/createPanelSize";
import { createPanelOptions } from "../collapsables/createPanelOptions";
import { createDividerSize } from "../collapsables/createDividerSize";
import { createDividerOptions } from "../collapsables/createDividerOptions";
import { createUnits } from "../collapsables/createUnits";
import { createTopCover } from "../collapsables/createTopCover";
import { createBottomCover } from "../collapsables/createBottomCover";
import { createBorders } from "../collapsables/createBorders";


console.log('** estoy en createdParameterMenu ** ');
    

export const createParameterMenu = async (
  session: ISessionApi,
  viewport: IViewportApi

) => {

  const conversionRate = 3.67; // AED DEFAULT

  createMenu(session, conversionRate, viewport);

  const orderedParameters = getOrderedParameters(session);
  const groupedParameters = groupParameters(orderedParameters);
  const menuDiv = document.getElementById("menu") as HTMLDivElement;

  console.log('** groupedParameters ** ', groupedParameters);
    

  for (const [groupName, parameters] of Object.entries(groupedParameters)) {

    console.log('** dentro del for en parameters ** ', parameters);
    switch (groupName) {
      
/*
      case "Pattern Color":
        parameters.forEach((parameterObject) =>
          createPatternColorElement(session, parameterObject, menuDiv)
        );
        break;
      case "Dimensions":
        createDimensionsElement(session, parameters, menuDiv, groupName);
        break;

      case "Base Shape":
        createBaseShape(session, parameters, menuDiv, groupName);
        break;

      case "Panel Size":
        createPanelSize(session, parameters, menuDiv, groupName);
      break;
      case "Panel Options":
        createPanelOptions(session, parameters, menuDiv, groupName);
      break;

        case "Divider Size":
        createDividerSize(session, parameters, menuDiv, groupName);
        break;
      case "Divider Options":
        createDividerOptions(session, parameters, menuDiv, groupName);
        break;
      case "Units":
        createUnits(session, parameters);
        break;
      case "Top Cover":
        createTopCover(session, parameters, menuDiv, groupName);
        break;
      case "Bottom Cover":
        createBottomCover(session, parameters, menuDiv, groupName);
        break;
      case "Borders":
        createBorders(session, parameters, menuDiv, groupName);
        break;
    
    
    */
   
      }

  }
    
};
