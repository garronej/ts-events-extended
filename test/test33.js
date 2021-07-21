"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var matchCircle = function (shape) { return shape.type === "CIRCLE"; };
{
    var evtShape = new lib_1.Evt();
    var circle_1 = {
        "type": "CIRCLE",
        "radius": 33
    };
    var square = {
        "type": "SQUARE",
        "sideLength": 12
    };
    var evtCircle = evtShape.pipe(matchCircle);
    evtCircle.attachOnce(10, function (circle_) { return assert_1.assert(circle_ === circle_1); });
    evtShape.post(circle_1);
    evtCircle.waitFor(10)
        .then(function () { return assert_1.assert(false); }, function () { });
    evtShape.post(square);
}
{
    var evtShape = new lib_1.Evt();
    var smallCircle_1 = {
        "type": "CIRCLE",
        "radius": 3
    };
    var bigCircle_1 = {
        "type": "CIRCLE",
        "radius": 10
    };
    var evtLargeShape = evtShape.pipe(function (shape) {
        switch (shape.type) {
            case "CIRCLE": return shape.radius > 5;
            case "SQUARE": return shape.sideLength > 3;
        }
    });
    evtLargeShape.waitFor(function (circle) { return circle === smallCircle_1; }, 10)
        .then(function () { return assert_1.assert(false); }, function () { });
    evtLargeShape.waitFor(function (circle) { return circle === bigCircle_1; }, 10);
    evtShape.post(smallCircle_1);
    evtShape.post(bigCircle_1);
}
setTimeout(function () { return console.log("PASS"); }, 100);
//# sourceMappingURL=test33.js.map