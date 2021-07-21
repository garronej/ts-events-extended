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
exports.distinct = void 0;
var compose_1 = require("../compose");
var distinct = function (keySelector, ctxFlush) {
    var _a;
    return compose_1.compose(function (data) {
        var _a, _b;
        return [{
                data: data,
                "selectedKey": (_a = keySelector === null || keySelector === void 0 ? void 0 : keySelector(data)) !== null && _a !== void 0 ? _a : data,
                "currentFlushCount": (_b = ctxFlush === null || ctxFlush === void 0 ? void 0 : ctxFlush.evtDoneOrAborted.postCount) !== null && _b !== void 0 ? _b : 0
            }];
    }, [
        function (_a, _b) {
            var data = _a.data, selectedKey = _a.selectedKey, currentFlushCount = _a.currentFlushCount;
            var alreadyPostedData = _b.alreadyPostedData, previousFlushCount = _b.previousFlushCount;
            return [{
                    "boxedData": (currentFlushCount !== previousFlushCount ||
                        !alreadyPostedData.has(selectedKey)) ? [data] : null,
                    "alreadyPostedData": new Set(__spreadArray(__spreadArray([], __read((currentFlushCount !== previousFlushCount ?
                        [] : Array.from(alreadyPostedData)))), [
                        selectedKey
                    ])),
                    "previousFlushCount": currentFlushCount
                }];
        },
        {
            "boxedData": null,
            "alreadyPostedData": new Set(),
            "previousFlushCount": (_a = ctxFlush === null || ctxFlush === void 0 ? void 0 : ctxFlush.evtDoneOrAborted.postCount) !== null && _a !== void 0 ? _a : 0
        }
    ], function (_a) {
        var boxedData = _a.boxedData;
        return boxedData;
    });
};
exports.distinct = distinct;
//# sourceMappingURL=distinct.js.map