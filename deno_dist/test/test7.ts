import { Evt } from "../lib/index.ts";

let evt = new Evt<number>();


process.nextTick(() => evt.post(666));

let success= false;

(async () => {
    
    let n= await evt.waitFor();

    console.assert( n === 666 );

    success= true;

})();


setTimeout(()=>{

    console.assert(success);

    console.log("PASS");

}, 2000);