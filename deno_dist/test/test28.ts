
import { Evt } from "../lib/index.ts";


let evt = new Evt<string>();


(async () => {

    const timeout = setTimeout(() => { throw new Error("fail 28"); }, 200);

    {

        const letter = await evt.waitFor();

        console.assert(letter === "a");

    }

    {

        const letter = await evt.waitFor();

        console.assert(letter === "b");

    }

    clearTimeout(timeout);

    evt.post("never");

    {

        let letter: string;

        try {

            letter = await evt.waitFor(300);

            throw new Error(`fail ${letter}`);

        } catch{
            console.log("PASS");
        }


    }




})();

evt.post("a");
evt.post("b");





