import { Evt } from "../lib/index.ts";
//import { Evt as EvtNext } from "../lib/Evt";
import { id } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/id.ts";
import { getPromiseAssertionApi } from "../tools/testing/index.ts";
import { getHandlerPr } from "./getHandlerPr.ts";
const { mustResolve, mustStayPending } = getPromiseAssertionApi();


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





type Resolve<T> = (value: T) => void;

export class Deferred<T> {

    public readonly pr: Promise<T>;

    /** NOTE: Does not need to be called bound to instance*/
    public readonly resolve: Resolve<T>;

    constructor() {

        let resolve!: Resolve<T>;

        this.pr = new Promise<T>(
            resolve_ => resolve = value => {

                this._hasResolved = true;

                resolve_(value);

            }
        );

        this.resolve = resolve;

    }

    public _hasResolved = false;


}

const test = (
    getSamples: () => {
        evtShape: Evt<Shape>;
        prCircle: Promise<Circle>;
        prRadius: Promise<number>;
        prBigCircle: Promise<Circle>;
        prBigShape: Promise<Shape>;
    }
) => {

    {

        const { evtShape, prCircle, prRadius, prBigCircle, prBigShape } = getSamples();

        const smallCircle: Circle = {
            "type": "CIRCLE",
            "radius": 3
        };

        mustResolve({ "promise": prCircle, "expectedData": smallCircle });
        mustResolve({ "promise": prRadius, "expectedData": smallCircle.radius });
        
        mustStayPending(prBigCircle);
        mustStayPending(prBigShape);

        evtShape.post(smallCircle);

    }

    {

        const { evtShape, prCircle, prRadius, prBigCircle, prBigShape } = getSamples();

        const bigCircle: Circle = {
            "type": "CIRCLE",
            "radius": 10000
        };

        mustResolve({ "promise": prCircle, "expectedData": bigCircle});
        mustResolve({ "promise": prRadius, "expectedData": bigCircle.radius });
        mustResolve({ "promise": prBigCircle, "expectedData": bigCircle });
        mustResolve({ "promise": prBigShape, "expectedData": bigCircle });

        evtShape.post(bigCircle);

    }

    {

        const { evtShape, prCircle, prRadius, prBigCircle, prBigShape } = getSamples();

        const smallSquare: Square = {
            "type": "SQUARE",
            "sideLength": 1
        };

        mustStayPending(prCircle);
        mustStayPending(prRadius);
        mustStayPending(prBigCircle);
        mustStayPending(prBigShape);

        evtShape.post(smallSquare);

    }
    {

        const { evtShape, prCircle, prRadius, prBigCircle, prBigShape } = getSamples();

        const bigSquare: Square = {
            "type": "SQUARE",
            "sideLength": 1000000
        };

        mustStayPending(prCircle);
        mustStayPending(prRadius);
        mustStayPending(prBigCircle);
        mustResolve({ "promise": prBigShape, "expectedData": bigSquare});

        evtShape.post(bigSquare);

    }


};

for (const methodName of ["$attachOnce", "$attach", "$attachOncePrepend", "$attachPrepend"] as any as [
    "$attachOnce",
    //"$attach"
    //"$attachExtract"
    //"$attachOnceExtract",
    //"$attachPrepend",
    //"$attachOncePrepend"
]) {

    const higherOrder = (variant: "PROMISE" | "CALLBACK") => {

        return () => {

            const evtShape = new Evt<Shape>();

            const dCircle = new Deferred<Circle>();
            const prCircle = getHandlerPr(
                evtShape,
                () => evtShape[methodName](
                    shape => matchCircle(shape) ? [shape] : null,
                    circle => dCircle.resolve(circle)
                ));

            const dRadius = new Deferred<number>();
            const prRadius = getHandlerPr(
                evtShape,
                () => evtShape[methodName](
                    shape => shape.type === "CIRCLE" ? [shape.radius] : null,
                    radius => dRadius.resolve(radius)
                ));

            const dBigCircle = new Deferred<Circle>();
            const prBigCircle = getHandlerPr(
                evtShape,
                () => evtShape[methodName](
                    shape => shape.type === "CIRCLE" && shape.radius > 100 ? [shape] : null,
                    bigCircle => dBigCircle.resolve(bigCircle)
                ));

            const dBigShape = new Deferred<Shape>();
            const prBigShape = getHandlerPr(
                evtShape,
                () => evtShape[methodName](
                    shape => {
                        switch (shape.type) {
                            //NOTE: We have to give a hint to typescript on what we will return.
                            case "SQUARE": return (shape.sideLength > 100) ? [id<Shape>(shape)] : null;
                            case "CIRCLE": return (shape.radius > 100) ? [shape] : null;
                        }
                    },
                    shape => dBigShape.resolve(shape)
                ));

            switch (variant) {
                case "CALLBACK":
                    return {
                        evtShape,
                        "prCircle": dCircle.pr,
                        "prRadius": dRadius.pr,
                        "prBigCircle": dBigCircle.pr,
                        "prBigShape": dBigShape.pr
                    };
                case "PROMISE":
                    return { evtShape, prCircle, prRadius, prBigCircle, prBigShape };
            }

        };

    };

    test(higherOrder("PROMISE"));
    test(higherOrder("CALLBACK"));

}






