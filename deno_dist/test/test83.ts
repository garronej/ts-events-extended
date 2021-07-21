
import { Evt } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";

const voidEvt = Evt.create();

const evt: Evt<string> | Evt<void> = voidEvt as any;

let count = 0;

Evt.factorize(evt).attach(data => {

    if (data === undefined) {

        count++;
        return;

    }

    data.toUpperCase();


});

voidEvt.post();
voidEvt.postAsyncOnceHandled();

assert(count === 2);

console.log("PASS");











