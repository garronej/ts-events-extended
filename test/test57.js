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
var rxjs_1 = require("rxjs");
var testing_1 = require("../tools/testing");
var tsafe_1 = require("tsafe");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mustResolve, mustStayPending, subject, ctx, evtText_1, text, _b, _c, _, pr, e_1_1, mustResolve, subject, evtText_2, text, _d, _e, _, pr, e_2_1;
    var e_1, _f, e_2, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = testing_1.getPromiseAssertionApi(), mustResolve = _a.mustResolve, mustStayPending = _a.mustStayPending;
                subject = new rxjs_1.Subject();
                ctx = lib_1.Evt.newCtx();
                evtText_1 = lib_1.Evt.from(ctx, subject);
                text = "ok";
                _h.label = 1;
            case 1:
                _h.trys.push([1, 6, 7, 8]);
                _b = __values([0, 1, 2]), _c = _b.next();
                _h.label = 2;
            case 2:
                if (!!_c.done) return [3 /*break*/, 5];
                _ = _c.value;
                pr = mustResolve({
                    "promise": evtText_1.waitFor(),
                    "expectedData": text
                });
                subject.next(text);
                return [4 /*yield*/, pr];
            case 3:
                _h.sent();
                _h.label = 4;
            case 4:
                _c = _b.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_1_1 = _h.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (_c && !_c.done && (_f = _b.return)) _f.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 8:
                tsafe_1.assert(ctx.getHandlers().length === 0);
                ctx.done();
                mustStayPending(evtText_1.waitFor());
                subject.next(text);
                mustResolve = testing_1.getPromiseAssertionApi().mustResolve;
                subject = new rxjs_1.Subject();
                evtText_2 = lib_1.Evt.from(subject);
                text = "ok";
                _h.label = 9;
            case 9:
                _h.trys.push([9, 14, 15, 16]);
                _d = __values([0, 1, 2]), _e = _d.next();
                _h.label = 10;
            case 10:
                if (!!_e.done) return [3 /*break*/, 13];
                _ = _e.value;
                pr = mustResolve({
                    "promise": evtText_2.waitFor(),
                    "expectedData": text
                });
                subject.next(text);
                return [4 /*yield*/, pr];
            case 11:
                _h.sent();
                _h.label = 12;
            case 12:
                _e = _d.next();
                return [3 /*break*/, 10];
            case 13: return [3 /*break*/, 16];
            case 14:
                e_2_1 = _h.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 16];
            case 15:
                try {
                    if (_e && !_e.done && (_g = _d.return)) _g.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 16:
                console.log("PASS");
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=test57.js.map