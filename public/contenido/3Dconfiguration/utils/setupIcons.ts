import { handleArView } from "./handleAr";
import { IViewportApi } from "@shapediver/viewer";

let globalCameraValue = "";

export function setupIcons(canvas: HTMLElement, viewport: IViewportApi): void {
  const fullScreenIcon = createIcon(
    "https://drive.google.com/thumbnail?id=1shsfVtKCTZC-fIqMXmosdcB3Kk-iG4w7&sz=w1000",
    "View in Fullscreen",
    "fs-icon"
  );

  const zoomExtentsIcon = createIcon(
    "https://drive.google.com/thumbnail?id=1see0GT5uzLB8FJat2fbs5r_LTWVWCSte&sz=w1000",
    "Zoom Extent",
    "ze-icon"
  );

  const arIcon = createIcon(
    "https://drive.google.com/thumbnail?id=1scF7Hf1D341LqZKUTJAad8JzkqUoVnmo&sz=w1000",
    "View in AR",
    "ar-icon"
  );

  const cameras = createIcon(
    "https://drive.google.com/thumbnail?id=1t6h6Y9Tf-7x6M4hS26s3bK0BVOdWmVnx&sz=w1000",
    "Set Camera",
    "camera-icon"
  );

  zoomExtentsIcon.addEventListener("click", () => {
    viewport.camera?.zoomTo();
    viewport.assignCamera(globalCameraValue);
    viewport.update();
  });

  function getCameraOptions(cameraObject: any) {
    return Object.keys(cameraObject);
  }

  cameras.addEventListener("click", () => {
    const cameras = getCameraOptions(viewport.cameras);

    // Check if "perspective" is in the array
    const perspectiveIndex = cameras.indexOf("perspective");

    if (perspectiveIndex !== -1) {
      // Remove "perspective" from its current position
      const [perspective] = cameras.splice(perspectiveIndex, 1);
      // Add "perspective" to the beginning of the array
      cameras.unshift(perspective);
    }
    const grabSelect = document.getElementById("camera-options");

    if (!grabSelect) return;

    if (grabSelect?.style.display === "flex") {
      grabSelect.style.display = "none";
    } else {
      // Clear existing options
      grabSelect.innerHTML = "";

      // Show the dropdown
      grabSelect.style.display = "flex";

      // Add new options
      cameras.forEach((camera) => {
        const optionElement = document.createElement("div") as HTMLDivElement;
        optionElement.innerText = camera.toUpperCase();
        grabSelect.appendChild(optionElement);
        optionElement.addEventListener("click", () => {
          viewport.assignCamera(camera.toLowerCase());
          grabSelect.style.display = "none";
          globalCameraValue = camera;
        });
      });
    }
  });

  arIcon.addEventListener("click", () => handleArView(viewport));

  fullScreenIcon.addEventListener("click", () => {
    if (document.body.classList.contains("fullscreen")) {
      // Exiting fullscreen
      document.body.classList.remove("fullscreen");
      const menu = document.getElementById("menu-id") as HTMLDivElement;
      const referenceMenu = document.getElementById(
        "params-menu-box"
      ) as HTMLDivElement;
      referenceMenu.style.display = "flex";
      menu.style.display = "flex";
      const canvasContainer = document.getElementById(
        "canvas-container"
      ) as HTMLDivElement;
      canvasContainer.style.width = "70%";
      canvasContainer.style.height = "600px";
      fullScreenIcon.src =
        "https://drive.google.com/thumbnail?id=1sAKxKMeZFZTkYZRS-S1rabXT9Na9aKcd&sz=w1000";
      // Send a message to the parent window to scroll back to the top
      window.parent.postMessage({ action: "exitFullscreen" }, "*");
    } else {
      document.body.classList.add("fullscreen");
      const menu = document.getElementById("menu-id") as HTMLDivElement;
      menu.style.display = "none";
      const referenceMenu = document.getElementById(
        "params-menu-box"
      ) as HTMLDivElement;
      referenceMenu.style.display = "none";
      const canvasContainer = document.getElementById(
        "canvas-container"
      ) as HTMLDivElement;
      canvasContainer.style.width = "100%";
      canvasContainer.style.height = "100%";
      fullScreenIcon.src =
        "https://drive.google.com/thumbnail?id=1sp9xeyqjN9sSU4ioYAfGtxgQ7DTHSqIn&sz=w1000";
      // Send a message to the parent window to scroll down by 200px
      window.parent.postMessage({ action: "enterFullscreen" }, "*");
    }
  });
  canvas.appendChild(cameras);
  canvas.appendChild(arIcon);
  canvas.appendChild(zoomExtentsIcon);
  canvas.appendChild(fullScreenIcon);
}

function createIcon(src: string, alt: string, id: string): HTMLImageElement {
  const icon = document.createElement("img") as HTMLImageElement;
  icon.src = src;
  icon.alt = alt;
  icon.id = id;
  return icon;
}
