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
exports.toReduceArguments = void 0;
function toReduceArguments(arrOp) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    var outWrap = [];
    var reduceCallbackFunction = function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var _b = __read(_a, 4), array = _b[3];
        var out;
        if ("1" in outWrap) {
            out = outWrap[1];
        }
        else {
            out = arrOp.apply(void 0, __spreadArray([array], __read(params)));
            outWrap = [out];
        }
        return out;
    };
    return [
        reduceCallbackFunction,
        arrOp.apply(void 0, __spreadArray([[]], __read(params)))
    ];
}
exports.toReduceArguments = toReduceArguments;
//# sourceMappingURL=reduceify.js.map