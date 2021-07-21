import { Evt, TimeoutEvtError } from "../lib/index.ts";

let evt= new Evt<string>();

process.nextTick(()=>{

    evt.post("foo");
    
});

let success= false;

(async ()=>{

    let str= await evt.attachOnce(0, ()=>{});

    console.assert(str === "foo");

    try{

        await evt.attach(0,() => { });

        console.assert(false);

    }catch(error){ 

        console.assert(error instanceof TimeoutEvtError);

        success = true;

    }


})();

setTimeout(()=>{

    console.assert(success);

    console.log("PASS");

},2000);