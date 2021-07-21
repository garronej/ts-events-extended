
import { Evt } from "../lib/index.ts";

let success= false;

let evt = new Evt<string>();

//evt.enableTrace("evt");

let expectQueue= [
    "foo",
    "bar",
    "baz"
];

evt.attachOnce(async str=> {


    while( true ){

        if( str === "done" ) break;

        console.assert(expectQueue.shift() === str, str);
    
        str = await evt.waitFor();

    }

    success= true;



});


evt.post("foo");
evt.post("bar");
evt.post("baz");
evt.post("done");


setTimeout(()=>{

    console.assert(success);

    console.log("PASS");

}, 2000);