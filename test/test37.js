"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = void 0;
var lib_1 = require("../lib");
//import { Evt as EvtNext } from "../lib/Evt";
var id_1 = require("tsafe/id");
var testing_1 = require("../tools/testing");
var getHandlerPr_1 = require("./getHandlerPr");
var _b = testing_1.getPromiseAssertionApi(), mustResolve = _b.mustResolve, mustStayPending = _b.mustStayPending;
var matchCircle = function (shape) {
    return shape.type === "CIRCLE";
};
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this_1 = this;
        this._hasResolved = false;
        var resolve;
        this.pr = new Promise(function (resolve_) { return resolve = function (value) {
            _this_1._hasResolved = true;
            resolve_(value);
        }; });
        this.resolve = resolve;
    }
    return Deferred;
}());
exports.Deferred = Deferred;
var test = function (getSamples) {
    {
        var _a = getSamples(), evtShape = _a.evtShape, prCircle = _a.prCircle, prRadius = _a.prRadius, prBigCircle = _a.prBigCircle, prBigShape = _a.prBigShape;
        var smallCircle = {
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
        var _b = getSamples(), evtShape = _b.evtShape, prCircle = _b.prCircle, prRadius = _b.prRadius, prBigCircle = _b.prBigCircle, prBigShape = _b.prBigShape;
        var bigCircle = {
            "type": "CIRCLE",
            "radius": 10000
        };
        mustResolve({ "promise": prCircle, "expectedData": bigCircle });
        mustResolve({ "promise": prRadius, "expectedData": bigCircle.radius });
        mustResolve({ "promise": prBigCircle, "expectedData": bigCircle });
        mustResolve({ "promise": prBigShape, "expectedData": bigCircle });
        evtShape.post(bigCircle);
    }
    {
        var _c = getSamples(), evtShape = _c.evtShape, prCircle = _c.prCircle, prRadius = _c.prRadius, prBigCircle = _c.prBigCircle, prBigShape = _c.prBigShape;
        var smallSquare = {
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
        var _d = getSamples(), evtShape = _d.evtShape, prCircle = _d.prCircle, prRadius = _d.prRadius, prBigCircle = _d.prBigCircle, prBigShape = _d.prBigShape;
        var bigSquare = {
            "type": "SQUARE",
            "sideLength": 1000000
        };
        mustStayPending(prCircle);
        mustStayPending(prRadius);
        mustStayPending(prBigCircle);
        mustResolve({ "promise": prBigShape, "expectedData": bigSquare });
        evtShape.post(bigSquare);
    }
};
var _loop_1 = function (methodName) {
    var higherOrder = function (variant) {
        return function () {
            var evtShape = new lib_1.Evt();
            var dCircle = new Deferred();
            var prCircle = getHandlerPr_1.getHandlerPr(evtShape, function () { return evtShape[methodName](function (shape) { return matchCircle(shape) ? [shape] : null; }, function (circle) { return dCircle.resolve(circle); }); });
            var dRadius = new Deferred();
            var prRadius = getHandlerPr_1.getHandlerPr(evtShape, function () { return evtShape[methodName](function (shape) { return shape.type === "CIRCLE" ? [shape.radius] : null; }, function (radius) { return dRadius.resolve(radius); }); });
            var dBigCircle = new Deferred();
            var prBigCircle = getHandlerPr_1.getHandlerPr(evtShape, function () { return evtShape[methodName](function (shape) { return shape.type === "CIRCLE" && shape.radius > 100 ? [shape] : null; }, function (bigCircle) { return dBigCircle.resolve(bigCircle); }); });
            var dBigShape = new Deferred();
            var prBigShape = getHandlerPr_1.getHandlerPr(evtShape, function () { return evtShape[methodName](function (shape) {
                switch (shape.type) {
                    //NOTE: We have to give a hint to typescript on what we will return.
                    case "SQUARE": return (shape.sideLength > 100) ? [id_1.id(shape)] : null;
                    case "CIRCLE": return (shape.radius > 100) ? [shape] : null;
                }
            }, function (shape) { return dBigShape.resolve(shape); }); });
            switch (variant) {
                case "CALLBACK":
                    return {
                        evtShape: evtShape,
                        "prCircle": dCircle.pr,
                        "prRadius": dRadius.pr,
                        "prBigCircle": dBigCircle.pr,
                        "prBigShape": dBigShape.pr
                    };
                case "PROMISE":
                    return { evtShape: evtShape, prCircle: prCircle, prRadius: prRadius, prBigCircle: prBigCircle, prBigShape: prBigShape };
            }
        };
    };
    test(higherOrder("PROMISE"));
    test(higherOrder("CALLBACK"));
};
try {
    for (var _c = __values(["$attachOnce", "$attach", "$attachOncePrepend", "$attachPrepend"]), _d = _c.next(); !_d.done; _d = _c.next()) {
        var methodName = _d.value;
        _loop_1(methodName);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
    }
    finally { if (e_1) throw e_1.error; }
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
setTimeout(function () { return console.log("PASS"); }, 0);
//# sourceMappingURL=test37.js.map