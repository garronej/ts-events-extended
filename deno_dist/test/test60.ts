
import { Evt } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";

const obj1: never[] = [] as any;
const obj2 = {};
const obj3 = () => { };

for (const obj of [obj1, obj2, obj3] as const) {

    assert(Evt.getCtx(obj) === Evt.getCtx(obj));

}

assert(Evt.getCtx(obj1) !== Evt.getCtx(obj2));
assert(Evt.getCtx(obj1) !== Evt.getCtx(obj3));
assert(Evt.getCtx(obj2) !== Evt.getCtx(obj3));

console.log("PASS");

