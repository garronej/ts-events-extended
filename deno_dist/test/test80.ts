
import { Evt } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";;

const evtClick = Evt.create();

const evtClickCount = evtClick
    .pipe([(...[, count]) => [count + 1], 0])
    .toStateful(0)
    ;

evtClick.post();
evtClick.post();
evtClick.post();

assert(evtClickCount.state === 3);

console.log("PASS");

