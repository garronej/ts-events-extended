import { Evt } from "../lib/index.ts";
import { EventEmitter } from "https://deno.land/std@0.85.0/node/events.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";

const log = global.console.log;

const console = { "log": (str: string | number) => console.stdOut += `${str}`, "stdOut": "" };

const ctx= Evt.newCtx();

const evtText = new Evt<string>();
const evtTime = new Evt<number>();

evtText.$attach(
    text=> [ text.length ],
    ctx, 
    count => console.log("1: " + count)
);

evtTime.waitFor(
    time => time < 0,
    ctx,
).then(time=> console.log("2: " +  time));

evtText
    .pipe(ctx)
    .pipe(text => [text.toUpperCase()])
    .attach(upperCaseText=> console.log("3: " + upperCaseText))
    ;

Evt.merge(ctx, [ evtText, evtTime ])
    .attach(textOrTime => console.log("4: " + textOrTime))
    ;

const ee= new EventEmitter();

Evt.from<string>(ctx, ee, "text")
    .attach(text=> console.log("5: " + text))
    ;


evtText.post("foo"); //Prints "1: 3" "3: FOO" "4: foo"

assert(
    console.stdOut
    ===
    [
        "1: 3",
        "3: FOO",
        "4: foo"
    ].join("")
);
console.stdOut = "";

ee.emit("text", "bar"); //Prints "5: bar"
assert(console.stdOut === "5: bar");
console.stdOut = "";

console.log(evtText.getHandlers().length); //Prints "3"
assert(console.stdOut === "3");
console.stdOut = "";

console.log(evtTime.getHandlers().length); //Prints "2"
assert(console.stdOut === "2");
console.stdOut = "";
console.log(ee.listenerCount("text")); //Print "1"
assert(console.stdOut === "1");
console.stdOut = "";

ctx.evtDoneOrAborted.attachOnce(
    ({handlers})=> {
    
        console.log(
            handlers.filter(({ evt })=> evt === evtText).length +
            " handlers detached from evtText"
        );
        
        console.log(
            handlers.filter(({ evt })=> evt === evtTime).length +
            " handlers detached from evtTime"
        );
        
        console.log(
            handlers.length + " handlers detached total"
        );
        
    }
);

//Prints:
//"3 handlers detached from evtText"
//"2 handlers detached from evtTime"
//"5 handlers detached total"
ctx.done();

assert(
    console.stdOut
    ===
    [
        "3 handlers detached from evtText",
        "2 handlers detached from evtTime",
        "5 handlers detached total"
    ].join("")
);
console.stdOut = "";

console.log(evtText.getHandlers().length); //Prints "0"
assert(console.stdOut === "0");
console.stdOut = "";

console.log(evtTime.getHandlers().length); //Prints "0"
assert(console.stdOut === "0");
console.stdOut = "";

console.log(ee.listenerCount("text")); //Print "0"
assert(console.stdOut === "0");
console.stdOut = "";

evtText.post("foo"); //Prints nothing
assert(console.stdOut === "");
ee.emit("text", "bar"); //Prints nothing
assert(console.stdOut === "");

log("PASS");