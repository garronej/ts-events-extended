import { Evt } from "../lib/index.ts";

let evt = Evt.create();

setTimeout(() => {
    evt.post();
    setImmediate( ()=> evt.post());
}, 100);

let pass= false;

(async () => {
    
    await evt.waitFor();

    await evt.waitFor();

    pass= true;

})();

setTimeout(()=> {

    console.assert(pass);

    console.log("PASS");

}, 2000);


