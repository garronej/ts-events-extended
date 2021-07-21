
import { Evt, nonNullable } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/mod.ts";

(async ()=>{

    const evtText = Evt.create<string | undefined>();

    const prText = evtText.waitFor(nonNullable(), 200);

    evtText.post(undefined);
    evtText.post("foo");

    assert(await prText === "foo");

    console.log("PASS");

})();