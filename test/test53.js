"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var getHandlerPr_1 = require("./getHandlerPr");
var testing_1 = require("../tools/testing");
var mustResolve = testing_1.getPromiseAssertionApi().mustResolve;
var evt = new lib_1.Evt();
var handler_;
evt.evtAttach.attachOnce(function (handler) { return handler_ = handler; });
mustResolve({
    "promise": getHandlerPr_1.getHandlerPr(evt.evtDetach, function () {
        return evt.evtDetach.attachOnce(function (handler) {
            return assert_1.assert(handler === handler_);
        });
    }),
    "delay": 0
});
evt.attach(function () { });
evt.detach();
setTimeout(function () { return console.log("PASS"); }, 0);
//# sourceMappingURL=test53.js.map