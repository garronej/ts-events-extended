//NOTE: type only

import * as _ from "../lib/index.ts";

_.dom.__hack;

type A= _.UnpackEvt<_.Evt<void | number>>;
const a: number | void = null as any as A; a;
const aa: A= null as any as number | void; aa;

type B = _.UnpackEvt<_.Evt<number> | _.Evt<void>>;
const b: void | number = null as any as B; b;
const bb: B = null as any as void | number; bb;

console.log("PASS");


