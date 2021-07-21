"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var testing_1 = require("../tools/testing");
var inDepth_1 = require("../tools/inDepth");
var getHandlerPr_1 = require("./getHandlerPr");
var same = inDepth_1.sameFactory({ "takeIntoAccountArraysOrdering": false }).same;
var mustResolve = testing_1.getPromiseAssertionApi().mustResolve;
var evtText = new lib_1.Evt();
var evtAge = new lib_1.Evt();
var ctx = lib_1.Evt.newCtx();
var prText = getHandlerPr_1.getHandlerPr(evtText, function () { return evtText.attach(ctx, function () { return assert_1.assert(false); }); });
var prAge = getHandlerPr_1.getHandlerPr(evtAge, function () { return evtAge.attach(ctx, function () { return assert_1.assert(false); }); });
var handlers_ = __spreadArray(__spreadArray([], __read(evtText.getHandlers().map(function (handler) { return ({ handler: handler, "evt": evtText }); }))), __read(evtAge.getHandlers().map(function (handler) { return ({ handler: handler, "evt": evtAge }); })));
mustResolve({
    "promise": getHandlerPr_1.getHandlerPr(ctx.evtDoneOrAborted, function () {
        return ctx.evtDoneOrAborted.attachOnce(function (_a) {
            var handlers = _a.handlers;
            return assert_1.assert(same(handlers, handlers_));
        });
    })
});
mustResolve({
    "promise": getHandlerPr_1.getHandlerPr(evtAge.evtDetach, function () { return evtAge.evtDetach.attachOnce(function (handler) { return assert_1.assert(handler.ctx === ctx); }); }),
    "delay": 0
});
var prTest = Promise.all([
    mustResolve({
        "promise": ctx.evtDetach.waitFor(function (_a) {
            var handler = _a.handler, evt = _a.evt;
            return (evt === evtText &&
                handler.ctx === ctx &&
                handler.timeout === undefined &&
                handler.promise === prText);
        })
    }),
    mustResolve({
        "promise": ctx.evtDetach.waitFor(function (_a) {
            var handler = _a.handler, evt = _a.evt;
            return (evt === evtAge &&
                handler.ctx === ctx &&
                handler.timeout === undefined &&
                handler.promise === prAge);
        })
    })
]);
ctx.done();
assert_1.assert(evtText.getHandlers().length === 0);
assert_1.assert(evtAge.getHandlers().length === 0);
evtText.post("nothing");
evtAge.post(0);
prTest.then(function () { return console.log("PASS"); });
//# sourceMappingURL=test49.js.map