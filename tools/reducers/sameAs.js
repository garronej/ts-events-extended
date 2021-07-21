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
exports.sameAsFactory = exports.sameAs = exports.arrSameAs = void 0;
var allEquals_1 = require("./allEquals");
var reduceify_1 = require("./reduceify");
function arrSameAs(arr, otherArr, areSame) {
    var _a;
    if (areSame === void 0) { areSame = function (e1, e2) { return e1 === e2; }; }
    if (!(_a = [arr, otherArr]
        .map(function (_a) {
        var length = _a.length;
        return length;
    }))
        .reduce.apply(_a, __spreadArray([], __read(allEquals_1.allEquals())))) {
        return false;
    }
    for (var i = 0; i < arr.length; i++) {
        if (!areSame(arr[i], otherArr[i])) {
            return false;
        }
    }
    return true;
}
exports.arrSameAs = arrSameAs;
function sameAs(otherArr, areSame) {
    return reduceify_1.toReduceArguments(arrSameAs, otherArr, areSame);
}
exports.sameAs = sameAs;
function sameAsFactory(_a) {
    var areEquals = _a.areEquals;
    return { "sameAs": function (otherArr) { return sameAs(otherArr, areEquals); } };
}
exports.sameAsFactory = sameAsFactory;
//# sourceMappingURL=sameAs.js.map