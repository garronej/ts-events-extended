import { Evt } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";

const evtText = new Evt<string>();

const text = "ok";

evtText.evtAttach.attach(
    ({ op })=> evtText.isHandledByOp(op, text),
    () => evtText.post(text)
);

let str = "";

evtText.attachOnce(str_ => str = str_);

assert(str === "ok");

console.log("PASS");
