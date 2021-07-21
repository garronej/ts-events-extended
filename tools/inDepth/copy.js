"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.copy = void 0;
var assert_1 = require("tsafe/assert");
var Map_1 = require("minimal-polyfills/Map");
var types_1 = require("./types");
var overwriteReadonlyProp_1 = require("tsafe/lab/overwriteReadonlyProp");
/** Will work with:
 * Array
 * Set
 * Map
 * Date
 * Plain object
 *
 * Any primary type.
 *
 * Best effort for object of custom class.
 */
exports.copy = (function () {
    var copyRec = function (obj, freeze, alreadyCloned) {
        var e_1, _a;
        if (typeof obj !== "object" || obj === null) {
            return obj;
        }
        if (alreadyCloned.has(obj)) {
            return alreadyCloned.get(obj);
        }
        assert_1.assert(typeof obj !== "function", "Functions can't be cloned");
        var onCreate = function (out) {
            alreadyCloned.set(obj, out);
            return out;
        };
        var onReturn = function (out) {
            if (freeze) {
                Object.freeze(out);
            }
            return out;
        };
        var rec = function (obj) { return copyRec(obj, freeze, alreadyCloned); };
        if (types_1.MapLike.match(obj)) {
            var Map_2 = Object.getPrototypeOf(obj).constructor;
            var out_1 = onCreate(new Map_2());
            Array.from(obj.keys())
                .forEach(function (key) { return out_1.set(key, rec(obj.get(key))); });
            return onReturn(out_1);
        }
        if (types_1.SetLike.match(obj)) {
            var Set_1 = Object.getPrototypeOf(obj).constructor;
            var out_2 = onCreate(new Set_1());
            Array.from(obj.values())
                .forEach(function (value) { return out_2.add(rec(value)); });
            return onReturn(out_2);
        }
        if (types_1.ArrayLike.match(obj)) {
            var Array_1 = Object.getPrototypeOf(obj).constructor;
            var out_3 = onCreate(new Array_1());
            for (var i = 0; i < obj.length; i++) {
                if (!("" + i in obj)) {
                    continue;
                }
                overwriteReadonlyProp_1.overwriteReadonlyProp(out_3, i, rec(obj[i]));
            }
            return onReturn(out_3);
        }
        if (types_1.DateLike.match(obj)) {
            var Date_1 = Object.getPrototypeOf(obj).constructor;
            var out_4 = onCreate(new Date_1(obj.getTime()));
            return onReturn(out_4);
        }
        var proto = Object.getPrototypeOf(obj);
        var out = onCreate(Object.create(proto));
        alreadyCloned.set(obj, out);
        var names = Object.getOwnPropertyNames(obj);
        try {
            for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                var name = names_1_1.value;
                var prop = __assign({}, Object.getOwnPropertyDescriptor(obj, name));
                assert_1.assert(!prop.get && !prop.set, "can't clone getter and setter");
                prop.value = rec(prop.value);
                Object.defineProperty(out, name, prop);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return onReturn(out);
    };
    return function copy(obj, options) {
        if (options === void 0) { options = { "freeze": false }; }
        return copyRec(obj, options.freeze, new Map_1.Polyfill());
    };
})();
//# sourceMappingURL=copy.js.map