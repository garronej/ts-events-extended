import {
    Evt, EvtError
} from "../lib/index";

let pass= false;

let evt = Evt.create();



setTimeout(() => {
    evt.post();
    setImmediate( ()=> evt.post());
}, 0);


(async () => {
    
    await evt.waitFor();

    await evt.waitFor();

    try{

        await evt.waitFor(10);

    }catch( error ){

        console.assert( error instanceof EvtError.Timeout );

        pass= true;
    }


})();


setTimeout(()=> {

    console.assert(pass);

    console.log("PASS".green);

}, 2000);