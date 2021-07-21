"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../lib/index");
var evt = new index_1.Evt();
//evt.enableTrace("evt");
var i = 0;
evt.attach(function (data) {
    if (i === 0)
        console.assert(data === "tick", "m1");
    else
        console.assert(data === "tack", "m2");
    i++;
});
evt.attachOnce(function (data) {
    console.assert(data === "tick", "m3");
});
console.assert(evt.postCount === 0, "m4");
evt.post("tick");
evt.post("tack");
evt.post("tack");
console.assert(evt.postCount === 3, "m5");
console.assert(i === 3, "m6");
console.log("PASS");
//# sourceMappingURL=test1.js.map