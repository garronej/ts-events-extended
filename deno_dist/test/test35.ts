
import { Evt } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";
import { id } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/id.ts";

type Circle = {
    type: "CIRCLE";
    radius: number;
};

type Square = {
    type: "SQUARE";
    sideLength: number;
};

type Shape = Circle | Square;

const matchCircle = (shape: Shape): shape is Circle =>
    shape.type === "CIRCLE";

const evtShape = new Evt<Shape>();

const evtCircle = evtShape.pipe(matchCircle);
id<Evt<Circle>>(evtCircle);

const evtRadius = evtShape.pipe(
    shape => shape.type === "CIRCLE" ? [shape.radius] : null
);
id<Evt<number>>(evtRadius);

const evtShapeClone = evtShape.pipe();
id<Evt<Shape>>(evtShapeClone);

const evtBigCircle = evtShape.pipe(
    shape => shape.type === "CIRCLE" && shape.radius > 100 ? [shape] : null
);
id<Evt<Circle>>(evtBigCircle);

const evtBigShape = evtShape.pipe(shape => {
    switch (shape.type) {
        case "SQUARE": return shape.sideLength > 100;
        case "CIRCLE": return shape.radius > 100;
    }
});
id<Evt<Shape>>(evtBigShape);

(async () => {

    {
        const bigCircle: Circle = {
            "type": "CIRCLE",
            "radius": 200
        };

        evtCircle.waitFor(0)
            .then(circle => circle === bigCircle)
            ;

        evtRadius.waitFor(0)
            .then(radius => bigCircle.radius === radius)
            ;

        evtShapeClone.waitFor(0)
            .then(shape => shape === bigCircle)
            ;

        evtBigCircle.waitFor(0)
            .then(circle => circle === bigCircle)
            ;

        evtBigShape.waitFor(0)
            .then(shape => shape === bigCircle)
            ;

        evtShape.post(bigCircle);

    }

    await new Promise(resolve => setTimeout(resolve, 0));

    {

        const smallCircle: Circle = {
            "type": "CIRCLE",
            "radius": 2
        };

        evtCircle.waitFor(0)
            .then(circle => circle === smallCircle)
            ;

        evtRadius.waitFor(0)
            .then(radius => smallCircle.radius === radius)
            ;

        evtShapeClone.waitFor(0)
            .then(shape => shape === smallCircle)
            ;

        evtBigCircle.waitFor(0)
            .then(
                () => assert(false, "1"),
                () => { }
            )
            ;

        evtBigShape.waitFor(0)
            .then(
                () => assert(false, "2!"),
                () => { }
            )
            ;

        evtShape.post(smallCircle);

    }
    await new Promise(resolve => setTimeout(resolve, 0));

    {
        const bigSquare: Square = {
            "type": "SQUARE",
            "sideLength": 400
        };

        evtCircle.waitFor(0)
            .then(
                () => assert(false, "3"),
                () => { }
            )
            ;

        evtRadius.waitFor(0)
            .then(
                () => assert(false, "4"),
                () => { }
            )
            ;

        evtShapeClone.waitFor(0)
            .then(shape => shape === bigSquare)
            ;

        evtBigCircle.waitFor(0)
            .then(
                () => assert(false, "5"),
                () => { }
            )
            ;

        evtBigShape.waitFor(0)
            .then(shape => shape === bigSquare)
            ;

        evtShape.post(bigSquare);

    }

})();

setTimeout(() => console.log("PASS"), 10);