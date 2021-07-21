//NOTE: This test do not perform any actual check at runtime.

import { Evt } from "../lib/index.ts";
import { getHandlerPr } from "./getHandlerPr.ts";

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

const id = <T>(x: T) => x;

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

{

    const methodName = "$attach";

    const evtShape = new Evt<Shape>();

    const dCircle = new Deferred<Circle>();
    const prCircle = evtShape[methodName](
        shape => matchCircle(shape) ? [shape] : null,
        circle => dCircle.resolve(circle)
    );

    const dRadius = new Deferred<number>();
    const prRadius = evtShape[methodName](
        shape => shape.type === "CIRCLE" ? [shape.radius] : null,
        radius => dRadius.resolve(radius)
    );

    const dBigCircle = new Deferred<Circle>();
    const prBigCircle = evtShape[methodName](
        shape => shape.type === "CIRCLE" && shape.radius > 100 ? [shape] : null,
        bigCircle => dBigCircle.resolve(bigCircle)
    );

    const dBigShape = new Deferred<Shape>();
    const prBigShape = evtShape[methodName](
        shape => {
            switch (shape.type) {
                //NOTE: We have to give a hint to typescript on what we will return.
                case "SQUARE": return (shape.sideLength > 100) ? [id<Shape>(shape)] : null;
                case "CIRCLE": return (shape.radius > 100) ? [shape] : null;
            }
        },
        shape => dBigShape.resolve(shape)
    );


    prCircle; prRadius; prBigCircle; prBigShape;

}

{

    const methodName = "attach";

    const evtShape = new Evt<Shape>();

    const dCircle = new Deferred<Circle>();
    const prCircle = evtShape[methodName](
        matchCircle,
        circle => dCircle.resolve(circle)
    );

    const dRadius = new Deferred<number>();
    const prRadius = getHandlerPr(
        evtShape,
        () => evtShape[methodName](
            matchCircle,
            circle => dRadius.resolve(circle.radius)
        )).then(({ radius }) => radius);

    const dBigCircle = new Deferred<Circle>();
    const prBigCircle = getHandlerPr(
        evtShape,
        () => evtShape[methodName](
            shape => shape.type === "CIRCLE" && shape.radius > 100,
            bigCircle => {
                //Here big circle is a shape with ts 3.3.4 but it is not usable.
                dBigCircle.resolve(bigCircle as Circle);
            }
        )).then(bigCircle => id<Shape>(bigCircle) as Circle);

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

    prCircle; prRadius; prBigCircle; prBigShape;

}

console.log("PASS");