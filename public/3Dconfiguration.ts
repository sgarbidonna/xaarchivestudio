import { createSession, createViewport, VISIBILITY_MODE } from "@shapediver/viewer";
import { createParameterMenu } from "./contenido/3Dconfiguration/menu/createParameterMenu";
//import { setupIcons } from "./contenido/3Dconfiguration/utils/setupIcons";

console.log('** estoy en 3Dconfiguration.ts **');
//https://shapediver-model.vercel.app/?ticket=31a9568985181ba0a1969a45484dc5eb3dc41941ad9904a7b20e5b4442d1f778d1879ada4c5ebe3784937a9d2b913d1752535bd8dfd28f6c770ed91f899035aff9b2ae923da41d84bc0c7bfa502c321822e249d618a37eef635f3b7901f2d2d3a41799999788c6-8be8497e7d1fe9a6148502e02c563995

(async () => {
    const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    
    if (!canvasElement) {
        return;
    }

    const viewport = await createViewport({
        canvas: canvasElement,
        visibility: VISIBILITY_MODE.MANUAL,
        id: "Test-Donni-Viewport1" 
    
    
    })

    const session = await createSession({
        // ticket web y localhost no cambian 
        ticket: "0a8d1ff88bb479a200bbf89214c5c858c8589af73aad4e7f55a3f4cedca7c5a372a2cdf09d80082d62388bfbe0f2ff19bfc89048ca22f26d3193e1be9183f886b7e75d6416824232b48a2c4e5381eeedca034d4cca366bc37f4707959364f0c064e27bafb89efe-d8ca2f63685f593856d73494f4759cea",
        modelViewUrl: "https://sdr7euc1.eu-central-1.shapediver.com",
        id: "Test-Donni-Session1"
    })

    createParameterMenu(session, viewport);

    viewport.show = true;
    
     //setupIcons(canvasElement, viewport);

})();


