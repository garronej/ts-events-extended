
//NOTE: We want it to work with undefined for user that can't use null (eslint rule)

import { Evt } from "../lib/index.ts";
import { getHandlerPr } from "./getHandlerPr.ts";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi.ts";

const { mustStayPending } = getPromiseAssertionApi();

const evt = new Evt<string | string[]>();

mustStayPending(
    getHandlerPr(evt, () =>
        evt.$attach(
            (data): [string] | null => typeof data !== "string" ? undefined as unknown as null : [data],
            () => { }
        ))
)

mustStayPending(
    evt.waitFor(
        (data): [string] | null => typeof data !== "string" ? undefined as unknown as null : [data]
    )
);

evt.post(["a", "b", "c"]);
evt.post(["a", "b", "c", "d"]);

console.log("PASS");

