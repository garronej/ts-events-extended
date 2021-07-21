
import { Evt } from "../lib/index.ts";


let evt = new Evt<string>();


(async () => {

    evt.waitFor(300);
    evt.waitFor(300);
    evt.waitFor(300);


    {

        const letter = await evt.waitFor();

        console.assert(letter === "a");

    }

    evt.waitFor(300);
    evt.waitFor(300);

    {

        const letter = await evt.waitFor();

        console.assert(letter === "b");

    }

    evt.post("never");

    evt.waitFor(1000).then(
        ()=> { throw new Error("should have timed out") }, 
        _error => { }
    );

    {

        let letter: string;

        try {

            letter = await evt.waitFor(1000);

            throw new Error(`fail ${letter}`);

        } catch{
            console.log("PASS");
        }


    }




})();

evt.post("a");
evt.post("b");

