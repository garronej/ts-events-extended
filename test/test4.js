"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../lib/index");
var evt = new index_1.Evt();
var evtProxy = new index_1.Evt();
evt.attachOnce(function (data) { return evtProxy.post(data); });
var success = false;
evtProxy.attach(function (data) {
    console.assert(data === "ok");
    success = true;
});
evt.post("ok");
evt.post("ko");
console.assert(success);
console.log("PASS");
//# sourceMappingURL=test4.js.map