"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var getPromiseAssertionApi_1 = require("../tools/testing/getPromiseAssertionApi");
var getHandlerPr_1 = require("./getHandlerPr");
var _a = getPromiseAssertionApi_1.getPromiseAssertionApi(), mustResolve = _a.mustResolve, mustStayPending = _a.mustStayPending;
{
    //Test type only
    var evtText_1 = new lib_1.Evt();
    evtText_1.$attach(lib_1.compose(function (text, registerSideEffect) { return (registerSideEffect(function () { return lib_1.Evt.newCtx().done(true); }),
        [text.toUpperCase()]); }, function (text, registerSideEffect) { return (registerSideEffect(function () { return lib_1.Evt.newCtx().done(3); }),
        [text.length]); }, function (n, registerSideEffect) { return (registerSideEffect(function () { return lib_1.Evt.newCtx(); }),
        ["=>" + n + "<="]); }, function (str, registerSideEffect) { return (registerSideEffect(function () { return lib_1.Evt.newCtx().abort(new Error()); }),
        [str.toUpperCase()]); }, function (str, registerSideEffect) { return (registerSideEffect(function () { return lib_1.Evt.newCtx().abort(new Error()); }),
        [str.toUpperCase()]); }), function (str) { return str.toUpperCase(); });
}
{
    var evtText_2 = new lib_1.Evt();
    var ctx_1 = lib_1.Evt.newCtx();
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evtText_2, function () {
            return evtText_2.$attach(lib_1.compose(function (text, registerSideEffect) { return (registerSideEffect(function () { return ctx_1.done(); }), [text]); }, function (text) { return [text]; }), ctx_1, function (text) { return text.toLowerCase(); });
        })
    });
    evtText_2.post("foo");
    assert_1.assert(evtText_2.getHandlers().length === 0);
}
{
    var evtText_3 = new lib_1.Evt();
    var ctx_2 = lib_1.Evt.newCtx();
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evtText_3, function () {
            return evtText_3.$attach(lib_1.compose(function (text, registerSideEffect) { return (registerSideEffect(function () { return ctx_2.done(); }), [text]); }, function (text) { return [text]; }), ctx_2, function (text) { return text.toLowerCase(); });
        })
    });
    evtText_3.post("foo");
    assert_1.assert(evtText_3.getHandlers().length === 0);
}
{
    var evtText_4 = new lib_1.Evt();
    var ctx_3 = lib_1.Evt.newCtx();
    mustStayPending(getHandlerPr_1.getHandlerPr(evtText_4, function () {
        return evtText_4.$attach(lib_1.compose(function (text, registerSideEffect) { return (registerSideEffect(function () { return ctx_3.done(); }), [text]); }, function () { return null; }), ctx_3, function () { });
    }));
    evtText_4.post("foo");
    assert_1.assert(evtText_4.getHandlers().length === 0);
}
{
    var evtText_5 = new lib_1.Evt();
    var ctx_4 = lib_1.Evt.newCtx();
    mustStayPending(getHandlerPr_1.getHandlerPr(evtText_5, function () {
        return evtText_5.$attach(lib_1.compose(function (text, registerSideEffect) { return (registerSideEffect(function () { return ctx_4.done(); }), [text]); }, function (str) { return (str.toLowerCase(), null); }), ctx_4, function () { });
    }));
    evtText_5.post("foo");
    assert_1.assert(evtText_5.getHandlers().length === 0);
}
console.log("PASS");
//# sourceMappingURL=test67.js.map