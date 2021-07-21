
import type { Operator } from "../types/Operator.ts";

function encapsulateOpState<T, U>(
    statefulFλOp: Operator.fλ.Stateful<T, U>
): Operator.fλ.Stateless<T, U> {

    let state: U = statefulFλOp[1];

    return (data, registerSideEffect) => {

        const opResult = statefulFλOp[0](data, state, registerSideEffect);

        if (opResult !== null) {
            registerSideEffect(() => state = opResult[0])
        }

        return opResult;

    };

}

function statelessOpToStatelessFλ<T, U>(op: Operator.Stateless<T, U>): Operator.fλ.Stateless<T, U> {
    return (data, registerSideEffect) => {

        /* NOTE: Here, if the user is using TypeScript we should have readonly [U] or boolean
         * but users using vanilla JS can very well provide operators like: text => text.match(/^error/) 
         * and expect things to work event if String.prototype.match returns a RegExpMatch array instead 
         * of boolean. 
         * Long story short we do our best to guess what the user meant with he's operator, if it was
         * intended to be a filter or a fλ.
         */
        const opResult: any = (op as Operator.fλ.Stateless<T, U>)(data, registerSideEffect);

        return (
            opResult instanceof Object &&
            !("input" in opResult) && //exclude String.prototype.match
            opResult.length === 1
        ) ?
            opResult
            :
            !!opResult ? [data] : null;

    }
};

export function convertOperatorToStatelessFλ<T, U>(
    op: Operator<T, U>
): Operator.fλ.Stateless<T, U> {
    return typeof op !== "function" ?
        encapsulateOpState(op) :
        statelessOpToStatelessFλ(op);
}
