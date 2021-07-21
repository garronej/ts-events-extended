
import { Evt } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";;
import { scan } from "../lib/util/genericOperators/scan.ts";
import { getHandlerPr } from "./getHandlerPr.ts";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi.ts";

const { mustResolve, mustStayPending } = getPromiseAssertionApi({ "takeIntoAccountArraysOrdering": true });

(async () => {

    const ctx = Evt.newCtx<number>();

    const evtText = new Evt<string>();

    mustResolve({
        "promise":
            getHandlerPr(
                ctx.evtDoneOrAborted, () =>
                ctx.evtDoneOrAborted.attach(() => { })
            ).then(data => [data.result, data.handlers.length]),
        "expectedData": [43, 1]
    });

    mustResolve({
        "promise": ctx.waitFor(),
        "expectedData": 43,
    });

    const nothing = {};

    let last: string | {} = nothing;

    const prTest = mustResolve({
        "promise": ctx.evtAttach.waitFor(
            ({ handler, evt }) => (
                evt === evtText &&
                handler.ctx === ctx &&
                !handler.async &&
                !handler.once &&
                !handler.prepend &&
                handler.timeout === undefined &&
                !handler.extract
            )
        )
    });

    mustStayPending(
        ctx.evtAttach.waitFor(
            ({ handler, evt }) => !(
                evt === evtText &&
                handler.ctx === ctx &&
                !handler.async &&
                !handler.once &&
                !handler.prepend &&
                handler.timeout === undefined &&
                !handler.extract
            )
        )
    );


    evtText
        .pipe(ctx)
        .pipe(str => [str.toUpperCase()])
        .pipe(str => str.startsWith("H"))
        .pipe(scan((charCount, str) => charCount + str.length, 0))
        .pipe((count, registerSideEffect) => count <= 33 ? [`${count}`] : (registerSideEffect(() => ctx.done(43)), null))
        .attach(str => last = str)
        ;

    await prTest;

    evtText.post("hello world");
    assert(last === "11");
    last = nothing

    evtText.post("hello world");
    assert(last === "22");
    last = nothing

    evtText.post("hello world");
    assert(last === "33");
    last = nothing

    evtText.post("hello world");
    assert(last === nothing);
    assert(evtText.getHandlers().length === 0);
    assert(ctx.getHandlers().length === 0);


})();

{

    const ctx = Evt.newCtx();

    const evtText = new Evt<string>();

    mustResolve({
        "promise":
            getHandlerPr(
                ctx.evtDoneOrAborted, () =>
                ctx.evtDoneOrAborted.attach(() => { })
            ).then(({ handlers }) => handlers.length),
        "expectedData": 1
    });

    const nothing = {};

    let last: string | {} = nothing;

    evtText
        .pipe(ctx)
        .pipe(str => [str.toUpperCase()])
        .pipe(str => str.startsWith("H"))
        .pipe(scan((charCount, str) => charCount + str.length, 0))
        .pipe((count, registerSideEffect) => (count >= 33 && registerSideEffect(() => ctx.done()), [`${count}`]))
        .attach(str => last = str)
        ;


    evtText.post("hello world");
    assert(last === "11");
    last = nothing

    evtText.post("hello world");
    assert(last === "22");
    last = nothing

    evtText.post("hello world");
    assert(last === "33");
    last = nothing

    assert(evtText.getHandlers().length === 0);
    assert(ctx.getHandlers().length === 0);

    evtText.post("hello world");
    assert(last === nothing);

}

setTimeout(() => console.log("PASS"), 0);
