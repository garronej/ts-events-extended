import { Evt, nonNullable } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";;

(async () => {

    {

        const evt = Evt.create("foo");

        const evtBis = Evt.asyncPipe(
            evt,
            text => text === undefined ?
                [undefined] :
                Promise.resolve(text + " bar").then(text => [text])
        );


        assert(evtBis.state === undefined);

        assert( await evtBis.waitFor(nonNullable()) === "foo bar");

    }

    await Promise.resolve();

    {

        const evt = Evt.create("foo");

        const evtBis = Evt.asyncPipe(
            evt,
            text => [text.length]
        );


        assert(evtBis.state === 3);

    }

    await Promise.resolve();

    {

        const f= async (text: string)=> {

            await new Promise(resolve => setTimeout(resolve, 50));

            return text.length;

        };

        const evt = Evt.create<string | undefined>("foo");

        const evtBis = Evt.asyncPipe(
            evt,
            text => text === undefined ?
                [undefined] :
                f(text).then(n => [n])
        );

        assert(evtBis.state === undefined);

        evt.state= "bar";
        evt.state= "bar bar";

        evt.state = undefined;

        assert(evtBis.state === undefined);

        const pr= evtBis.waitFor(nonNullable());

        evt.state= "Hello World";
        evt.state= "Okay";

        assert(await pr === 4);


    }

    {

        const f= async (text: string)=> {

            await new Promise(resolve => setTimeout(resolve, text.length*100));

            return text;

        };

        const evt = Evt.create<string | undefined>();

        const evtBis = Evt.asyncPipe(
            evt,
            text => text === undefined ?
                [undefined] :
                f(text).then(n => [n])
        );

        const pr =(async ()=>{

            assert(await evtBis.waitFor() === undefined);
            assert(await evtBis.waitFor() === "bar");
            assert(await evtBis.waitFor() === "bar bar");
            assert(await evtBis.waitFor() === "bar bar bar");

        })();

        evt.post("bar bar bar");
        evt.post("bar bar");
        evt.post(undefined);
        evt.post("bar");

        await pr;

    }

    console.log("PASS");

})();




