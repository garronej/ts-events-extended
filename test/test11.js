"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var evt = lib_1.Evt.create();
var evtProxy = lib_1.Evt.create();
evt.attach(function () {
    if (!evtProxy.evtAttach.postCount)
        evtProxy.evtAttach.attachOnce(function () { return evtProxy.post(); });
    else
        evtProxy.post();
});
//@ts-ignore: unused i
for (var i in [".", ".", ".", ".", "."])
    evt.post();
var count = 0;
evtProxy.attach(function () {
    count++;
});
//@ts-ignore: unused i
for (var i in ["f", "g", "h"])
    evt.post();
console.assert(count === 8);
console.log("PASS");
//# sourceMappingURL=test11.js.map