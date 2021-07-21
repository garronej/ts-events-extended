import { Evt } from "../lib/index.ts";

let evt= new Evt<string>();

evt.attach(()=>{});

evt.attachOnce(()=>{});

evt.waitFor();

evt.attachPrepend(Evt.newCtx(), ()=>{});

let detachedHandlers= evt.detach();

console.assert( detachedHandlers.length === 4, "m1" );

console.assert( !evt.getHandlers().length ,"m2");

console.log("PASS");
