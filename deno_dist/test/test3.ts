import { Evt } from "../lib/index.ts";

type T= string;

let evt = new Evt<T>();

//evt.enableTrace("evt");

let evtProxy= new Evt<T>();

//evtProxy.enableTrace("evtProxy");

evt.attach(data=> evtProxy.post(data));

let success= false;

evtProxy.attach(data => {

    console.assert(data === "ok", "m1");

    success= true;


});

evt.post("ok");

console.assert(success, "m2");

console.log("PASS");

