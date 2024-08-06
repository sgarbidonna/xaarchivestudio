import { BUSY_MODE_DISPLAY, createSession, createViewport, FLAG_TYPE, SPINNER_POSITIONING, VISIBILITY_MODE } from "@shapediver/viewer";

(async () => {
    const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    canvasElement.style.backgroundColor = "white";

    const viewport = await createViewport({
        canvas: canvasElement,
        visibility: VISIBILITY_MODE.MANUAL,
        branding:{
        },
        id: "Test-Donni-Viewport1"  
    })

    const session = await createSession({
        ticket: "8f3e8c87b953e698033335c697ffe750fc71a58caab67c6cb6de2d24d9d469cae8ff481761b66790b5ea539faca89e570d6a18925727423ad4132a24ad6cfe8d5c8c5f676588145805842d98d7ec4d2a77eb6b5a965e3090796489959337164a872ca36e2e0e2efe36a824ba6c01c222a7df751241f94313-d4beefd5882b0bf59e3d1e54b42e8d54",
        modelViewUrl: "https://sdr7euc1.eu-central-1.shapediver.com",
        initialParameterValues: {
        },
        id: "Test-Donni-Session1" 
    })

    viewport.show = true;

})();