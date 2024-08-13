import { FLAG_TYPE, IViewportApi } from "@shapediver/viewer";

function showModal() {
  const getRefBox = document.getElementById("ref-box-id") as HTMLDivElement;
  if (getRefBox) getRefBox.style.zIndex = "1";
  const modal = document.getElementById("ar-modal");
  const arIcon = document.getElementById("ar-icon");
  if (modal && arIcon) {
    modal.style.display = "flex";
  } else {
    console.error("Modal element with id 'ar-modal' not found.");
  }
}

function hideModal() {
  const getRefBox = document.getElementById("ref-box-id") as HTMLDivElement;
  if (getRefBox) getRefBox.style.zIndex = "9999";
  const modal = document.getElementById("ar-modal");
  const arIcon = document.getElementById("ar-icon");
  if (modal && arIcon) {
    modal.style.display = "none";
    arIcon.style.display = "flex";
  } else {
    console.error("Modal element with id 'ar-modal' not found.");
  }
}

export async function handleArView(viewport: IViewportApi) {
  showModal();
  const token = viewport.addFlag(FLAG_TYPE.BUSY_MODE);
  if (viewport.viewableInAR()) {
    await viewport.viewInAR();
    hideModal()
  } else {
    const qrContainer = document.getElementById(
      "qr-container"
    ) as HTMLDivElement;
    const closeBtn = document.getElementById("close-btn-ar") as HTMLButtonElement;
    closeBtn.addEventListener("click", hideModal)
    const qr = await viewport.createArSessionLink(undefined, true);
    const image = new Image();
    if (qr && image) {
      const getQrSpinner = document.getElementById("qr-spinner");
      if (getQrSpinner) getQrSpinner.style.display = "none"
    }
    image.src = qr;
    qrContainer.appendChild(image);
  }
  viewport.removeFlag(token);
}
