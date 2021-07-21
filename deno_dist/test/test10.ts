import { Evt } from "../lib/index.ts";

let evt = Evt.create();

let i = 0;

evt.attach(() => { i++; });

let called= false;

let success= false;

evt.attachOnce(() => {
    console.assert(!called);
    success= true;
});

console.assert(evt.postCount === 0);

evt.post();
called= true;
evt.post();
evt.post();

console.assert(evt.postCount === 3);

console.assert(i === 3);

console.assert(success);

console.log("PASS");