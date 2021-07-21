import { Evt, distinct } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";;

const evtStr = Evt.create<string>();

const flushCtx = Evt.newCtx();

evtStr.$attach(
	distinct(str => str.split(" ")[0], flushCtx),
	str => stdout += str
);

let stdout = "";

evtStr.post("foo 1");
flushCtx.done();
evtStr.post("foo 2");
evtStr.post("bar 3");
evtStr.post("bar 4");
evtStr.post("foo 5");
evtStr.post("baz 6");

assert(stdout === "foo 1foo 2bar 3baz 6");

console.log("PASS");
