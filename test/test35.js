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
var id_1 = require("tsafe/id");
var matchCircle = function (shape) {
    return shape.type === "CIRCLE";
};
var evtShape = new lib_1.Evt();
var evtCircle = evtShape.pipe(matchCircle);
id_1.id(evtCircle);
var evtRadius = evtShape.pipe(function (shape) { return shape.type === "CIRCLE" ? [shape.radius] : null; });
id_1.id(evtRadius);
var evtShapeClone = evtShape.pipe();
id_1.id(evtShapeClone);
var evtBigCircle = evtShape.pipe(function (shape) { return shape.type === "CIRCLE" && shape.radius > 100 ? [shape] : null; });
id_1.id(evtBigCircle);
var evtBigShape = evtShape.pipe(function (shape) {
    switch (shape.type) {
        case "SQUARE": return shape.sideLength > 100;
        case "CIRCLE": return shape.radius > 100;
    }
});
id_1.id(evtBigShape);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var bigCircle_1, smallCircle_1, bigSquare_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                {
                    bigCircle_1 = {
                        "type": "CIRCLE",
                        "radius": 200
                    };
                    evtCircle.waitFor(0)
                        .then(function (circle) { return circle === bigCircle_1; });
                    evtRadius.waitFor(0)
                        .then(function (radius) { return bigCircle_1.radius === radius; });
                    evtShapeClone.waitFor(0)
                        .then(function (shape) { return shape === bigCircle_1; });
                    evtBigCircle.waitFor(0)
                        .then(function (circle) { return circle === bigCircle_1; });
                    evtBigShape.waitFor(0)
                        .then(function (shape) { return shape === bigCircle_1; });
                    evtShape.post(bigCircle_1);
                }
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 0); })];
            case 1:
                _a.sent();
                {
                    smallCircle_1 = {
                        "type": "CIRCLE",
                        "radius": 2
                    };
                    evtCircle.waitFor(0)
                        .then(function (circle) { return circle === smallCircle_1; });
                    evtRadius.waitFor(0)
                        .then(function (radius) { return smallCircle_1.radius === radius; });
                    evtShapeClone.waitFor(0)
                        .then(function (shape) { return shape === smallCircle_1; });
                    evtBigCircle.waitFor(0)
                        .then(function () { return assert_1.assert(false, "1"); }, function () { });
                    evtBigShape.waitFor(0)
                        .then(function () { return assert_1.assert(false, "2!"); }, function () { });
                    evtShape.post(smallCircle_1);
                }
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 0); })];
            case 2:
                _a.sent();
                {
                    bigSquare_1 = {
                        "type": "SQUARE",
                        "sideLength": 400
                    };
                    evtCircle.waitFor(0)
                        .then(function () { return assert_1.assert(false, "3"); }, function () { });
                    evtRadius.waitFor(0)
                        .then(function () { return assert_1.assert(false, "4"); }, function () { });
                    evtShapeClone.waitFor(0)
                        .then(function (shape) { return shape === bigSquare_1; });
                    evtBigCircle.waitFor(0)
                        .then(function () { return assert_1.assert(false, "5"); }, function () { });
                    evtBigShape.waitFor(0)
                        .then(function (shape) { return shape === bigSquare_1; });
                    evtShape.post(bigSquare_1);
                }
                return [2 /*return*/];
        }
    });
}); })();
setTimeout(function () { return console.log("PASS"); }, 10);
//# sourceMappingURL=test35.js.map