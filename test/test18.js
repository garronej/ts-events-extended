"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var count = 0;
var evt = lib_1.Evt.create();
//evt.enableTrace("evt");
evt.waitFor().then(function () { return console.assert(++count === 5, "m2"); });
console.assert(++count === 1, "m3");
evt.attachOnce(function () { return console.assert(++count === 2, "m4"); });
evt.post();
console.assert(++count === 3, "m5");
var success = false;
evt.attachOnce(function () {
    console.assert(++count === 4, "m6");
    success = true;
});
evt.post();
setTimeout(function () {
    console.assert(success);
    console.log("PASS");
}, 2000);
//# sourceMappingURL=test18.js.map