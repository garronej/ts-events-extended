import { Evt } from "../lib/index.ts";

interface Animal {
    type: "CAT" | "SPIDER";
    cute: boolean;
    name: string;
}

interface Cat extends Animal {
    type: "CAT";
    cute: true;
}

//@ts-ignore: unused
interface Spider extends Animal {
    type: "SPIDER";
    cute: false;
}

const animals: Animal[] = [
    { "type": "CAT", "cute": true, "name": "boubou" },
    { "type": "SPIDER", "cute": false, "name": "spiderMan" },
    { "type": "CAT", "cute": true, "name": "miaou" },
    { "type": "SPIDER", "cute": false, "name": "aracnide" }
];


let cats = animals.filter(({ type }) => type === "CAT");
let spiders = animals.filter(({ type }) => type === "SPIDER");

let evtAnimal = new Evt<Animal>();

evtAnimal.attach(
    animal => console.assert(spiders.shift() === animal)
);

const ctx= Evt.newCtx();

evtAnimal.attachExtract(
    (animal: Animal): animal is Cat => animal.type === "CAT",
    ctx,
    cat => {

        console.assert(cats.shift() === cat);

        if (!cats.length) evtAnimal.detach(ctx);

        console.log("PASS");

    }
);

(function main() {

    for (let animal of animals)
        evtAnimal.post(animal);


})();



