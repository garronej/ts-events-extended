
import { Evt, to, dom } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";

const evt = new Evt<
    ["text", string] |
    ["time", number]
>();

let text_: string = "";

evt.$attach(to("text"), text => text_ = text);

let time_: number = NaN;

evt.$attachOnce(to("time"), time => time_ = time);

evt.post(["text", "hi!"]);
evt.post(["time", 123]);
evt.post(["time", 1234]);

assert(text_ === "hi!");
assert(time_ === 123);

declare const document: dom.Document;


if (1 === 1 + 1) {

    const evtBtnClick2 = Evt.merge([
        Evt.from(document, "click").pipe(event => [["CLOSE", event] as const]),
        Evt.from(document, "MSGestureChange").pipe(event => [["SUBMIT", event] as const])
    ]);

    evtBtnClick2.$attach(to("CLOSE"), event => event.screenY);
    evtBtnClick2.$attach(to("SUBMIT"), event => event.defaultPrevented);

    const evtBtnClick = Evt.merge(
        (["close", "submit"] as const)
            .map(id => Evt.from(
                document.getElementById(id)!, "click")
                .pipe(event => [[id, event] as const])
            )
    );

    evtBtnClick.$attach(to("close"), event => event.movementX)

    const evt3 = Evt.merge(
        (["wheel", "click"] as const)
            .map(id => Evt.from(document, id).pipe(event => [[id, event] as const]))
    );

    evt3.$attach(to("wheel"), event => "movementX" in event ? event.movementX : null);

}

console.log("PASS");

