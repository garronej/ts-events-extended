"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
;
var evtStr = lib_1.Evt.create();
var flushCtx = lib_1.Evt.newCtx();
evtStr.$attach(lib_1.distinct(function (str) { return str.split(" ")[0]; }, flushCtx), function (str) { return stdout += str; });
var stdout = "";
evtStr.post("foo 1");
flushCtx.done();
evtStr.post("foo 2");
evtStr.post("bar 3");
evtStr.post("bar 4");
evtStr.post("foo 5");
evtStr.post("baz 6");
assert_1.assert(stdout === "foo 1foo 2bar 3baz 6");
console.log("PASS");
//# sourceMappingURL=test99.js.map