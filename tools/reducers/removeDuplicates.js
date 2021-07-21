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
exports.removeDuplicatesFactory = exports.removeDuplicates = exports.arrRemoveDuplicates = void 0;
var allEqualsTo_1 = require("./allEqualsTo");
var reduceify_1 = require("./reduceify");
function arrRemoveDuplicates(arr, areEquals) {
    if (areEquals === void 0) { areEquals = function (e1, e2) { return e1 === e2; }; }
    return arr.reduce(function (prev, curr) {
        var _a;
        return __spreadArray(__spreadArray([], __read(prev)), __read((_a = prev
            .map(function (e) { return areEquals(curr, e); }))
            .reduce.apply(_a, __spreadArray([], __read(allEqualsTo_1.allEqualsTo(false)))) ?
            [curr] : []));
    }, []);
}
exports.arrRemoveDuplicates = arrRemoveDuplicates;
function removeDuplicates(areEquals) {
    return reduceify_1.toReduceArguments(arrRemoveDuplicates, areEquals);
}
exports.removeDuplicates = removeDuplicates;
function removeDuplicatesFactory(_a) {
    var areEquals = _a.areEquals;
    return { "removeDuplicates": function () { return removeDuplicates(areEquals); } };
}
exports.removeDuplicatesFactory = removeDuplicatesFactory;
//# sourceMappingURL=removeDuplicates.js.map