/*
for (const methodName of ["attachOnce", "attach", "attachOncePrepend", "attachPrepend"] as any as [
    "attachOnce",
    //"attach"
    //"attachExtract"
    //"attachOnceExtract",
    //"attachPrepend",
    //"attachOncePrepend"
]) {

    const higherOrder = (variant: "PROMISE" | "CALLBACK") => {

        return () => {

            const evtShape = new EvtNext<Shape>();

            const dCircle = new Deferred<Circle>();
            const prCircle = evtShape[methodName](
                shape => matchCircle(shape) ? [shape] : null,
                circle => dCircle.resolve(circle)
            );
            id<Promise<Circle>>(prCircle);

            const dRadius = new Deferred<number>();
            const prRadius = evtShape[methodName](
                shape => shape.type === "CIRCLE" ? [shape.radius] : null,
                radius => dRadius.resolve(radius)
            );
            id<Promise<number>>(prRadius);

            const dBigCircle = new Deferred<Circle>();
            const prBigCircle = evtShape[methodName](
                shape => shape.type === "CIRCLE" && shape.radius > 100 ? [shape] : null,
                bigCircle => dBigCircle.resolve(bigCircle)
            );
            id<Promise<Circle>>(prBigCircle);


            const dBigShape = new Deferred<Shape>();
            const prBigShape = evtShape[methodName](
                shape => {
                    switch (shape.type) {
                        case "SQUARE": return (shape.sideLength > 100) ? [id<Shape>(shape)] : null;
                        case "CIRCLE": return (shape.radius > 100) ? [shape] : null;
                    }
                },
                bigShape => dBigShape.resolve(bigShape)
            );
            id<Promise<Shape>>(prBigShape);

            switch (variant) {
                case "CALLBACK":
                    return {
                        evtShape,
                        "prCircle": dCircle.pr,
                        "prRadius": dRadius.pr,
                        "prBigCircle": dBigCircle.pr,
                        "prBigShape": dBigShape.pr
                    };
                case "PROMISE":
                    return { evtShape, prCircle, prRadius, prBigCircle, prBigShape };
            }

        };

    };

    test(higherOrder("PROMISE"));
    test(higherOrder("CALLBACK"));

}


for (const methodName of ["attachOnce", "attach", "attachOncePrepend", "attachPrepend"] as any as [
    "attachOnce",
    //"attach"
    //"attachExtract"
    //"attachOnceExtract",
    //"attachPrepend",
    //"attachOncePrepend"
]) {

    const higherOrder = (variant: "PROMISE" | "CALLBACK") => {

        return () => {

            const evtShape = new EvtNext<Shape>();

            const dCircle = new Deferred<Circle>();
            const prCircle = evtShape[methodName](
                matchCircle,
                circle => dCircle.resolve(circle)
            );

            const dRadius = new Deferred<number>();
            const prRadius = evtShape[methodName](
                matchCircle,
                circle => dRadius.resolve(circle.radius)
            ).then(({ radius }) => radius);

            const dBigCircle = new Deferred<Circle>();
            const prBigCircle = evtShape[methodName](
                shape => shape.type === "CIRCLE" && shape.radius > 100,
                bigCircle => {
                    //Here big circle is a shape with ts 3.3.4 but it is not usable.
                    dBigCircle.resolve(bigCircle as Circle);
                }
            ).then(bigCircle => id<Shape>(bigCircle) as Circle);

            const dBigShape = new Deferred<Shape>();
            const prBigShape = evtShape[methodName](
                shape => {
                    switch (shape.type) {
                        case "SQUARE": return (shape.sideLength > 100);
                        case "CIRCLE": return (shape.radius > 100);
                    }
                },
                bigShape => {
                    //Here big shape is a shape with ts 3.3.4 but it is not usable.
                    dBigShape.resolve(bigShape as Shape)
                }
            );

            switch (variant) {
                case "CALLBACK":
                    return {
                        evtShape,
                        "prCircle": dCircle.pr,
                        "prRadius": dRadius.pr,
                        "prBigCircle": dBigCircle.pr,
                        "prBigShape": dBigShape.pr
                    };
                case "PROMISE":
                    return { evtShape, prCircle, prRadius, prBigCircle, prBigShape };
            }

        };

    };

    test(higherOrder("PROMISE"));
    test(higherOrder("CALLBACK"));

}

*/

setTimeout(() => console.log("PASS"), 0);






