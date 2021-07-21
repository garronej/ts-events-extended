
import { Evt } from "../lib/index.ts";

const evt= Evt.create();

evt.waitFor(0);

evt.post();

evt.post();

evt.waitFor(0)
    .then(
        ()=> console.assert(false),
        ()=> {}
    )
    ;

setTimeout(()=> console.log("PASS"), 100);

