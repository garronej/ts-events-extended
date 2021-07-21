"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var tsafe_1 = require("tsafe");
var evtText = lib_1.Evt.create("foo");
evtText.state = "bar";
tsafe_1.assert(evtText.evtChange.state === "bar");
evtText.state = "baz";
tsafe_1.assert(evtText.evtChange.state === "baz");
console.log("PASS");
//# sourceMappingURL=test88.js.map