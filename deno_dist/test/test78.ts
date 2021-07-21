
import { Evt } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi.ts";

const { mustResolve, mustStayPending } = getPromiseAssertionApi();

(async () => {

    {

        let stdout= "";

        const sevText = Evt.create("foo");

        sevText.evtChange.toStateless().attach(text => {

            stdout+= text;

        });

        sevText.state = "foo";
        sevText.state = " bar";

        assert(stdout === " bar");


    }

    {

        let stdout= "";

        const sevText = Evt.create("foo");

        sevText.evtChangeDiff.attach(({ newState }) => {

            stdout+= newState;

        });

        sevText.state = " bar";

        assert(stdout === " bar");


    }

    {

        let stdout= "";

        const sevText = Evt.create("foo");

        sevText.evtDiff.attach(({ newState }) => {

            stdout+= newState;

        });

        sevText.state = "foo";
        sevText.state = " bar";

        assert(stdout === " bar");


    }


    {

        const sevText = Evt.create("");

        const pr1 = mustResolve({
            "promise": sevText.waitFor(),
            "expectedData": ""
        });

        mustStayPending(
            sevText.evtDiff.waitFor(({ newState }) => [newState])
        );

        mustResolve({
            "promise": sevText.evtChange.waitFor(),
            "expectedData": ""
        });
        mustStayPending(sevText.evtChangeDiff.waitFor());

        await pr1;

    }

    console.log("PASS");

})();
