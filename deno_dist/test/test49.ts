
import { Evt, Handler, Ctx } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";
import { getPromiseAssertionApi } from "../tools/testing/index.ts";
import { sameFactory } from "../tools/inDepth/index.ts";
import { getHandlerPr } from "./getHandlerPr.ts";


const { same } = sameFactory({ "takeIntoAccountArraysOrdering": false });

const { mustResolve } = getPromiseAssertionApi();

const evtText = new Evt<string>();

const evtAge = new Evt<number>();

const ctx = Evt.newCtx();

const prText = getHandlerPr(evtText,()=> evtText.attach(ctx, () => assert(false)));
const prAge = getHandlerPr(evtAge, ()=> evtAge.attach(ctx, () => assert(false)));

const handlers_ = [
    ...(evtText.getHandlers() as Handler<string, any, Ctx<any>>[]).map(handler => ({ handler, "evt": evtText })),
    ...(evtAge.getHandlers() as Handler<string, any, Ctx<any>>[]).map(handler => ({ handler, "evt": evtAge }))
];

mustResolve({
    "promise":
        getHandlerPr(
            ctx.evtDoneOrAborted,
            () =>
                ctx.evtDoneOrAborted.attachOnce(
                    ({ handlers }) => assert(same(
                        handlers,
                        handlers_
                    ))
                ))
});

mustResolve({
    "promise": getHandlerPr(
        evtAge.evtDetach,
        ()=> evtAge.evtDetach.attachOnce(handler => assert(handler.ctx === ctx))
    ),
    "delay": 0
});

const prTest = Promise.all([
    mustResolve({
        "promise": ctx.evtDetach.waitFor(
            ({ handler, evt }) => (
                evt === evtText &&
                handler.ctx === ctx &&
                handler.timeout === undefined &&
                handler.promise === prText
            )
        )
    }),
    mustResolve({
        "promise": ctx.evtDetach.waitFor(
            ({ handler, evt }) => (
                evt === evtAge &&
                handler.ctx === ctx &&
                handler.timeout === undefined &&
                handler.promise === prAge
            )
        )
    })
]);


ctx.done();

assert(evtText.getHandlers().length === 0);
assert(evtAge.getHandlers().length === 0);

evtText.post("nothing");
evtAge.post(0);

prTest.then(() => console.log("PASS"));

