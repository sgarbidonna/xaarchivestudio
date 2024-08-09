import { createSession, createViewport, FLAG_TYPE, SPINNER_POSITIONING, VISIBILITY_MODE } from "@shapediver/viewer";

console.log('estoy en   3Dconfiguration.ts');
//https://shapediver-model.vercel.app/?ticket=31a9568985181ba0a1969a45484dc5eb3dc41941ad9904a7b20e5b4442d1f778d1879ada4c5ebe3784937a9d2b913d1752535bd8dfd28f6c770ed91f899035aff9b2ae923da41d84bc0c7bfa502c321822e249d618a37eef635f3b7901f2d2d3a41799999788c6-8be8497e7d1fe9a6148502e02c563995

(async () => {
    const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    
    canvasElement.style.backgroundColor = "red";

    const viewport = await createViewport({
        canvas: canvasElement,
        visibility: VISIBILITY_MODE.MANUAL,
        
        id: "Test-Donni-Viewport1"  /*unique id of my viewport and session*/
    })

    const session = await createSession({
        ticket: "8f3e8c87b953e698033335c697ffe750fc71a58caab67c6cb6de2d24d9d469cae8ff481761b66790b5ea539faca89e570d6a18925727423ad4132a24ad6cfe8d5c8c5f676588145805842d98d7ec4d2a77eb6b5a965e3090796489959337164a872ca36e2e0e2efe36a824ba6c01c222a7df751241f94313-d4beefd5882b0bf59e3d1e54b42e8d54",
         modelViewUrl: "https://sdr7euc1.eu-central-1.shapediver.com",
        initialParameterValues: {
            /* "06353841-58a1-41e8-966c-6ba817cce062": "10" */
        },
        id: "Test-Donni-Session1" 
    })

    viewport.show = true;
    /* viewport.addFlag(FLAG_TYPE.BUSY_MODE)*/ 

})();