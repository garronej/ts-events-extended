
import { Evt } from "../lib/index.ts";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi.ts";
import { getHandlerPr } from "./getHandlerPr.ts";

const { mustResolve } = getPromiseAssertionApi();

const evtText = new Evt<{ p: string }>();

const obj = { "p": "foo" };

mustResolve({
    "promise": getHandlerPr(
        evtText,
        () =>
            evtText.attach(
                obj_ => !!obj_.p.match("foo") as any as boolean,
                obj_ => obj_ === obj
            )
    ),
    "expectedData": obj
});


evtText.post(obj);

setTimeout(() => console.log("PASS"), 0);