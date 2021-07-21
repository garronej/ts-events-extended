"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertOperatorToStatelessFλ = void 0;
function encapsulateOpState(statefulFλOp) {
    var state = statefulFλOp[1];
    return function (data, registerSideEffect) {
        var opResult = statefulFλOp[0](data, state, registerSideEffect);
        if (opResult !== null) {
            registerSideEffect(function () { return state = opResult[0]; });
        }
        return opResult;
    };
}
function statelessOpToStatelessFλ(op) {
    return function (data, registerSideEffect) {
        /* NOTE: Here, if the user is using TypeScript we should have readonly [U] or boolean
         * but users using vanilla JS can very well provide operators like: text => text.match(/^error/)
         * and expect things to work event if String.prototype.match returns a RegExpMatch array instead
         * of boolean.
         * Long story short we do our best to guess what the user meant with he's operator, if it was
         * intended to be a filter or a fλ.
         */
        var opResult = op(data, registerSideEffect);
        return (opResult instanceof Object &&
            !("input" in opResult) && //exclude String.prototype.match
            opResult.length === 1) ?
            opResult
            :
                !!opResult ? [data] : null;
    };
}
;
function convertOperatorToStatelessFλ(op) {
    return typeof op !== "function" ?
        encapsulateOpState(op) :
        statelessOpToStatelessFλ(op);
}
exports.convertOperatorToStatelessFλ = convertOperatorToStatelessFλ;
//# sourceMappingURL=convertOperatorToStatelessFLambda.js.map