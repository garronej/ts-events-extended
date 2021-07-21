
import { Evt, throttleTime } from "../lib/index.ts";
import type * as dom from "../lib/types/lib.dom.ts";

declare const document: dom.Document;

//Type only test
if (1 + 0 === 2) {

    {

        let count = 0;
        const rate = 1000;
        let lastClick = Date.now() - rate;
        document.addEventListener('click', event => {
            if (Date.now() - lastClick >= rate) {
                count += event.clientX;
                console.log(count);
                lastClick = Date.now();
            }
        });

    }


    //clientX should be number
    Evt.from(document, "click")
        .pipe(
            throttleTime(1000),
            event => [parseInt(event.clientX.toFixed())],
            [(clientX, count) => [count + clientX], 0]
        ).attach(count => console.log(count));

    {

        let count = 0;
        const rate = 1000;
        let lastClick = Date.now() - rate;
        document.getElementById("app")!.addEventListener('click', event => {
            if (Date.now() - lastClick >= rate) {
                count += event.clientX;
                console.log(count);
                lastClick = Date.now();
            }
        });

    }

    //clientX should be number
    Evt.from(document.getElementById("app")!, "click")
        .pipe(
            throttleTime(1000),
            event => [parseInt(event.clientX.toFixed())],
            [(clientX, count) => [count + clientX], 0]
        ).attach(count => console.log(count));

}

console.log("PASS");

