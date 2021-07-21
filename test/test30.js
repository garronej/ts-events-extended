"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var evt = new lib_1.Evt();
evt.enableTrace({
    "id": "myEvent",
    "formatter": function (n) { return n.toString(); },
    "log": function (str) { return console.assert(str === "(myEvent) 1 handler, 666"); }
});
evt.postAsyncOnceHandled(666);
evt.attachOnce(function (evtData) { return typeof evtData === "string"; }, function () { throw new Error(); });
evt.attachOnce(function (evtData) {
    console.assert(evtData === 666);
    console.log("PASS");
});
//# sourceMappingURL=test30.js.map