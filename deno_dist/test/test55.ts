
import { Evt } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi.ts";

(async () => {

    {

        const { mustResolve } = getPromiseAssertionApi();

        const evtText = new Evt<string>();

        const evtAge = new Evt<number>();

        const ctx = Evt.newCtx();

        const evtUnion = Evt.merge(ctx, [evtText, evtAge]);

        assert( ctx.evtAttach.postCount ===2  );

        const text = "ok";

        const age = 88;

        {

            const pr = mustResolve({
                "promise": evtUnion.waitFor(),
                "expectedData": text
            });

            evtText.post(text);

            await pr;

        }

        {

            const pr = mustResolve({
                "promise": evtUnion.waitFor(),
                "expectedData": age
            });

            evtAge.post(age);

            await pr;

        }

        assert(evtText.getHandlers().length === 1);
        assert(evtAge.getHandlers().length === 1);

        ctx.getHandlers()
            .filter(({ evt }) => evt === evtText)
            .forEach(({ handler }) => handler.detach())
            ;

        assert(evtText.getHandlers().length === 0);
        assert(evtAge.getHandlers().length === 1);


        ctx.getHandlers()
            .filter(({ evt }) => evt === evtAge)
            .forEach(({ handler }) => handler.detach())
            ;

        assert( ctx.evtDetach.postCount ===2  );

        assert(evtAge.getHandlers().length === 0);

    }

    {

        const { mustResolve } = getPromiseAssertionApi();

        const evtText = new Evt<string>();

        const evtAge = new Evt<number>();


        const evtUnion = Evt.merge([evtText, evtAge]);

        const text = "ok";

        const age = 88;

        {

            const pr = mustResolve({
                "promise": evtUnion.waitFor(),
                "expectedData": text
            });

            evtText.post(text);

            await pr;

        }

        {

            const pr = mustResolve({
                "promise": evtUnion.waitFor(),
                "expectedData": age
            });

            evtAge.post(age);

            await pr;

        }

        assert(evtText.getHandlers().length === 1);
        assert(evtAge.getHandlers().length === 1);

    }

    console.log("PASS");

})();
