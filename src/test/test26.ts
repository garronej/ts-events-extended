
import { Evt } from "../lib";
import { UnpackEvt, NonPostable } from "../lib/types/helper";
type UnpackEvt_<T> = import("../lib/types/helper").UnpackEvt<T>;

{

    let evt = new Evt<number>();

    evt.enableTrace({
        "id": "myEvent", 
        "formatter": n => n.toString(), 
        "log": str => console.assert(str === "(myEvent) 1 handler, 666")
    });

    evt.attachOnce(n => console.assert(n === 666));

    evt.post(666);

    const n: UnpackEvt<typeof evt> = 666;

    n;

    const n_: UnpackEvt_<typeof evt> = 666;

    n_;

}

{

    const evt: NonPostable<Evt<string>> = new Evt();

    const str: UnpackEvt<typeof evt> = "ok";

    str;

}

console.log("PASS".green);
