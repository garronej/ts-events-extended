"use strict";
//NOTE: This test do not perform any actual check at runtime.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = void 0;
var lib_1 = require("../lib");
var getHandlerPr_1 = require("./getHandlerPr");
var matchCircle = function (shape) {
    return shape.type === "CIRCLE";
};
var id = function (x) { return x; };
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
{
    var methodName = "$attach";
    var evtShape = new lib_1.Evt();
    var dCircle_1 = new Deferred();
    var prCircle = evtShape[methodName](function (shape) { return matchCircle(shape) ? [shape] : null; }, function (circle) { return dCircle_1.resolve(circle); });
    var dRadius_1 = new Deferred();
    var prRadius = evtShape[methodName](function (shape) { return shape.type === "CIRCLE" ? [shape.radius] : null; }, function (radius) { return dRadius_1.resolve(radius); });
    var dBigCircle_1 = new Deferred();
    var prBigCircle = evtShape[methodName](function (shape) { return shape.type === "CIRCLE" && shape.radius > 100 ? [shape] : null; }, function (bigCircle) { return dBigCircle_1.resolve(bigCircle); });
    var dBigShape_1 = new Deferred();
    var prBigShape = evtShape[methodName](function (shape) {
        switch (shape.type) {
            //NOTE: We have to give a hint to typescript on what we will return.
            case "SQUARE": return (shape.sideLength > 100) ? [id(shape)] : null;
            case "CIRCLE": return (shape.radius > 100) ? [shape] : null;
        }
    }, function (shape) { return dBigShape_1.resolve(shape); });
    prCircle;
    prRadius;
    prBigCircle;
    prBigShape;
}
{
    var methodName_1 = "attach";
    var evtShape_1 = new lib_1.Evt();
    var dCircle_2 = new Deferred();
    var prCircle = evtShape_1[methodName_1](matchCircle, function (circle) { return dCircle_2.resolve(circle); });
    var dRadius_2 = new Deferred();
    var prRadius = getHandlerPr_1.getHandlerPr(evtShape_1, function () { return evtShape_1[methodName_1](matchCircle, function (circle) { return dRadius_2.resolve(circle.radius); }); }).then(function (_a) {
        var radius = _a.radius;
        return radius;
    });
    var dBigCircle_2 = new Deferred();
    var prBigCircle = getHandlerPr_1.getHandlerPr(evtShape_1, function () { return evtShape_1[methodName_1](function (shape) { return shape.type === "CIRCLE" && shape.radius > 100; }, function (bigCircle) {
        //Here big circle is a shape with ts 3.3.4 but it is not usable.
        dBigCircle_2.resolve(bigCircle);
    }); }).then(function (bigCircle) { return id(bigCircle); });
    var dBigShape_2 = new Deferred();
    var prBigShape = evtShape_1[methodName_1](function (shape) {
        switch (shape.type) {
            case "SQUARE": return (shape.sideLength > 100);
            case "CIRCLE": return (shape.radius > 100);
        }
    }, function (bigShape) {
        //Here big shape is a shape with ts 3.3.4 but it is not usable.
        dBigShape_2.resolve(bigShape);
    });
    prCircle;
    prRadius;
    prBigCircle;
    prBigShape;
}
console.log("PASS");
//# sourceMappingURL=test38.js.map