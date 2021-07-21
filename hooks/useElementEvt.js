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
exports.useElementEvt = void 0;
var React = require("react");
var useRef = React.useRef, useEffect = React.useEffect, useState = React.useState;
var useEvt_1 = require("./useEvt");
function useElementEvt(effect, depsOrRef, depsOrUndefined) {
    var _a;
    var isRefProvided = depsOrUndefined !== undefined;
    var deps = depsOrUndefined !== null && depsOrUndefined !== void 0 ? depsOrUndefined : depsOrRef;
    var refInternallyCreated = useRef(null);
    var ref = isRefProvided ? depsOrRef : refInternallyCreated;
    var _b = __read(useState(null), 2), element = _b[0], setElement = _b[1];
    useEffect(function () { setElement(ref.current); }, [(_a = ref.current) !== null && _a !== void 0 ? _a : Object]);
    useEvt_1.useEvt(function (ctx) {
        if (element === null) {
            return;
        }
        effect({ ctx: ctx, element: element });
    }, __spreadArray([element !== null && element !== void 0 ? element : Object], __read(deps)));
    return { ref: ref };
}
exports.useElementEvt = useElementEvt;
//# sourceMappingURL=useElementEvt.js.map