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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var events_1 = require("events");
var testing_1 = require("../tools/testing");
var assert_1 = require("tsafe/assert");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var mustResolve, ee, ctx, evtText_1, text, _a, _b, _, pr, e_1_1, mustResolve, ee, evtText_2, text, _c, _d, _, pr, e_2_1;
    var e_1, _e, e_2, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                mustResolve = testing_1.getPromiseAssertionApi().mustResolve;
                ee = new events_1.EventEmitter();
                ctx = lib_1.Evt.newCtx();
                evtText_1 = lib_1.Evt.from(ctx, ee, "text");
                text = "ok";
                _g.label = 1;
            case 1:
                _g.trys.push([1, 6, 7, 8]);
                _a = __values([0, 1, 2]), _b = _a.next();
                _g.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 5];
                _ = _b.value;
                pr = mustResolve({
                    "promise": evtText_1.waitFor(),
                    "expectedData": text
                });
                ee.emit("text", text);
                return [4 /*yield*/, pr];
            case 3:
                _g.sent();
                _g.label = 4;
            case 4:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_1_1 = _g.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 8:
                assert_1.assert(ctx.getHandlers().length === 0);
                assert_1.assert(ee.listenerCount("text") === 1);
                ctx.done();
                assert_1.assert(ee.listenerCount("text") === 0);
                mustResolve = testing_1.getPromiseAssertionApi().mustResolve;
                ee = new events_1.EventEmitter();
                evtText_2 = lib_1.Evt.from(ee, "text");
                text = "ok";
                _g.label = 9;
            case 9:
                _g.trys.push([9, 14, 15, 16]);
                _c = __values([0, 1, 2]), _d = _c.next();
                _g.label = 10;
            case 10:
                if (!!_d.done) return [3 /*break*/, 13];
                _ = _d.value;
                pr = mustResolve({
                    "promise": evtText_2.waitFor(),
                    "expectedData": text
                });
                ee.emit("text", text);
                return [4 /*yield*/, pr];
            case 11:
                _g.sent();
                _g.label = 12;
            case 12:
                _d = _c.next();
                return [3 /*break*/, 10];
            case 13: return [3 /*break*/, 16];
            case 14:
                e_2_1 = _g.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 16];
            case 15:
                try {
                    if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 16:
                assert_1.assert(ee.listenerCount("text") === 1);
                console.log("PASS");
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=test56.js.map