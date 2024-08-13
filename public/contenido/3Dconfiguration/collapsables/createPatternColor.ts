import { IParameterApi, ISessionApi } from "@shapediver/viewer";
import { createParameterDiv } from "../menu/createParamDiv";
import { collapsibleManager } from "../utils/collapsableLogic";
import { getLink } from "../utils/getLink";

const colorLinks: { [key: string]: string } = {
  IronxGrey: "https://drive.google.com/thumbnail?id=1YZHpGyfGnf4kj1FfJuvONigMt6OJpWpZ&sz=w1000",
  PearlxGrey: "https://drive.google.com/thumbnail?id=1NnX-EaL--09llKTkPeMIjxLDyV7f4xxU&sz=w1000",
  FreshxBeige: "https://drive.google.com/thumbnail?id=1YhdRyfzLmbNURwmtRpDFNNGifDfgdc1Y&sz=w1000",
  BrilliantxWhite: "https://drive.google.com/thumbnail?id=1v7ufo5RaQo3XKeS1GI-dJB2QPsQUuDf7&sz=w1000",
};

export const createPatternColorElement = (
  session: ISessionApi,
  parameterObject: IParameterApi<string>,
  parentDiv: HTMLDivElement
) => {

  const parameterDiv = createParameterDiv(parameterObject, parentDiv);

  const contentElement = document.createElement("div") as HTMLDivElement;
  contentElement.className = "content";
  parentDiv.appendChild(contentElement);

  if (!parameterObject.choices) return;

  let selectedImage: HTMLImageElement | null = null;

  parameterObject.choices.forEach((choice, index) => {
    const patternBox = document.createElement("div") as HTMLDivElement;
    patternBox.className = "pattern-box color";

    const img = document.createElement("img") as HTMLImageElement;
    img.src = getLink(colorLinks, String(choice.replace(" ", "x")));
    patternBox.appendChild(img);

    const patternLabel = document.createElement("p") as HTMLParagraphElement;
    patternLabel.textContent = choice;
    patternBox.appendChild(patternLabel);

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
  });

  parameterDiv.addEventListener("click", function (event) {
    collapsibleManager.toggleCollapsible(parameterDiv);
  });
};
