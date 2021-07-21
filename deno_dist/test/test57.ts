import { Evt } from "../lib/index.ts";
// @deno-types="https://raw.githubusercontent.com/Soremwar/deno_types/07a52c868823928b792e870a572b24af36a4b665/rxjs/v6.5.5/rxjs.d.ts"
import { Subject } from "https://cdn.skypack.dev/rxjs@6.6.7";;
import { getPromiseAssertionApi } from "../tools/testing/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/mod.ts";

(async () => {

    {

        const { mustResolve, mustStayPending } = getPromiseAssertionApi();

        const subject = new Subject<string>();

        const ctx = Evt.newCtx();

        const evtText = Evt.from(ctx, subject);

        const text = "ok";

        for (const _ of [0, 1, 2]) {


            const pr = mustResolve({
                "promise": evtText.waitFor(),
                "expectedData": text
            });

            subject.next(text);

            await pr;

        }

        assert(ctx.getHandlers().length === 0);

        ctx.done();

        mustStayPending(evtText.waitFor());

        subject.next(text);

    }

    {

        const { mustResolve } = getPromiseAssertionApi();

        const subject = new Subject<string>();

        const evtText = Evt.from<string>(subject);

        const text = "ok";

        for (const _ of [0, 1, 2]) {

            const pr = mustResolve({
                "promise": evtText.waitFor(),
                "expectedData": text
            });

            subject.next(text);

            await pr;

        }

    }

    console.log("PASS");

})();