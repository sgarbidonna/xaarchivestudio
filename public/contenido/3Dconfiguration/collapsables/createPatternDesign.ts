import { IParameterApi, ISessionApi } from "@shapediver/viewer";
import { createParameterDiv } from "../menu/createParamDiv";
import { collapsibleManager } from "../utils/collapsableLogic";
import { getLink } from "../utils/getLink";

const imageLinks: { [key: string]: string } = {
  Afternoon:
    "https://drive.google.com/thumbnail?id=1ZDBDDyPjY_uYNic28e-xtQy-v8sS3LIW&sz=w1000",
  Arabian:
    "https://drive.google.com/thumbnail?id=1FaMUYam775w9cSfGKeYBukfYKpXnW0_a&sz=w1000",
  Champagne:
    "https://drive.google.com/thumbnail?id=1kBoKEQUA7OZV9-Iy241cNj1UVf5LmEmD&sz=w1000",
  Midnight:
    "https://drive.google.com/thumbnail?id=1RJBpzIdB4b9vt4olM52LNA2tZ6fOgx5a&sz=w1000",
  Millwork:
    "https://drive.google.com/thumbnail?id=1uPrr5Cm9t9LZysvEdRZs9bWl7NBoChI7&sz=w1000",
  Timeless:
    "https://drive.google.com/thumbnail?id=1bwJi1F1nY3Zq1aLpM5mrRrQWvJ2s5rMR&sz=w1000",
};

export const createPatternDesignElement = (
  session: ISessionApi,
  parameterObject: IParameterApi<string>,
  parentDiv: HTMLDivElement
) => {
  const parameterDiv = createParameterDiv(parameterObject, parentDiv);

  const contentElement = document.createElement("div") as HTMLDivElement;
  contentElement.className = "content pattern";
  parentDiv.appendChild(contentElement);

  if (!parameterObject.choices) return;

  let selectedImage: HTMLImageElement | null = null;

  parameterObject.choices.forEach((choice, index) => {
    const patternBox = document.createElement("div") as HTMLDivElement;
    patternBox.className = "pattern-box";

    const img = document.createElement("img") as HTMLImageElement;
    img.src = getLink(imageLinks, String(choice.split(" ").shift()));
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
