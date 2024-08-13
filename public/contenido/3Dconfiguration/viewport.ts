import { SPINNER_POSITIONING, VISIBILITY_MODE, createViewport as createViewportMethod } from "@shapediver/viewer";

export async function createViewport() {
  return await createViewportMethod({
    canvas: document.getElementById("canvas") as HTMLCanvasElement,
    id: "Test-Donni-Viewport1",
    visibility: VISIBILITY_MODE.MANUAL,
    branding: {
      spinnerPositioning: SPINNER_POSITIONING.CENTER
    }
  });
}

