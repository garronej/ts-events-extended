"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../lib/index");
var evt = new index_1.Evt();
//evt.enableTrace("evt");
var evtProxy = new index_1.Evt();
//evtProxy.enableTrace("evtProxy");
evt.attach(function (data) { return evtProxy.post(data); });
var success = false;
evtProxy.attach(function (data) {
    console.assert(data === "ok", "m1");
    success = true;
});
evt.post("ok");
console.assert(success, "m2");
console.log("PASS");
//# sourceMappingURL=test3.js.map