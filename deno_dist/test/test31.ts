
import { Evt } from "../lib/index.ts";

const evtText = new Evt<string>();

(async () => {

    const t1 = await evtText.waitFor(10);
    const t2 = await evtText.waitFor(10);

    console.assert(`${t1}${t2}` === "AB");

    console.log("PASS");

})();

evtText.post("A");
evtText.post("B");

