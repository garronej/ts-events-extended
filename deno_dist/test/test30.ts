
import { Evt } from "../lib/index.ts";

let evt = new Evt<number | string>();

evt.enableTrace({
    "id": "myEvent", 
    "formatter": n => n.toString(), 
    "log": str => console.assert(str === "(myEvent) 1 handler, 666" )
});

evt.postAsyncOnceHandled(666);

evt.attachOnce(
    evtData => typeof evtData === "string",
    ()=> { throw new Error(); }
);

evt.attachOnce(
    evtData=> {

        console.assert(evtData === 666);

        console.log("PASS");

    }
);


