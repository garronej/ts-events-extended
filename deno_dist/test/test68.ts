import { Evt } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";;

let warn_str = "";

Object.defineProperty(console, "warn", {
    "value": (str: string) => warn_str += str + "\n"
});

const evt = new Evt();


for (let i = 1; i <= 60; i++) {

    if (i === 27) {

        evt.enableTrace({
            "id": "my event",
            "log": false
        });

    }

    evt.attach(function () {
        console.log("identification from source");
    });

}

const warn_str_expected =
    `MaxHandlersExceededWarning: Possible Evt memory leak detected.26 handlers attached.
Use Evt.prototype.setMaxHandlers(n) to increase limit on a specific Evt.
Use Evt.setDefaultMaxHandlers(n) to change the default limit currently set to 25.

26 handlers like:
{
  hasCtx: false,
  once: false,
  prepend: false,
  extract: false,
  isWaitFor: false,
  callback: function () {
        console.log("identification from source");
    }
}

To validate the identify of the Evt instance that is triggering this warning you can call Evt.prototype.enableTrace({ "id": "My evt id", "log": false }) on the Evt that you suspect.

MaxHandlersExceededWarning: Possible Evt memory leak detected.52 handlers attached to "my event".
Use Evt.prototype.setMaxHandlers(n) to increase limit on a specific Evt.
Use Evt.setDefaultMaxHandlers(n) to change the default limit currently set to 25.

52 handlers like:
{
  hasCtx: false,
  once: false,
  prepend: false,
  extract: false,
  isWaitFor: false,
  callback: function () {
        console.log("identification from source");
    }
}

`;

assert(warn_str === warn_str_expected);

console.log("PASS");

