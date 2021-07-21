
import { Evt, throttleTime } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/mod.ts";

const evtCount = new Evt<number>();

let internalCount= 0;

evtCount
    .pipe(throttleTime(900))
    .attach(count => { 
        internalCount++;
        assert(count % 3 === 0); 
    })
    ;

(async () => {

    let count = 0;

    while (true) {

        evtCount.post(count);

        await new Promise(resolve => setTimeout(resolve, 300));

        count++;

        if( count === 7 ){
            break;
        }

    }

    assert(internalCount === 3 );

    console.log("PASS");

})();