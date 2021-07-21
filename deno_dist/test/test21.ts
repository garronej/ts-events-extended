import { Evt } from "../lib/index.ts";


let evt= new Evt<string>();

let success= false;

(async ()=>{


    for( let _ of new Array<void>(6) ){

        await evt.waitFor();

    }

    evt.post("satan");
    evt.post("satan");
    evt.post("satan");
    evt.post("satan");

    try{

        await evt.waitFor(200);


        console.assert(false,"satan came");

    }catch{

        success= true;

    }


})();


for( let letter of [ "a", "b", "c", "d", "e" ] ){

    evt.post(letter);

}

setTimeout(()=> evt.post("f"), 100);

setTimeout(()=>{

    console.assert(success);

    console.log("PASS");

},2000);