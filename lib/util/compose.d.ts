import type { Operator } from "../types/Operator";
export declare function compose<A, B, C>(op1: Operator.fλ<A, B>, op2: Operator.fλ<B, C>): Operator.fλ.Stateless<A, C>;
export declare function compose<A, B, C extends B>(op1: Operator.fλ<A, B>, op2: (data: B) => data is C): Operator.fλ.Stateless<A, C>;
export declare function compose<A, B>(op1: Operator.fλ<A, B>, op2: (data: B) => boolean): Operator.fλ.Stateless<A, B>;
export declare function compose<A, B extends A, C>(op1: (data: A) => data is B, op2: Operator.fλ<B, C>): Operator.fλ.Stateless<A, B>;
export declare function compose<A, B>(op1: (data: A) => boolean, op2: Operator.fλ<A, B>): Operator.fλ.Stateless<A, B>;
export declare function compose<A, B extends A, C extends B>(op1: (data: A) => data is B, op2: (data: B) => data is C): Operator.fλ.Stateless<A, C>;
export declare function compose<A, B extends A>(op1: (data: A) => data is B, op2: (data: B) => boolean): Operator.fλ.Stateless<A, B>;
export declare function compose<A, B extends A>(op1: (data: A) => boolean, op2: (data: A) => data is B): Operator.fλ.Stateless<A, B>;
export declare function compose<A>(op1: (data: A) => boolean, op2: (data: A) => boolean): Operator.fλ.Stateless<A, A>;
export declare function compose<A, B, C, D>(op1: Operator.fλ<A, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>): Operator.fλ.Stateless<A, D>;
export declare function compose<A, B, C, D, E>(op1: Operator.fλ<A, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>, op4: Operator.fλ<D, E>): Operator.fλ.Stateless<A, E>;
export declare function compose<A, B, C, D, E>(op1: Operator.fλ<A, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>, op4: Operator.fλ<D, E>): Operator.fλ.Stateless<A, E>;
export declare function compose<A, B, C, D, E, F>(op1: Operator.fλ<A, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>, op4: Operator.fλ<D, E>, op5: Operator.fλ<E, F>): Operator.fλ.Stateless<A, F>;
export declare function compose<A, B, C>(op1: Operator<A, B>, op2: Operator<B, C>): Operator.fλ.Stateless<A, C>;
export declare function compose<A, B, C, D>(op1: Operator<A, B>, op2: Operator<B, C>, op3: Operator<C, D>): Operator.fλ.Stateless<A, D>;
export declare function compose<A, B, C, D, E>(op1: Operator<A, B>, op2: Operator<B, C>, op3: Operator<C, D>, op4: Operator<D, E>): Operator.fλ.Stateless<A, E>;
export declare function compose<A, B, C, D, E, F>(op1: Operator<A, B>, op2: Operator<B, C>, op3: Operator<C, D>, op4: Operator<D, E>, op5: Operator<E, F>): Operator.fλ.Stateless<A, F>;
export declare function compose<T>(...ops: [
    Operator<T, any>,
    ...Operator<any, any>[]
]): Operator.fλ.Stateless<T, any>;
