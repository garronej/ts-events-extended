import { Evt } from "../lib/index.ts";

let evt = Evt.create();

let evtProxy= Evt.create();

evt.attach(()=>{

    if( !evtProxy.evtAttach.postCount )
        evtProxy.evtAttach.attachOnce(()=> evtProxy.post());
    else
        evtProxy.post();

});

//@ts-ignore: unused i
for( let i in [ ".", ".", ".", ".", "." ])
    evt.post();

let count= 0;

evtProxy.attach(() => {

    count++;

});


//@ts-ignore: unused i
for( let i in [ "f", "g", "h" ])
    evt.post();

console.assert(count === 8);

console.log("PASS");