import { convertOperatorToStatelessFλ } from "./convertOperatorToStatelessFLambda.ts";
import { id } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/id.ts";
import type { Operator } from "../types/Operator.ts";

function f_o_g<A, B, C>(
    op1: Operator<A, B>,
    op2: Operator<B, C>
): Operator.fλ.Stateless<A, C> {

    const opAtoB = convertOperatorToStatelessFλ(op1);

    const opBtoC = convertOperatorToStatelessFλ(op2);

    return id<Operator.fλ.Stateless<A, C>>(
        (dataA, registerSideEffect) => {

            const resultB = opAtoB(dataA, registerSideEffect);

            if( !resultB ){
                return null;
            }

            const [dataB] = resultB;

            const resultC = opBtoC(dataB, registerSideEffect);

            if( !resultC ){
                return resultC;
            }

            return [resultC[0]];

        }
    );
}


export function compose<A, B, C>(
    op1: Operator.fλ<A, B>,
    op2: Operator.fλ<B, C>
): Operator.fλ.Stateless<A, C>;
export function compose<A, B, C extends B>(
    op1: Operator.fλ<A, B>,
    op2: (data: B) => data is C,
): Operator.fλ.Stateless<A, C>;
export function compose<A, B>(
    op1: Operator.fλ<A, B>,
    op2: (data: B) => boolean,
): Operator.fλ.Stateless<A, B>;
export function compose<A, B extends A, C>(
    op1: (data: A) => data is B,
    op2: Operator.fλ<B, C>
): Operator.fλ.Stateless<A, B>;
export function compose<A, B>(
    op1: (data: A) => boolean,
    op2: Operator.fλ<A, B>
): Operator.fλ.Stateless<A, B>;
export function compose<A, B extends A, C extends B>(
    op1: (data: A) => data is B,
    op2: (data: B) => data is C,
): Operator.fλ.Stateless<A, C>;
export function compose<A, B extends A>(
    op1: (data: A) => data is B,
    op2: (data: B) => boolean,
): Operator.fλ.Stateless<A, B>;
export function compose<A, B extends A>(
    op1: (data: A) => boolean,
    op2: (data: A) => data is B
): Operator.fλ.Stateless<A, B>;
export function compose<A>(
    op1: (data: A) => boolean,
    op2: (data: A) => boolean,
): Operator.fλ.Stateless<A, A>;


export function compose<A, B, C, D>(
    op1: Operator.fλ<A, B>,
    op2: Operator.fλ<B, C>,
    op3: Operator.fλ<C, D>
): Operator.fλ.Stateless<A, D>;

export function compose<A, B, C, D, E>(
    op1: Operator.fλ<A, B>,
    op2: Operator.fλ<B, C>,
    op3: Operator.fλ<C, D>,
    op4: Operator.fλ<D, E>
): Operator.fλ.Stateless<A, E>;

export function compose<A, B, C, D, E>(
    op1: Operator.fλ<A, B>,
    op2: Operator.fλ<B, C>,
    op3: Operator.fλ<C, D>,
    op4: Operator.fλ<D, E>
): Operator.fλ.Stateless<A, E>;

export function compose<A, B, C, D, E, F>(
    op1: Operator.fλ<A, B>,
    op2: Operator.fλ<B, C>,
    op3: Operator.fλ<C, D>,
    op4: Operator.fλ<D, E>,
    op5: Operator.fλ<E, F>
): Operator.fλ.Stateless<A, F>;


export function compose<A, B, C>(
    op1: Operator<A, B>,
    op2: Operator<B, C>
): Operator.fλ.Stateless<A, C>;

export function compose<A, B, C, D>(
    op1: Operator<A, B>,
    op2: Operator<B, C>,
    op3: Operator<C, D>
): Operator.fλ.Stateless<A, D>;

export function compose<A, B, C, D, E>(
    op1: Operator<A, B>,
    op2: Operator<B, C>,
    op3: Operator<C, D>,
    op4: Operator<D, E>,
): Operator.fλ.Stateless<A, E>;

export function compose<A, B, C, D, E, F>(
    op1: Operator<A, B>,
    op2: Operator<B, C>,
    op3: Operator<C, D>,
    op4: Operator<D, E>,
    op5: Operator<E, F>
): Operator.fλ.Stateless<A, F>;


export function compose<T>(
    ...ops: [
        Operator<T, any>,
        ...Operator<any, any>[]
    ]
): Operator.fλ.Stateless<T, any>;

export function compose<T>(
    ...ops: [
        Operator<T, any>,
        ...Operator<any, any>[]
    ]
): Operator.fλ.Stateless<T, any>  {

    if (ops.length === 1) {

        const [op] = ops;

        return convertOperatorToStatelessFλ(op);

    }

    const [op1, op2, ...rest] = ops;

    const op1_o_op2 = f_o_g(op1, op2);

    if (rest.length === 0) {
        return op1_o_op2;
    }

    return compose(op1_o_op2, ...rest);


}
