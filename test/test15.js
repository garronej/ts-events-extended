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
var index_1 = require("../lib/index");
var evt = new index_1.Evt();
//evt.enableTrace("evt");
var evtNumber = new index_1.Evt();
evt.attach(function (data) { return typeof data === "number"; }, function (n) { return evtNumber.post(n); });
//evtNumber.enableTrace("evtNumber");
var evtString = new index_1.Evt();
evt.attach(function (data) { return typeof data === "string"; }, function (str) { return evtString.post(str); });
//evtString.enableTrace("evtString");
var evtSatan = new index_1.Evt();
evt.attach(function (data) { return data === 666; }, function (n) { return evtSatan.post(n); });
//evtSatan.enableTrace("evtSatan");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, evtSatan.waitFor()];
            case 1:
                _a.sent();
                console.assert(false, "satan came");
                return [2 /*return*/];
        }
    });
}); })();
var result_count = 0;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var expectQueue, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expectQueue = [1, "2", 3, "4", 5, "6", -1, ""];
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, evt.waitFor()];
            case 2:
                data = _a.sent();
                console.assert(expectQueue.shift() === data);
                if (data === "")
                    return [3 /*break*/, 3];
                return [3 /*break*/, 1];
            case 3:
                evtSatan.detach();
                result_count++;
                return [2 /*return*/];
        }
    });
}); })();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var expectQueue, num;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expectQueue = [1, 3, 5, -1];
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, evtNumber.waitFor()];
            case 2:
                num = _a.sent();
                console.assert(expectQueue.shift() === num);
                if (num === -1)
                    return [3 /*break*/, 3];
                return [3 /*break*/, 1];
            case 3:
                result_count++;
                return [2 /*return*/];
        }
    });
}); })();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var expectQueue, str;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expectQueue = ["2", "4", "6", ""];
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, evtString.waitFor()];
            case 2:
                str = _a.sent();
                console.assert(expectQueue.shift() === str);
                if (str === "")
                    return [3 /*break*/, 3];
                return [3 /*break*/, 1];
            case 3:
                result_count++;
                return [2 /*return*/];
        }
    });
}); })();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, data, e_1_1;
    var e_1, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, 6, 7]);
                _a = __values([1, "2", 3, "4", 5, "6", -1, "", 666]), _b = _a.next();
                _d.label = 1;
            case 1:
                if (!!_b.done) return [3 /*break*/, 4];
                data = _b.value;
                evt.post(data);
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, 40); })];
            case 2:
                _d.sent();
                _d.label = 3;
            case 3:
                _b = _a.next();
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 7];
            case 5:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 7];
            case 6:
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 7:
                result_count++;
                return [2 /*return*/];
        }
    });
}); })();
setTimeout(function () {
    console.assert(result_count === 4);
    console.log("PASS");
}, 2000);
//# sourceMappingURL=test15.js.map