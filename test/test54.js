"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var evtText = new lib_1.Evt();
var text = "ok";
evtText.evtAttach.attach(function (_a) {
    var op = _a.op;
    return evtText.isHandledByOp(op, text);
}, function () { return evtText.post(text); });
var str = "";
evtText.attachOnce(function (str_) { return str = str_; });
assert_1.assert(str === "ok");
console.log("PASS");
//# sourceMappingURL=test54.js.map