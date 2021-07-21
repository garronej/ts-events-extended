"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../lib/index");
var evt = index_1.Evt.create();
var i = 0;
evt.attach(function () { i++; });
var called = false;
var success = false;
evt.attachOnce(function () {
    console.assert(!called);
    success = true;
});
console.assert(evt.postCount === 0);
evt.post();
called = true;
evt.post();
evt.post();
console.assert(evt.postCount === 3);
console.assert(i === 3);
console.assert(success);
console.log("PASS");
//# sourceMappingURL=test10.js.map