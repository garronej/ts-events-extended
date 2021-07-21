import { Evt } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";;

let stdout = "";

const evt = Evt.create("foo");


evt.evtAttach.attach(() => { stdout += "never"; });

evt.attachOnce(text => { stdout += text });

assert( stdout === "foo" );

console.log("PASS");
