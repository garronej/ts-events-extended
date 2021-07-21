import { Evt } from "../lib/index.ts";

let evt = new Evt<string>();

//evt.enableTrace("evt");

let i = 0;

evt.attach(data => {

    if (i === 0) console.assert(data === "tick", "m1");
    else console.assert(data === "tack", "m2");

    i++;

});

evt.attachOnce(data => {
    console.assert(data === "tick", "m3")
});

console.assert(evt.postCount === 0, "m4");

evt.post("tick");
evt.post("tack");

evt.post("tack");

console.assert(evt.postCount === 3, "m5");

console.assert(i === 3, "m6");

console.log("PASS");