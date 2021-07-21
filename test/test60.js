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
var e_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var obj1 = [];
var obj2 = {};
var obj3 = function () { };
try {
    for (var _b = __values([obj1, obj2, obj3]), _c = _b.next(); !_c.done; _c = _b.next()) {
        var obj = _c.value;
        assert_1.assert(lib_1.Evt.getCtx(obj) === lib_1.Evt.getCtx(obj));
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    }
    finally { if (e_1) throw e_1.error; }
}
assert_1.assert(lib_1.Evt.getCtx(obj1) !== lib_1.Evt.getCtx(obj2));
assert_1.assert(lib_1.Evt.getCtx(obj1) !== lib_1.Evt.getCtx(obj3));
assert_1.assert(lib_1.Evt.getCtx(obj2) !== lib_1.Evt.getCtx(obj3));
console.log("PASS");
//# sourceMappingURL=test60.js.map