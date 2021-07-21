import { Evt } from "../lib/index.ts";

type T= string;

let evt = new Evt<T>();

let evtProxy= new Evt<T>();

evt.attachOnce(data => evtProxy.post(data));

let success= false;

evtProxy.attach(data => {

    console.assert(data === "ok");

    success= true;


});

evt.post("ok");
evt.post("ko");


console.assert(success);

console.log("PASS");

