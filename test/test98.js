"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
;
var stdout = "";
var evt = lib_1.Evt.create("foo");
evt.evtAttach.attach(function () { stdout += "never"; });
evt.attachOnce(function (text) { stdout += text; });
assert_1.assert(stdout === "foo");
console.log("PASS");
//# sourceMappingURL=test98.js.map