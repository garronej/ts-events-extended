
import { Evt, to } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";


const evt = new Evt<["event1", string] | ["event2", number]>();

const callback = ()=> assert(false);

evt.$attach(to("event1"), callback);
evt.$attach(to("event1"), callback);

evt.getHandlers()
    .filter(handler => (
        to("event1") === handler.op && 
        handler.callback === callback
    ))
    .forEach(({ detach })=> detach());

console.log("PASS");
