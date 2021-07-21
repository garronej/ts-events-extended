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
exports.diffFactory = exports.diff = exports.arrDiff = void 0;
var reduceify_1 = require("./reduceify");
var contains_1 = require("./contains");
var removeDuplicates_1 = require("./removeDuplicates");
var id_1 = require("tsafe/id");
var areStrictEqual = function (e1, e2) { return e1 === e2; };
/** WARNING: Providing areEquals significantly impact performances */
function arrDiff(arr, newArr, areEquals) {
    if (areEquals === void 0) { areEquals = areStrictEqual; }
    var arrDiff = {
        "added": id_1.id([]),
        "removed": id_1.id([])
    };
    if (arr.length === newArr.length &&
        arr.every(function (elem, i) { return areEquals(elem, newArr[i]); })) {
        return arrDiff;
    }
    if (areEquals !== areStrictEqual) {
        return {
            "added": newArr
                .reduce.apply(newArr, __spreadArray([], __read(removeDuplicates_1.removeDuplicates(areEquals)))).filter(function (newEntry) { return !arr.reduce.apply(arr, __spreadArray([], __read(contains_1.contains(function (entry) { return areEquals(entry, newEntry); })))); }),
            "removed": arr
                .reduce.apply(arr, __spreadArray([], __read(removeDuplicates_1.removeDuplicates(areEquals)))).filter(function (entry) { return !newArr.reduce.apply(newArr, __spreadArray([], __read(contains_1.contains(function (newEntry) { return areEquals(newEntry, entry); })))); })
        };
    }
    var arrAsSet = new Set(arr);
    var newArrAsSet = new Set(newArr);
    arrAsSet.forEach(function (elem) {
        if (newArrAsSet.has(elem)) {
            return;
        }
        arrDiff.removed.push(elem);
    });
    newArrAsSet.forEach(function (elem) {
        if (arrAsSet.has(elem)) {
            return;
        }
        arrDiff.added.push(elem);
    });
    return arrDiff;
}
exports.arrDiff = arrDiff;
function diff(newArr, areEquals) {
    return reduceify_1.toReduceArguments(arrDiff, newArr, areEquals);
}
exports.diff = diff;
function diffFactory(_a) {
    var areEquals = _a.areEquals;
    return { "diff": function (newArr) { return diff(newArr, areEquals); } };
}
exports.diffFactory = diffFactory;
//# sourceMappingURL=diff.js.map