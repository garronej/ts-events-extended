"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var getHandlerPr_1 = require("./getHandlerPr");
var getPromiseAssertionApi_1 = require("../tools/testing/getPromiseAssertionApi");
var assert_1 = require("tsafe/assert");
var _a = getPromiseAssertionApi_1.getPromiseAssertionApi(), mustResolve = _a.mustResolve, mustReject = _a.mustReject;
var evtText = new lib_1.Evt();
evtText.attachOnce(lib_1.Evt.getCtx(evtText), function () { });
mustResolve({
    "promise": getHandlerPr_1.getHandlerPr(evtText.evtDetach, function () { return evtText.evtDetach
        .attachOnce(function (handler) { return assert_1.assert(lib_1.Evt.getCtx(evtText) === handler.ctx); }); })
});
evtText.post("ok");
var pr = mustReject({ "promise": evtText.waitFor(0), "delay": 150 });
mustResolve({
    "promise": getHandlerPr_1.getHandlerPr(evtText.evtDetach, function () { return evtText.evtDetach
        .attach(function (handler) { return assert_1.assert(handler.timeout === 0); }); }),
    "delay": 150
});
pr.then(function () { return console.log("PASS"); });
//# sourceMappingURL=test61.js.map