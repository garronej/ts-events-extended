
import { Evt } from "../lib/index.ts";
import {assert} from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/mod.ts";

const evtIsBlue= Evt.create(false);
const evtIsBig= Evt.create(false);

const evtIsBigAndBlue = Evt.merge([
    evtIsBlue.evtChange,
    evtIsBig.evtChange
])
    .toStateful()
    .pipe(()=> [ evtIsBlue.state && evtIsBig.state ])
    ;

assert(evtIsBigAndBlue.state === false as boolean);

evtIsBlue.state= true;

assert(evtIsBigAndBlue.state === false as boolean);

evtIsBig.state= true;

assert(evtIsBigAndBlue.state === true);

console.log("PASS");