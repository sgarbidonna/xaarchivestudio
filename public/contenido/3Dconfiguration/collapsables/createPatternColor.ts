import { IParameterApi, ISessionApi } from "@shapediver/viewer";
import { createParameterDiv } from "../menu/createParamDiv";
import { collapsibleManager } from "../utils/collapsableLogic";
import { getLink } from "../utils/getLink";

const colorLinks: { [key: string]: string } = {

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
  contentElement.id = "pattern-colors";
  contentElement.style.position="absolute";
  contentElement.style.top="34vh";
  contentElement.style.right="2vw";

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
      

      contentElement.appendChild(patternBox);
  
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
