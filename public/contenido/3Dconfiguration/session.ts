import { createSession as createSessionMethod } from "@shapediver/viewer";

export async function createSession() {
  return await createSessionMethod({
    ticket: "0a8d1ff88bb479a200bbf89214c5c858c8589af73aad4e7f55a3f4cedca7c5a372a2cdf09d80082d62388bfbe0f2ff19bfc89048ca22f26d3193e1be9183f886b7e75d6416824232b48a2c4e5381eeedca034d4cca366bc37f4707959364f0c064e27bafb89efe-d8ca2f63685f593856d73494f4759cea",
    //ticket: "0a8d1ff88bb479a200bbf89214c5c858c8589af73aad4e7f55a3f4cedca7c5a372a2cdf09d80082d62388bfbe0f2ff19bfc89048ca22f26d3193e1be9183f886b7e75d6416824232b48a2c4e5381eeedca034d4cca366bc37f4707959364f0c064e27bafb89efe-d8ca2f63685f593856d73494f4759cea",
    modelViewUrl: "https://sdr7euc1.eu-central-1.shapediver.com",
    initialParameterValues: {
        /* "06353841-58a1-41e8-966c-6ba817cce062": "10" */

    },
    id: "Test-Donni-Session1" 
  });
}
