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
exports.compose = void 0;
var convertOperatorToStatelessFLambda_1 = require("./convertOperatorToStatelessFLambda");
var id_1 = require("tsafe/id");
function f_o_g(op1, op2) {
    var opAtoB = convertOperatorToStatelessFLambda_1.convertOperatorToStatelessFλ(op1);
    var opBtoC = convertOperatorToStatelessFLambda_1.convertOperatorToStatelessFλ(op2);
    return id_1.id(function (dataA, registerSideEffect) {
        var resultB = opAtoB(dataA, registerSideEffect);
        if (!resultB) {
            return null;
        }
        var _a = __read(resultB, 1), dataB = _a[0];
        var resultC = opBtoC(dataB, registerSideEffect);
        if (!resultC) {
            return resultC;
        }
        return [resultC[0]];
    });
}
function compose() {
    var ops = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ops[_i] = arguments[_i];
    }
    if (ops.length === 1) {
        var _a = __read(ops, 1), op = _a[0];
        return convertOperatorToStatelessFLambda_1.convertOperatorToStatelessFλ(op);
    }
    var _b = __read(ops), op1 = _b[0], op2 = _b[1], rest = _b.slice(2);
    var op1_o_op2 = f_o_g(op1, op2);
    if (rest.length === 0) {
        return op1_o_op2;
    }
    return compose.apply(void 0, __spreadArray([op1_o_op2], __read(rest)));
}
exports.compose = compose;
//# sourceMappingURL=compose.js.map