
//NOTE: Check that the previous test works when the lib is included in a project using typescript 3.5 targeting es3

"use strict";
var __awaiter: any = (this && this.__awaiter) || function (thisArg: any, _arguments: any, P: any, generator: any) {
    return new (P || (P = Promise))(function (resolve: any, reject: any) {
        function fulfilled(value: any) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value: any) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result: any) { result.done ? resolve(result.value) : new P(function (resolve: any) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator: any = (this && this.__generator) || function (thisArg: any, body: any) {
    var _: any = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] as any[] }, f: any, y: any, t: any, g: any;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n: any) { return function (v: any) { return step([n, v]); }; }
    function step(op: any) {
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
var _this = this;
exports.__esModule = true;
var Evt_1 = require("../lib/Evt");
var evtText = new Evt_1.Evt();
(function () { return __awaiter(_this, void 0, void 0, function (this: any) {
    var t1: any, t2: any;
    return __generator(this, function (_a: any) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, evtText.waitFor(10)];
            case 1:
                t1 = _a.sent();
                return [4 /*yield*/, evtText.waitFor(10)];
            case 2:
                t2 = _a.sent();
                console.assert("" + t1 + t2 === "AB");
                console.log("PASS");
                return [2 /*return*/];
        }
    });
}); })();
evtText.post("A");
evtText.post("B");
