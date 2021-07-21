import { Evt } from "../lib/index.ts";

let evt = new Evt<string>();


setTimeout(() => {
    evt.post("foo");
    setImmediate( ()=> evt.post("bar"));
}, 100);

let success= false;

(async () => {
    
    console.assert(await evt.waitFor() === "foo");

    console.assert(await evt.waitFor() === "bar");

    success= true;

})();


setTimeout(()=>{

    console.assert(success);

    console.log("PASS");

}, 2000);




