

import { Evt } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/mod.ts";


const evtText = Evt.create("foo");

evtText.state = "bar";

assert(evtText.evtChange.state === "bar" as string);

evtText.state = "baz";

assert(evtText.evtChange.state === "baz");

console.log("PASS");
