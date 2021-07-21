"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var tsafe_1 = require("tsafe");
var evtIsBlue = lib_1.Evt.create(false);
var evtIsBig = lib_1.Evt.create(false);
var evtIsBigAndBlue = lib_1.Evt.merge([
    evtIsBlue.evtChange,
    evtIsBig.evtChange
])
    .toStateful()
    .pipe(function () { return [evtIsBlue.state && evtIsBig.state]; });
tsafe_1.assert(evtIsBigAndBlue.state === false);
evtIsBlue.state = true;
tsafe_1.assert(evtIsBigAndBlue.state === false);
evtIsBig.state = true;
tsafe_1.assert(evtIsBigAndBlue.state === true);
console.log("PASS");
//# sourceMappingURL=test87.js.map