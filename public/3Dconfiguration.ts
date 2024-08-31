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
        id: "Test-Donni-Viewport1", 
        branding:{
//            logo:'./contenido/logos/Loading.gif'
            logo: null
        }
    
    })

    const session = await createSession({
        
        ticket: "155162dcc6be40d0efd1f33d6fd112726e67431e3a51ddfe4055f9ee3742526d97120ab75f29e41e1ca91e60deb181e474e29d110ee57a562bafdbc06a7e3229960b3ecd66d8e6aaa9b7d99c37d30779df5335e4958597a6425dd26d4dd068c9fb444b2a9458ce-991f18a5227aa23c59a6d44f8dcecb55",
        modelViewUrl: "https://sdr7euc1.eu-central-1.shapediver.com",
        id: "Test-Donni-Session1"
    })

    createParameterMenu(session, viewport);
    viewport.automaticResizing = true;
    viewport.show = true;

    

     //setupIcons(canvasElement, viewport);

})();


