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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("tsafe/assert");
var index_1 = require("./index");
var every_1 = require("./every");
var partition_1 = require("./partition");
var same_1 = require("../inDepth/same");
assert_1.assert((_a = ["foo", "foo", "foo"]).reduce.apply(_a, __spreadArray([], __read(index_1.every(function (e) { return e === "foo"; })))) === true);
assert_1.assert((_b = ["foo", "foo", "bar"]).reduce.apply(_b, __spreadArray([], __read(index_1.every(function (e) { return e === "foo"; })))) === false);
assert_1.assert(every_1.arrEvery([], function (e) { return e === "foo"; }) === true);
assert_1.assert([].reduce.apply([], __spreadArray([], __read(index_1.every(function (e) { return e === "foo"; })))) === true);
assert_1.assert((_c = ["foo", "foo", "foo"]).reduce.apply(_c, __spreadArray([], __read(index_1.allEqualsTo("foo")))) === true);
assert_1.assert((_d = ["foo"]).reduce.apply(_d, __spreadArray([], __read(index_1.allEqualsTo("foo")))) === true);
assert_1.assert([].reduce.apply([], __spreadArray([], __read(index_1.allEqualsTo("foo")))) === true);
assert_1.assert((_e = ["foo", "bar", "foo"]).reduce.apply(_e, __spreadArray([], __read(index_1.allEqualsTo("foo")))) === false);
assert_1.assert((_f = ["bar", "bar", "foo"]).reduce.apply(_f, __spreadArray([], __read(index_1.allEqualsTo("foo")))) === false);
assert_1.assert((_g = ["bar"]).reduce.apply(_g, __spreadArray([], __read(index_1.allEqualsTo("foo")))) === false);
assert_1.assert((_h = ["foo", "foo_", "foo__"]).reduce.apply(_h, __spreadArray([], __read(index_1.allEqualsTo("foo", function (e1, to) { return e1.startsWith(to); })))) === true);
assert_1.assert((_j = ["foo", "foo_", "foo__", "_foo"]).reduce.apply(_j, __spreadArray([], __read(index_1.allEqualsTo("foo", function (e1, to) { return e1.startsWith(to); })))) === false);
assert_1.assert((_k = ["foo", "foo"]).reduce.apply(_k, __spreadArray([], __read(index_1.allEquals()))) === true);
assert_1.assert((_l = ["foo"]).reduce.apply(_l, __spreadArray([], __read(index_1.allEquals()))) === true);
assert_1.assert([].reduce.apply([], __spreadArray([], __read(index_1.allEquals()))) === true);
assert_1.assert((_m = ["foo", "bar"]).reduce.apply(_m, __spreadArray([], __read(index_1.allEquals()))) === false);
assert_1.assert((_o = ["foo", "bar", "baz"]).reduce.apply(_o, __spreadArray([], __read(index_1.allEquals()))) === false);
assert_1.assert((_p = [
    ["a", "b", "c"],
    ["a", "b", "c"],
    ["a", "b", "c"]
]).reduce.apply(_p, __spreadArray([], __read(index_1.allEquals(function (e1, e2) { return JSON.stringify(e1) === JSON.stringify(e2); })))) === true);
var areSameStringArr = function (arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
};
assert_1.assert((_q = [
    ["a", "b", "c"],
    ["a", "b", "c", "d"],
]).reduce.apply(_q, __spreadArray([], __read(index_1.allEquals(areSameStringArr)))) === false);
assert_1.assert((_r = [["foo", "bar"], ["foo", "bar"]]).reduce.apply(_r, __spreadArray([], __read(index_1.allEquals(function (e1, e2) {
    var _a;
    return (_a = [e1, e2].map(function (e) { return JSON.stringify(e); })).reduce.apply(_a, __spreadArray([], __read(index_1.allEquals())));
})))) === true);
assert_1.assert(areSameStringArr((_s = ["foo", "foo", "bar", "baz"]).reduce.apply(_s, __spreadArray([], __read(index_1.removeDuplicates()))), ["foo", "bar", "baz"]));
assert_1.assert(areSameStringArr((_t = ["foo", "foo"]).reduce.apply(_t, __spreadArray([], __read(index_1.removeDuplicates()))), ["foo"]));
assert_1.assert(areSameStringArr((_u = ["foo", "foo", "bar", "bar"]).reduce.apply(_u, __spreadArray([], __read(index_1.removeDuplicates()))), ["foo", "bar"]));
assert_1.assert(areSameStringArr((_v = ["foo"]).reduce.apply(_v, __spreadArray([], __read(index_1.removeDuplicates()))), ["foo"]));
assert_1.assert(areSameStringArr([].reduce.apply([], __spreadArray([], __read(index_1.removeDuplicates()))), []));
assert_1.assert(JSON.stringify((_w = [["a", "b", "c"], ["a", "b", "c", "d"], ["a", "b", "c"]]).reduce.apply(_w, __spreadArray([], __read(index_1.removeDuplicates(areSameStringArr)))))
    ===
        JSON.stringify([["a", "b", "c"], ["a", "b", "c", "d"]]));
{
    var _7 = __read((_x = ["FOO", "BAR", "FOO"]).reduce.apply(_x, __spreadArray([], __read(index_1.partition(function (e) { return e === "BAR"; })))), 2), arr1 = _7[0], arr2 = _7[1];
    assert_1.assert(areSameStringArr(arr1, ["BAR"]));
    assert_1.assert(areSameStringArr(arr2, ["FOO", "FOO"]));
}
{
    var _8 = __read(partition_1.arrPartition(["FOO", "BAR", "FOO"], function (e) { return e === "BAR"; }), 2), arr1 = _8[0], arr2 = _8[1];
    assert_1.assert(areSameStringArr(arr1, ["BAR"]));
    assert_1.assert(areSameStringArr(arr2, ["FOO", "FOO"]));
}
assert_1.assert((_y = ["foo", "bar", "baz"]).reduce.apply(_y, __spreadArray([], __read(index_1.allUniq()))) === true);
assert_1.assert([].reduce.apply([], __spreadArray([], __read(index_1.allUniq()))) === true);
assert_1.assert((_z = ["foo", "bar", "foo"]).reduce.apply(_z, __spreadArray([], __read(index_1.allUniq()))) === false);
{
    var check = function (arr) { return arr
        .reduce.apply(arr, __spreadArray([], __read(index_1.and([
        function (arr) { return arr.length !== 0; },
        function (arr) { return arr.reduce.apply(arr, __spreadArray([], __read(index_1.allUniq()))); },
        function (arr) { return !arr.reduce.apply(arr, __spreadArray([], __read(index_1.includes("me")))); }
    ])))); };
    assert_1.assert(check(["alice", "bob", "louis"]) === true);
    assert_1.assert(check([]) === false);
    assert_1.assert(check(["alice", "bob", "alice", "louis"]) === false);
    assert_1.assert(check(["alice", "bob", "louis", "me"]) === false);
}
assert_1.assert((_0 = ["foo", "bar", "baz", "hello"]).reduce.apply(_0, __spreadArray([], __read(index_1.count(function (e) { return e.startsWith("b"); })))) === 2);
assert_1.assert([]
    .reduce.apply([], __spreadArray([], __read(index_1.or([
    function (arr) { return arr.length === 0; },
    function (arr) { return arr.length >= 3; }
])))) === true);
assert_1.assert((_1 = ["a", "b", "c", "d"])
    .reduce.apply(_1, __spreadArray([], __read(index_1.or([
    function (arr) { return arr.length === 0; },
    function (arr) { return arr.length >= 3; }
])))) === true);
assert_1.assert((_2 = ["a", "b"])
    .reduce.apply(_2, __spreadArray([], __read(index_1.or([
    function (arr) { return arr.length === 0; },
    function (arr) { return arr.length >= 3; }
])))) === false);
assert_1.assert((_3 = ["a", "b"]).reduce.apply(_3, __spreadArray([], __read(index_1.sameAs(["a", "b"])))) === true);
assert_1.assert((_4 = ["a", "b"]).reduce.apply(_4, __spreadArray([], __read(index_1.sameAs(["a", "bc"])))) === false);
assert_1.assert((_5 = ["a", "b"]).reduce.apply(_5, __spreadArray([], __read(index_1.sameAs(["a", "b", "c"])))) === false);
assert_1.assert(same_1.same((_6 = ["bob", "alice"]).reduce.apply(_6, __spreadArray([], __read(index_1.diff(["bob", "louis"])))), {
    "added": ["louis"],
    "removed": ["alice"]
}, { "takeIntoAccountArraysOrdering": false }));
console.log("PASS reducers");
//# sourceMappingURL=test.js.map