import { IParameterApi, ISessionApi } from "@shapediver/viewer";
import { createParameterDiv } from "../menu/createParamDiv";
import { collapsibleManager } from "../utils/collapsableLogic";
import { getLink } from "../utils/getLink";

const colorLinks: { [key: string]: string } = {
  /*
  IronxGrey: "https://drive.google.com/file/d/1aU_v2oCla0EHrBL-Za6ANcp2uW39fkJd/view?usp=drive_link",
  PearlxGrey: "https://drive.google.com/file/d/1HhhaBmGBeTa7kUAgJUijJXfL1MTOmwf1/view?usp=drive_link",
  FreshxBeige: "https://drive.google.com/file/d/1zRO9A6CopGh9wT1f-V93jF0a2wAj_6Ox/view?usp=drive_link",
  BrilliantxWhite: "https://drive.google.com/file/d/1rmeO_AwD8HSiRgEOEfV-6kkl7A_T_Gq8/view?usp=drive_link",
  */
  IronxGrey: "/contenido/3Dconfiguration/assets/iron-gray.png",
  PearlxGrey: "/contenido/3Dconfiguration/assets/pearl-gray.png",
  FreshxBeige: "/contenido/3Dconfiguration/assets/gold.png",
  BrilliantxWhite: "/contenido/3Dconfiguration/assets/white.png",
};



export const createPatternColorElement = (
  session: ISessionApi,
  parameterObject: IParameterApi<string>,
  parentDiv: HTMLDivElement
) => {

  const parameterDiv = createParameterDiv(parameterObject, parentDiv);

  const contentElement = document.createElement("div") as HTMLDivElement;
  contentElement.className = "content";
  contentElement.style.position="absolute";
  contentElement.style.top="34vh";
  contentElement.style.right="8vw";

  parentDiv.appendChild(contentElement);

  if (!parameterObject.choices) return;

  let selectedImage: HTMLImageElement | null = null;

  parameterObject.choices.forEach((choice, index) => {
    if (index === 0 || index === 5 || index === 6 || index === 9){

      const patternBox = document.createElement("div") as HTMLDivElement;
      patternBox.className = "pattern-box color";
  
      const img = document.createElement("img") as HTMLImageElement;
      img.src = getLink(colorLinks, String(choice.replace(" ", "x")));
      img.id = `img-${choice.replace(" ", "-").toLowerCase()}`;
      img.style.width = '15px';
      if (index != 9) img.style.maskImage = img.style.mixBlendMode = 'darken';
      if (img.src) patternBox.appendChild(img);
      
  /*
      // NOMBRE DEL COLOR
      const patternLabel = document.createElement("p") as HTMLParagraphElement;
      patternLabel.textContent = choice;
      patternBox.appendChild(patternLabel);
  */
  
      contentElement.appendChild(patternBox);
  
      // Check if this choice is the default value
      if (parameterObject.defval === index.toString()) {
        img.classList.add("selected-pattern");
        selectedImage = img;
      }
  
      patternBox.addEventListener("click", async () => {
        if (selectedImage) {
          selectedImage.classList.remove("selected-pattern");
        }
        img.classList.add("selected-pattern");
        selectedImage = img;
  
        parameterObject.value = index.toString();
        await session.customize().then((data) => {
          const event = new CustomEvent('priceUpdated')
          document.dispatchEvent(event);
        })
    
    });
  }
  });


  parameterDiv.addEventListener("click", function (event) {
    collapsibleManager.toggleCollapsible(parameterDiv);
  });

  
};
