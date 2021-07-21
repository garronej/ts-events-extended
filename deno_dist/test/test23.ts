import { Evt } from "../lib/index.ts";
import { EventEmitter } from "https://deno.land/std@0.85.0/node/events.ts";

let success = 0;

(() => {

    let e = new EventEmitter();

    let evt = new Evt<string>();

    e.on("click", str=> evt.post(str));

    evt.waitFor(200).then(
        str => {

            console.assert(str === "foo");

            success++;

        }
    );

    e.emit("click", "foo");


})();

(() => {

    let e = new EventEmitter();

    let evt = new Evt<string>();

    e.on("click", (a, b)=> evt.post(a+b));

    evt.waitFor(200).then(
        str => {

            console.assert(str === "foobar", "m");

            success++;

        }
    );

    e.emit("click", "foo", "bar");

})();



setTimeout(() => {

    console.assert(success === 2);

    console.log("PASS");

}, 2000);







