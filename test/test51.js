"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
;
var scan_1 = require("../lib/util/genericOperators/scan");
var getHandlerPr_1 = require("./getHandlerPr");
var getPromiseAssertionApi_1 = require("../tools/testing/getPromiseAssertionApi");
var _a = getPromiseAssertionApi_1.getPromiseAssertionApi({ "takeIntoAccountArraysOrdering": true }), mustResolve = _a.mustResolve, mustStayPending = _a.mustStayPending;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var ctx, evtText, nothing, last, prTest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx = lib_1.Evt.newCtx();
                evtText = new lib_1.Evt();
                mustResolve({
                    "promise": getHandlerPr_1.getHandlerPr(ctx.evtDoneOrAborted, function () {
                        return ctx.evtDoneOrAborted.attach(function () { });
                    }).then(function (data) { return [data.result, data.handlers.length]; }),
                    "expectedData": [43, 1]
                });
                mustResolve({
                    "promise": ctx.waitFor(),
                    "expectedData": 43,
                });
                nothing = {};
                last = nothing;
                prTest = mustResolve({
                    "promise": ctx.evtAttach.waitFor(function (_a) {
                        var handler = _a.handler, evt = _a.evt;
                        return (evt === evtText &&
                            handler.ctx === ctx &&
                            !handler.async &&
                            !handler.once &&
                            !handler.prepend &&
                            handler.timeout === undefined &&
                            !handler.extract);
                    })
                });
                mustStayPending(ctx.evtAttach.waitFor(function (_a) {
                    var handler = _a.handler, evt = _a.evt;
                    return !(evt === evtText &&
                        handler.ctx === ctx &&
                        !handler.async &&
                        !handler.once &&
                        !handler.prepend &&
                        handler.timeout === undefined &&
                        !handler.extract);
                }));
                evtText
                    .pipe(ctx)
                    .pipe(function (str) { return [str.toUpperCase()]; })
                    .pipe(function (str) { return str.startsWith("H"); })
                    .pipe(scan_1.scan(function (charCount, str) { return charCount + str.length; }, 0))
                    .pipe(function (count, registerSideEffect) { return count <= 33 ? ["" + count] : (registerSideEffect(function () { return ctx.done(43); }), null); })
                    .attach(function (str) { return last = str; });
                return [4 /*yield*/, prTest];
            case 1:
                _a.sent();
                evtText.post("hello world");
                assert_1.assert(last === "11");
                last = nothing;
                evtText.post("hello world");
                assert_1.assert(last === "22");
                last = nothing;
                evtText.post("hello world");
                assert_1.assert(last === "33");
                last = nothing;
                evtText.post("hello world");
                assert_1.assert(last === nothing);
                assert_1.assert(evtText.getHandlers().length === 0);
                assert_1.assert(ctx.getHandlers().length === 0);
                return [2 /*return*/];
        }
    });
}); })();
{
    var ctx_1 = lib_1.Evt.newCtx();
    var evtText_1 = new lib_1.Evt();
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(ctx_1.evtDoneOrAborted, function () {
            return ctx_1.evtDoneOrAborted.attach(function () { });
        }).then(function (_a) {
            var handlers = _a.handlers;
            return handlers.length;
        }),
        "expectedData": 1
    });
    var nothing = {};
    var last_1 = nothing;
    evtText_1
        .pipe(ctx_1)
        .pipe(function (str) { return [str.toUpperCase()]; })
        .pipe(function (str) { return str.startsWith("H"); })
        .pipe(scan_1.scan(function (charCount, str) { return charCount + str.length; }, 0))
        .pipe(function (count, registerSideEffect) { return (count >= 33 && registerSideEffect(function () { return ctx_1.done(); }), ["" + count]); })
        .attach(function (str) { return last_1 = str; });
    evtText_1.post("hello world");
    assert_1.assert(last_1 === "11");
    last_1 = nothing;
    evtText_1.post("hello world");
    assert_1.assert(last_1 === "22");
    last_1 = nothing;
    evtText_1.post("hello world");
    assert_1.assert(last_1 === "33");
    last_1 = nothing;
    assert_1.assert(evtText_1.getHandlers().length === 0);
    assert_1.assert(ctx_1.getHandlers().length === 0);
    evtText_1.post("hello world");
    assert_1.assert(last_1 === nothing);
}
setTimeout(function () { return console.log("PASS"); }, 0);
//# sourceMappingURL=test51.js.map