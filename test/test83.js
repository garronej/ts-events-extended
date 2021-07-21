"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var voidEvt = lib_1.Evt.create();
var evt = voidEvt;
var count = 0;
lib_1.Evt.factorize(evt).attach(function (data) {
    if (data === undefined) {
        count++;
        return;
    }
    data.toUpperCase();
});
voidEvt.post();
voidEvt.postAsyncOnceHandled();
assert_1.assert(count === 2);
console.log("PASS");
//# sourceMappingURL=test83.js.map