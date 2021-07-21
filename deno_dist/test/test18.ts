import { Evt } from "../lib/index.ts";

let count= 0;

let evt= Evt.create();

//evt.enableTrace("evt");

evt.waitFor().then(()=> console.assert(++count===5, "m2"));


console.assert(++count === 1, "m3");

evt.attachOnce(()=> console.assert(++count===2, "m4"));
evt.post();

console.assert(++count === 3, "m5");

let success= false;

evt.attachOnce(()=> {
    console.assert(++count === 4, "m6");

    success= true;

});
evt.post();

setTimeout(()=>{

    console.assert(success);

    console.log("PASS");

}, 2000);








