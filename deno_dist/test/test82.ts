//NOTE: Test type only
import * as _ from "../lib/index.ts";

_.dom.__hack;

type A = _.SwapEvtType<_.Evt<number>, void>;
const a: _.Evt<void> = null as any as A;a;

type B = _.SwapEvtType<_.Evt<number>, string | number>;
const b: _.Evt<string | number> = null as any as B; b;

type C = _.SwapEvtType<_.StatefulEvt<number>, string | number>;
const c: _.StatefulEvt<string | number>= null as any as C; c;

type D = _.SwapEvtType<_.StatefulReadonlyEvt<number>, string | Date>;
const d: _.StatefulReadonlyEvt<string | Date>= null as any as D; d;

type E = _.SwapEvtType<_.NonPostableEvt<number>, string | Date>;
const e: _.NonPostableEvt<string | Date> = null as any as E;e;

type F = _.SwapEvtType<_.Evt<undefined | number>, string | Date>;
const f: _.Evt<string | Date>= null as any as F;f

type G = _.SwapEvtType<_.Evt<number | Date>, void>;
const g: _.Evt<void> = null as any as G; g;

type H = _.SwapEvtType<_.StatefulEvt<number>, void>;
const h: _.Evt<void>= null as any as H; h;

type I = _.SwapEvtType<_.StatefulReadonlyEvt<number>, void>;
const i: _.StatefulReadonlyEvt<void> = null as any as I; i;

type J = _.SwapEvtType<_.NonPostableEvt<number>, void>;
const j: _.NonPostableEvt<void>= null as any as J;j;

type K = _.SwapEvtType<_.Evt<undefined | number>, void>;
const k :_.Evt<void> = null as any as K; k;

type L = _.SwapEvtType<_.Evt<any>, void | number>;
const l :_. Evt<number | void> = null as any as L; l;

console.log("PASS");