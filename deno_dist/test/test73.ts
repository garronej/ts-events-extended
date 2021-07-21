
import { Evt } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";;

{

    {

        const sevText = Evt.create("foo");

        const sevCharCount = sevText.pipe(text => [text.length]);

        assert(sevCharCount.state === sevText.state.length);

        sevText.post("foo bar");

        assert(sevCharCount.state === sevText.state.length);

    }

    {

        const ctx = Evt.newCtx();

        const sevText = Evt.create("foo");

        const sevCharCount = sevText.pipe(ctx, text => [text.length]);

        assert(sevCharCount.state === sevText.state.length);

        sevText.post("foo bar");

        assert(sevCharCount.state === sevText.state.length);

        const { state } = sevCharCount;

        ctx.done();

        sevText.post("foo bar baz");

        assert(state === sevCharCount.state);

    }

    {

        const evtText = Evt.create<string>();

        const sevText = evtText.toStateful("foo bar");

        assert(sevText.state === "foo bar" as string);

        evtText.post("foo bar");

        assert(sevText.postCount === 1 as number);
        assert(sevText.evtChange.postCount === 0 as number);
        assert(sevText.evtDiff.postCount === 1 as number);
        assert(sevText.evtChangeDiff.postCount === 0 as number);

        evtText.post("baz");

        assert(sevText.postCount === 2);
        assert(sevText.evtChange.postCount === 1);
        assert(sevText.evtDiff.postCount === 2);
        assert(sevText.evtChangeDiff.postCount === 1);

        assert(sevText.state === "baz");
    }

    {

        const ctx = Evt.newCtx();

        const evtText = Evt.create<string>();

        const sevText = evtText.toStateful("foo bar", ctx);

        assert(sevText.state === "foo bar" as string);

        evtText.post("baz");

        assert(sevText.state === "baz" as string);

        ctx.done();

        evtText.post("Hello");

        assert(sevText.state !== "Hello");

    }

}

{

    {

        const sevText = Evt.create("foo");

        const sevCharCount = sevText.pipe(text => [text.length]);

        assert(sevCharCount.state === sevText.state.length);

        sevText.state = "foo bar";

        assert(sevCharCount.state === sevText.state.length);

    }

    {

        const ctx = Evt.newCtx();

        const sevText = Evt.create("foo");

        const sevCharCount = sevText.pipe(ctx, text => [text.length]);

        assert(sevCharCount.state === sevText.state.length);

        sevText.state= "foo bar";

        assert(sevCharCount.state === sevText.state.length);

        const { state } = sevCharCount;

        ctx.done();

        sevText.state= "foo bar baz";

        assert(state === sevCharCount.state);

    }

    {

        const evtText = Evt.create<string>();

        const sevText = evtText.toStateful("foo bar");

        assert(sevText.state === "foo bar" as string);

        evtText.post("foo bar");

        assert(sevText.postCount === 1 as number);
        assert(sevText.evtChange.postCount === 0 as number);
        assert(sevText.evtDiff.postCount === 1 as number);
        assert(sevText.evtChangeDiff.postCount === 0 as number);

        evtText.post("baz");

        assert(sevText.postCount === 2);
        assert(sevText.evtChange.postCount === 1);
        assert(sevText.evtDiff.postCount === 2);
        assert(sevText.evtChangeDiff.postCount === 1);

        assert(sevText.state === "baz");
    }

    {

        const ctx = Evt.newCtx();

        const evtText = new Evt<string>();

        const sevText = evtText.toStateful("foo bar", ctx);

        assert(sevText.state === "foo bar" as string);

        evtText.post("baz");

        assert(sevText.state === "baz" as string);

        ctx.done();

        evtText.post("Hello");

        assert(sevText.state !== "Hello");

    }

}

console.log("PASS");
