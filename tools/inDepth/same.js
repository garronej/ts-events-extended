"use strict";
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
exports.sameFactory = exports.same = void 0;
var Set_1 = require("minimal-polyfills/Set");
var types_1 = require("./types");
var allEquals_1 = require("../reducers/allEquals");
require("minimal-polyfills/Object.is");
/**
 * Function that perform a in depth comparison of two things of arbitrary type T
 * to see if they represent the same date regardless of object references.
 *
 * Think of it as JSON.stringify(o1) === JSON.stringify(o2)
 * but unlike a test performed with JSON.stringify the order in the property
 * have been assigned to an object does not matter and circular references are supported.
 *
 *
 * If takeIntoAccountArraysOrdering === false then
 * representsSameData(["a", "b"], ["b", "a"]) will return true.
 *
 * If Date are compared via .getTime()
 *
 * The objects can includes Map and Set.
 * */
exports.same = (function () {
    function sameRec(o1, o2, _a, o1Path, o2Path, o1RealRef, o2RealRef) {
        var e_1, _b, e_2, _c;
        var _d = _a === void 0 ? { "takeIntoAccountArraysOrdering": true } : _a, takeIntoAccountArraysOrdering = _d.takeIntoAccountArraysOrdering;
        if (o1RealRef === void 0) { o1RealRef = o1; }
        if (o2RealRef === void 0) { o2RealRef = o2; }
        if (Object.is(o1, o2)) {
            return true;
        }
        {
            var i1 = o1Path.map(function (_a) {
                var obj = _a.obj;
                return obj;
            }).indexOf(o1RealRef);
            if (i1 >= 0) {
                var i2 = o2Path.map(function (_a) {
                    var obj = _a.obj;
                    return obj;
                }).indexOf(o2RealRef);
                if (i1 !== i2) {
                    return false;
                }
                return allEquals_1.arrAllEquals([o1Path, o2Path]
                    .map(function (oPath) { return oPath
                    .map(function (_a) {
                    var key = _a.key;
                    return key;
                })
                    .join(""); }));
            }
        }
        if (!(o1 instanceof Object && o1 instanceof Object)) {
            return false;
        }
        if (types_1.DateLike.match(o1)) {
            if (!types_1.DateLike.match(o2)) {
                return false;
            }
            return o1.getTime() === o2.getTime();
        }
        if (types_1.MapLike.match(o1)) {
            if (!types_1.MapLike.match(o2)) {
                return false;
            }
            var newO1 = new Set_1.Polyfill();
            var newO2 = new Set_1.Polyfill();
            try {
                for (var _e = __values([o1, o2]), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var o = _f.value;
                    var newO = o === o1 ? newO1 : newO2;
                    var arr = Array.from(o.keys());
                    for (var i = 0; i < arr.length; i++) {
                        var key = arr[i];
                        var value = o.get(key);
                        newO.add({ key: key, value: value });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return sameRec(newO1, newO2, { takeIntoAccountArraysOrdering: takeIntoAccountArraysOrdering }, o1Path, o2Path, o1RealRef, o2RealRef);
        }
        var takeIntoAccountArraysOrderingOv = undefined;
        if (types_1.SetLike.match(o1)) {
            if (!types_1.SetLike.match(o2)) {
                return false;
            }
            o1 = Array.from(o1.values());
            o2 = Array.from(o2.values());
            takeIntoAccountArraysOrderingOv = false;
        }
        if (types_1.ArrayLike.match(o1)) {
            if (!types_1.ArrayLike.match(o2)) {
                return false;
            }
            if (o1.length !== o2.length) {
                return false;
            }
            if (!(takeIntoAccountArraysOrderingOv !== undefined ?
                takeIntoAccountArraysOrderingOv :
                takeIntoAccountArraysOrdering)) {
                var o2Set = new Set_1.Polyfill(Array.from(o2));
                for (var i = 0; i < o1.length; i++) {
                    if (!("" + i in o1)) {
                        continue;
                    }
                    var val1 = o1[i];
                    if (o2Set.has(val1)) {
                        o2Set.delete(val1);
                        continue;
                    }
                    var isFound = false;
                    try {
                        for (var _g = (e_2 = void 0, __values(o2Set.values())), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var val2 = _h.value;
                            if (!sameRec(val1, val2, { takeIntoAccountArraysOrdering: takeIntoAccountArraysOrdering }, __spreadArray(__spreadArray([], __read(o1Path)), [{ "obj": o1RealRef, "key": "*" }]), __spreadArray(__spreadArray([], __read(o2Path)), [{ "obj": o2RealRef, "key": "*" }]))) {
                                continue;
                            }
                            isFound = true;
                            o2Set.delete(val2);
                            break;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    if (!isFound) {
                        return false;
                    }
                }
                return true;
            }
            //continue
        }
        else if (!sameRec(Object.keys(o1).filter(function (key) { return o1[key] !== undefined; }), Object.keys(o2).filter(function (key) { return o2[key] !== undefined; }), { "takeIntoAccountArraysOrdering": false }, [], [])) {
            return false;
        }
        for (var key in o1) {
            if (!sameRec(o1[key], o2[key], { takeIntoAccountArraysOrdering: takeIntoAccountArraysOrdering }, __spreadArray(__spreadArray([], __read(o1Path)), [{ "obj": o1RealRef, key: key }]), __spreadArray(__spreadArray([], __read(o2Path)), [{ "obj": o2RealRef, key: key }]))) {
                return false;
            }
        }
        return true;
    }
    return function same(o1, o2, _a) {
        var _b = _a === void 0 ? { "takeIntoAccountArraysOrdering": true } : _a, takeIntoAccountArraysOrdering = _b.takeIntoAccountArraysOrdering;
        return sameRec(o1, o2, { takeIntoAccountArraysOrdering: takeIntoAccountArraysOrdering }, [], []);
    };
})();
/**
 * Return the "same" function with "takeIntoAccountArraysOrdering" default value set as desired.
 * */
function sameFactory(_a) {
    var takeIntoAccountArraysOrdering = _a.takeIntoAccountArraysOrdering;
    return {
        "same": function (o1, o2, prop) {
            if (prop === void 0) { prop = { takeIntoAccountArraysOrdering: takeIntoAccountArraysOrdering }; }
            return exports.same(o1, o2, prop);
        }
    };
}
exports.sameFactory = sameFactory;
//# sourceMappingURL=same.js.map