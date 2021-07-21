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
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var evt, evtBis, _a, evt, evtBis, f_1, evt, evtBis, pr, _b, f_2, evt, evtBis_1, pr;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                evt = lib_1.Evt.create("foo");
                evtBis = lib_1.Evt.asyncPipe(evt, function (text) { return text === undefined ?
                    [undefined] :
                    Promise.resolve(text + " bar").then(function (text) { return [text]; }); });
                assert_1.assert(evtBis.state === undefined);
                _a = assert_1.assert;
                return [4 /*yield*/, evtBis.waitFor(lib_1.nonNullable())];
            case 1:
                _a.apply(void 0, [(_c.sent()) === "foo bar"]);
                return [4 /*yield*/, Promise.resolve()];
            case 2:
                _c.sent();
                {
                    evt = lib_1.Evt.create("foo");
                    evtBis = lib_1.Evt.asyncPipe(evt, function (text) { return [text.length]; });
                    assert_1.assert(evtBis.state === 3);
                }
                return [4 /*yield*/, Promise.resolve()];
            case 3:
                _c.sent();
                f_1 = function (text) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 50); })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, text.length];
                        }
                    });
                }); };
                evt = lib_1.Evt.create("foo");
                evtBis = lib_1.Evt.asyncPipe(evt, function (text) { return text === undefined ?
                    [undefined] :
                    f_1(text).then(function (n) { return [n]; }); });
                assert_1.assert(evtBis.state === undefined);
                evt.state = "bar";
                evt.state = "bar bar";
                evt.state = undefined;
                assert_1.assert(evtBis.state === undefined);
                pr = evtBis.waitFor(lib_1.nonNullable());
                evt.state = "Hello World";
                evt.state = "Okay";
                _b = assert_1.assert;
                return [4 /*yield*/, pr];
            case 4:
                _b.apply(void 0, [(_c.sent()) === 4]);
                f_2 = function (text) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, text.length * 100); })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, text];
                        }
                    });
                }); };
                evt = lib_1.Evt.create();
                evtBis_1 = lib_1.Evt.asyncPipe(evt, function (text) { return text === undefined ?
                    [undefined] :
                    f_2(text).then(function (n) { return [n]; }); });
                pr = (function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _a = assert_1.assert;
                                return [4 /*yield*/, evtBis_1.waitFor()];
                            case 1:
                                _a.apply(void 0, [(_e.sent()) === undefined]);
                                _b = assert_1.assert;
                                return [4 /*yield*/, evtBis_1.waitFor()];
                            case 2:
                                _b.apply(void 0, [(_e.sent()) === "bar"]);
                                _c = assert_1.assert;
                                return [4 /*yield*/, evtBis_1.waitFor()];
                            case 3:
                                _c.apply(void 0, [(_e.sent()) === "bar bar"]);
                                _d = assert_1.assert;
                                return [4 /*yield*/, evtBis_1.waitFor()];
                            case 4:
                                _d.apply(void 0, [(_e.sent()) === "bar bar bar"]);
                                return [2 /*return*/];
                        }
                    });
                }); })();
                evt.post("bar bar bar");
                evt.post("bar bar");
                evt.post(undefined);
                evt.post("bar");
                return [4 /*yield*/, pr];
            case 5:
                _c.sent();
                console.log("PASS");
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=test95.js.map