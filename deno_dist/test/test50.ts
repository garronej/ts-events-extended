
import { Evt } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";

const evtAge = new Evt<number>();


let p_: number;

evtAge.$attach(
    [(...[, prev]) => [prev + 1], 0],
    Evt.newCtx(),
    p => p_ = p
);

evtAge.post(1);
evtAge.post(1);
evtAge.post(1);


assert(p_! === 3);

console.log("PASS");

