import { Evt } from "../lib/index.ts";


const evtText = new Evt<"TICK" | "END" >();

let acc= "";

const ctx = Evt.newCtx();

evtText.$attach(
    (text, registerSideEffect) => (text === "END" && registerSideEffect(() => ctx.done()), [text]),
    ctx,
    text=> acc += " " + text
);

evtText.post("TICK");
evtText.post("TICK");
evtText.post("END");
evtText.post("TICK");

console.assert(acc === " TICK TICK END");

console.log("PASS");
