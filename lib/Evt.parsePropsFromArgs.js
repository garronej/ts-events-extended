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
exports.parsePropsFromArgs = exports.matchAll = void 0;
var id_1 = require("tsafe/id");
var compose_1 = require("./util/compose");
var typeGuard_1 = require("tsafe/typeGuard");
function matchAll() { return true; }
exports.matchAll = matchAll;
var canBeOperator = function (p) {
    return (p !== undefined &&
        typeGuard_1.typeGuard(p, true) &&
        (typeof p === "function" ||
            typeof p[0] === "function"));
};
var defaultParams = {
    "op": matchAll,
    "ctx": undefined,
    "timeout": undefined,
    "callback": undefined
};
function parsePropsFromArgs(inputs, methodName) {
    switch (methodName) {
        case "pipe":
            {
                //[]
                //[undefined] ( not valid but user would expect it to work )
                //[ ctx, ...op[] ]
                //[ ...op[] ]
                var getOpWrap = function (ops) {
                    return ops.length === 0 ?
                        {}
                        :
                            { "op": ops.length === 1 ? ops[0] : compose_1.compose.apply(void 0, __spreadArray([], __read(ops))) };
                };
                if (canBeOperator(inputs[0])) {
                    //[ ...op[] ]
                    return id_1.id(__assign(__assign({}, defaultParams), getOpWrap(inputs)));
                }
                else {
                    //[]
                    //[ ctx, ...Operator.fλ[] ]
                    var _a = __read(inputs), ctx = _a[0], rest = _a.slice(1);
                    return id_1.id(__assign(__assign(__assign({}, defaultParams), (ctx !== undefined ? { ctx: ctx } : {})), getOpWrap(rest)));
                }
            }
            break;
        case "waitFor":
            {
                //[ op, ctx, timeout ]
                //[ op, ctx, undefined ]
                //[ op, ctx ]
                //[ op, timeout ]
                //[ op, undefined ]
                //[ ctx, timeout ]
                //[ ctx, undefined ]
                //[ op ]
                //[ ctx ]
                //[ timeout ]
                //[ undefined ]
                //[ callback ]
                return parsePropsFromArgs(__spreadArray(__spreadArray([], __read(inputs.filter(function (value, index) { return !(index === inputs.length - 1 &&
                    value === undefined); }))), [
                    defaultParams.callback
                ]), "attach*");
            }
            break;
        case "attach*":
            {
                //NOTE: when callback is undefined call has been forward from waitFor.
                //[ op, ctx, timeout, callback ]
                //[ op, ctx, timeout, undefined ]
                //[ op, ctx, callback ]
                //[ op, ctx, undefined ]
                //[ op, timeout, callback ]
                //[ op, timeout, undefined ]
                //[ ctx, timeout, callback ]
                //[ ctx, timeout, undefined ]
                //[ op, callback ]
                //[ op, undefined ]
                //[ ctx, callback ]
                //[ ctx, undefined ]
                //[ timeout, callback ]
                //[ timeout, undefined ]
                //[ callback ]
                //[ undefined ]
                var n = inputs.length;
                switch (n) {
                    case 4: {
                        //[ op, ctx, timeout, callback ]
                        var _b = __read(inputs, 4), p1 = _b[0], p2 = _b[1], p3 = _b[2], p4 = _b[3];
                        return id_1.id(__assign(__assign({}, defaultParams), { "op": p1, "ctx": p2, "timeout": p3, "callback": p4 }));
                    }
                    case 3: {
                        //[ op, ctx, callback ]
                        //[ op, timeout, callback ]
                        //[ ctx, timeout, callback ]
                        var _c = __read(inputs, 3), p1 = _c[0], p2 = _c[1], p3 = _c[2];
                        if (typeof p2 === "number") {
                            //[ op, timeout, callback ]
                            //[ ctx, timeout, callback ]
                            var timeout = p2;
                            var callback = p3;
                            if (canBeOperator(p1)) {
                                //[ op, timeout, callback ]
                                return id_1.id(__assign(__assign({}, defaultParams), { timeout: timeout,
                                    callback: callback, "op": p1 }));
                            }
                            else {
                                //[ ctx, timeout, callback ]
                                return id_1.id(__assign(__assign({}, defaultParams), { timeout: timeout,
                                    callback: callback, "ctx": p1 }));
                            }
                        }
                        else {
                            //[ op, ctx, callback ]
                            return id_1.id(__assign(__assign({}, defaultParams), { "op": p1, "ctx": p2, "callback": p3 }));
                        }
                    }
                    case 2: {
                        //[ op, callback ]
                        //[ ctx, callback ]
                        //[ timeout, callback ]
                        var _d = __read(inputs, 2), p1 = _d[0], p2 = _d[1];
                        if (typeof p1 === "number") {
                            //[ timeout, callback ]
                            return id_1.id(__assign(__assign({}, defaultParams), { "timeout": p1, "callback": p2 }));
                        }
                        else {
                            //[ op, callback ]
                            //[ ctx, callback ]
                            var callback = p2;
                            if (canBeOperator(p1)) {
                                return id_1.id(__assign(__assign({}, defaultParams), { callback: callback, "op": p1 }));
                            }
                            else {
                                return id_1.id(__assign(__assign({}, defaultParams), { callback: callback, "ctx": p1 }));
                            }
                        }
                    }
                    case 1: {
                        //[ callback ]
                        var _e = __read(inputs, 1), p = _e[0];
                        return id_1.id(__assign(__assign({}, defaultParams), { "callback": p }));
                    }
                    case 0: {
                        return id_1.id(__assign({}, defaultParams));
                    }
                }
            }
            break;
    }
}
exports.parsePropsFromArgs = parsePropsFromArgs;
//# sourceMappingURL=Evt.parsePropsFromArgs.js.map