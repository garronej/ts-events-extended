"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedPersonIntro = exports.isTyped = void 0;
var index_1 = require("../lib/index");
function isTyped(p) {
    return p.sex ? true : false;
}
exports.isTyped = isTyped;
var testCount = 0;
var TypedPersonIntro = /** @class */ (function () {
    function TypedPersonIntro() {
        this.intro = "this person is ";
    }
    TypedPersonIntro.prototype.introduce = function (tp) {
        console.assert(this.intro + tp.sex === "this person is female", "m1");
        testCount++;
    };
    return TypedPersonIntro;
}());
exports.TypedPersonIntro = TypedPersonIntro;
var tpi = new TypedPersonIntro();
var evt = new index_1.Evt();
evt.attach(isTyped, index_1.Evt.getCtx(tpi), function (person) { return tpi.introduce(person); });
console.assert(evt.getHandlers().length === 1, "m2");
evt.post({
    "name": "Sienna",
    "age": 22,
    "sex": "female"
});
evt.detach(index_1.Evt.getCtx(tpi));
console.assert(evt.getHandlers().length === 0, "m3");
evt.post({
    "name": "Antonin",
    "age": 21,
    "sex": "male"
});
evt.attach(isTyped, index_1.Evt.getCtx(tpi), function (person) { return tpi.introduce(person); });
console.assert(evt.getHandlers().length === 1, "m4");
evt.post({
    "name": "Sienna",
    "age": 22,
    "sex": "female"
});
evt.getHandlers().find(function (_a) {
    var op = _a.op;
    return op === isTyped;
}).detach();
console.assert(evt.getHandlers().length === 0, "m5");
evt.post({
    "name": "Antonin",
    "age": 21,
    "sex": "male"
});
evt.attach(isTyped, index_1.Evt.getCtx(tpi), function (person) { return tpi.introduce(person); });
console.assert(evt.getHandlers().length === 1, "m6");
evt.post({
    "name": "Sienna",
    "age": 22,
    "sex": "female"
});
evt.getHandlers().find(function (_a) {
    var ctx = _a.ctx;
    return ctx === index_1.Evt.getCtx(tpi);
}).detach();
console.assert(evt.getHandlers().length === 0, "m7");
evt.post({
    "name": "Antonin",
    "age": 21,
    "sex": "male"
});
console.assert(testCount === 3, "m8");
console.log("PASS");
//# sourceMappingURL=test8.js.map