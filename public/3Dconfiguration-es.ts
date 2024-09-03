import { createSession, createViewport, VISIBILITY_MODE } from "@shapediver/viewer";
import { createParameterMenu } from "./contenido/3Dconfiguration/menu/createParameterMenu";
//import { setupIcons } from "./contenido/3Dconfiguration/utils/setupIcons";
//https://shapediver-model.vercel.app/?ticket=31a9568985181ba0a1969a45484dc5eb3dc41941ad9904a7b20e5b4442d1f778d1879ada4c5ebe3784937a9d2b913d1752535bd8dfd28f6c770ed91f899035aff9b2ae923da41d84bc0c7bfa502c321822e249d618a37eef635f3b7901f2d2d3a41799999788c6-8be8497e7d1fe9a6148502e02c563995



(async () => {
    const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    
    if (!canvasElement) {
        return;
    }

    const viewport = await createViewport({
        canvas: canvasElement,
        visibility: VISIBILITY_MODE.MANUAL,
        id: "viewport-es", 
        branding:{
//            logo:'./contenido/logos/Loading.gif'
            logo: null
        }
    
    })

    const session = await createSession({
        
        ticket: "e18b776a78927fd246006e8a3af6f2e05fcd0d965d4d54a6b2715000d6edb8139efffdc3d9f49a034cb0ffb4706eda8dc842fe069e1a8ab7949c0585ec3386c45f932cb99c9f1241d8a1dd1ff62ef6c89c9ce7eaac091c4fcb680460a90a249b65c14feea64f8a-650f593ddd1f746b8146a2b16ae27022",
        modelViewUrl: "https://sdr7euc1.eu-central-1.shapediver.com",
        id: "xaarchives-es"
    })

    createParameterMenu(session, viewport);
    viewport.automaticResizing = true;
    viewport.show = true;

    

     //setupIcons(canvasElement, viewport);

})();


