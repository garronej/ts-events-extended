import {
    Evt
} from "../lib/index.ts";

let evt = new Evt<string | number>();

//evt.enableTrace("evt");

let evtNumber = new Evt<number>();
evt.attach((data): data is number=> typeof data === "number", n => evtNumber.post(n));

//evtNumber.enableTrace("evtNumber");

let evtString= new Evt<string>();
evt.attach((data: string | number): data is string=> typeof data === "string", str=> evtString.post(str));

//evtString.enableTrace("evtString");

let evtSatan= new Evt<string | number>();
evt.attach(data => data === 666, n => evtSatan.post(n));

//evtSatan.enableTrace("evtSatan");



(async ()=> {

    await evtSatan.waitFor();

    console.assert(false, "satan came");

})();

let result_count= 0;

(async ()=> {

    let expectQueue = [ 1, "2", 3, "4", 5, "6", -1, "" ];

    while( true ){

        let data= await evt.waitFor();

        console.assert(expectQueue.shift()===data);

        if( data === "" ) break;

    }

    evtSatan.detach();

    result_count++;

})();


(async ()=> {

    let expectQueue = [1, 3, 5, -1];

    while( true ){

        let num= await evtNumber.waitFor();

        console.assert(expectQueue.shift() === num);

        if( num === -1 ) break;

    }

    result_count++;

})();

(async ()=> {

    let expectQueue = ["2", "4", "6", "" ];

    while( true ){

        let str= await evtString.waitFor();

        console.assert(expectQueue.shift()===str);

        if( str === "" ) break;

    }

    result_count++;

})();



(async ()=> {

    for( let data of [ 1, "2", 3, "4", 5, "6", -1, "", 666 ]){

        evt.post(data);

        await new Promise<void>(resolve=> setTimeout(()=>resolve(),40));

    }

    result_count++;

})();

setTimeout(()=>{

    console.assert(result_count === 4 );

    console.log("PASS");

},2000);
