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
var e_1, _a, e_2, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../lib/index");
var evt = new index_1.Evt();
//evt.enableTrace("evt");
var evtProxy = new index_1.Evt();
//evtProxy.enableTrace("evtProxy");
{
    var map_1 = new Map();
    evt.attach(function (data) {
        if (!map_1.has(data)) {
            map_1.set(data, index_1.Evt.newCtx());
        }
        if (!evtProxy.evtAttach.postCount) {
            evtProxy.evtAttach.attachOnce(map_1.get(data), function () { return evtProxy.post(data); });
        }
        else {
            evtProxy.post(data);
        }
    });
}
try {
    for (var _c = __values(["a", "b", "c", "d", "e"]), _d = _c.next(); !_d.done; _d = _c.next()) {
        var char = _d.value;
        evt.post(char);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
    }
    finally { if (e_1) throw e_1.error; }
}
var alphabet = "";
evtProxy.attach(function (data) {
    alphabet += data;
});
try {
    for (var _e = __values(["f", "g", "h"]), _f = _e.next(); !_f.done; _f = _e.next()) {
        var char = _f.value;
        evt.post(char);
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
    }
    finally { if (e_2) throw e_2.error; }
}
//cSpell: disable
console.assert(alphabet === "abcdefgh");
//cSpell: enable
console.log("PASS");
//# sourceMappingURL=test2.js.map