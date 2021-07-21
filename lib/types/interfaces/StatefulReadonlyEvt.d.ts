import type { Operator } from "../Operator";
import type { NonPostableEvt } from "./NonPostableEvt";
import type { CtxLike } from "./CtxLike";
import type { StatefulEvt } from "./StatefulEvt";
import type { Evt } from "./Evt";
export declare type StateDiff<T> = {
    prevState: T;
    newState: T;
};
export interface StatefulReadonlyEvt<T> extends NonPostableEvt<T> {
    /** https://docs.evt.land/api/statefulevt#tostateless-ctx */
    toStateless(ctx?: CtxLike): Evt<T>;
    readonly state: T;
    /** https://docs.evt.land/api/statefulevt#evtdiff */
    readonly evtDiff: NonPostableEvt<StateDiff<T>>;
    /** https://docs.evt.land/api/statefulevt#evtchange */
    readonly evtChange: StatefulReadonlyEvt<T>;
    /** https://docs.evt.land/api/statefulevt#evtchangediff */
    readonly evtChangeDiff: NonPostableEvt<StateDiff<T>>;
    /** https://docs.evt.land/api/statefulevt#pipe */
    pipe(): StatefulEvt<T>;
    pipe<U>(op: Operator.fλ<T, U>): StatefulEvt<U>;
    pipe<U extends T>(op: (data: T) => data is U): StatefulEvt<U>;
    pipe(op: (data: T) => boolean): StatefulEvt<T>;
    pipe(ctx: CtxLike<any>): StatefulEvt<T>;
    pipe<U>(ctx: CtxLike<any>, op: Operator.fλ<T, U>): StatefulEvt<U>;
    pipe<U extends T>(ctx: CtxLike<any>, op: (data: T) => data is U): StatefulEvt<U>;
    pipe(ctx: CtxLike<any>, op: (data: T) => boolean): StatefulEvt<T>;
    pipe<B, C>(op1: Operator.fλ<T, B>, op2: Operator.fλ<B, C>): StatefulEvt<C>;
    pipe<B, C extends B>(op1: Operator.fλ<T, B>, op2: (data: B) => data is C): StatefulEvt<C>;
    pipe<B>(op1: Operator.fλ<T, B>, op2: (data: B) => boolean): StatefulEvt<B>;
    pipe<B extends T, C>(op1: (data: T) => data is B, op2: Operator.fλ<B, C>): StatefulEvt<B>;
    pipe<B>(op1: (data: T) => boolean, op2: Operator.fλ<T, B>): StatefulEvt<B>;
    pipe<B extends T, C extends B>(op1: (data: T) => data is B, op2: (data: B) => data is C): StatefulEvt<C>;
    pipe<B extends T>(op1: (data: T) => data is B, op2: (data: B) => boolean): StatefulEvt<B>;
    pipe<B extends T>(op1: (data: T) => boolean, op2: (data: T) => data is B): StatefulEvt<B>;
    pipe<T>(op1: (data: T) => boolean, op2: (data: T) => boolean): StatefulEvt<T>;
    pipe<B, C, D>(op1: Operator.fλ<T, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>): StatefulEvt<D>;
    pipe<B, C, D, E>(op1: Operator.fλ<T, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>, op4: Operator.fλ<D, E>): StatefulEvt<E>;
    pipe<B, C, D, E>(op1: Operator.fλ<T, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>, op4: Operator.fλ<D, E>): StatefulEvt<E>;
    pipe<B, C, D, E, F>(op1: Operator.fλ<T, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>, op4: Operator.fλ<D, E>, op5: Operator.fλ<E, F>): StatefulEvt<F>;
    pipe<B, C>(op1: Operator<T, B>, op2: Operator<B, C>): StatefulEvt<C>;
    pipe<B, C, D>(op1: Operator<T, B>, op2: Operator<B, C>, op3: Operator<C, D>): StatefulEvt<D>;
    pipe<B, C, D, E>(op1: Operator<T, B>, op2: Operator<B, C>, op3: Operator<C, D>, op4: Operator<D, E>): StatefulEvt<E>;
    pipe<B, C, D, E, F>(op1: Operator<T, B>, op2: Operator<B, C>, op3: Operator<C, D>, op4: Operator<D, E>, op5: Operator<E, F>): StatefulEvt<F>;
    pipe(...ops: [
        Operator<T, any>,
        ...Operator<any, any>[]
    ]): StatefulEvt<any>;
    pipe<T>(...ops: [
        Operator<T, any>,
        ...Operator<any, any>[]
    ]): StatefulEvt<any>;
}
