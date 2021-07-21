import type { Operator } from "../Operator.ts";
import type { StatefulEvt } from "./StatefulEvt.ts";
import type { CtxLike } from "./CtxLike.ts";
import type { Evt } from "./Evt.ts";
import type { Handler } from "../Handler.ts";
export interface NonPostableEvt<T> {

    /** https://docs.evt.land/api/statefulevt#converting-an-evt-into-a-statefulevt */
    toStateful(initialState: T, ctx?: CtxLike): StatefulEvt<T>;
    toStateful(ctx?: CtxLike): StatefulEvt<T | undefined>;

    /** https://docs.evt.land/api/evt/evtattachdetach */
    readonly evtAttach: Evt<Handler<T, any>>;
    /** https://docs.evt.land/api/evt/evtattachdetach */
    readonly evtDetach: Evt<Handler<T, any>>;

    /** https://docs.evt.land/api/evt/setmaxhandlers */
    setMaxHandlers(n: number): this;

    /** 
     * https://docs.evt.land/api/evt/post
     * 
     * Number of times .post(data) have been called.
     */
    readonly postCount: number;

    /** https://docs.evt.land/api/evt/enabletrace */
    enableTrace(
        params: {
            id: string,
            formatter?: (data: T) => string,
            log?: ((message?: any, ...optionalParams: any[]) => void) | false
        }
        //NOTE: Not typeof console.log as we don't want to expose types from node
    ): void;

    /** https://docs.evt.land/api/evt/enabletrace */
    disableTrace(): this;

    /** 
     * TODO: Update doc, it replace: https://docs.evt.land/api/evt/getstatelessop 
     * Maybe this feature is too confusing to be documented...
     * */
    getInvocableOp<U>(op: Operator<T, U>): Operator.fλ.Stateless<T, U>;

    /** TODO: DOC !!! */
    isHandledByOp<U>(op: Operator<T, U>, data: T): boolean;

    /**
     * https://docs.evt.land/api/evt/ishandled
     * 
     * Test if posting a given event data will have an effect.
     * 
     * Return true if:
     * -There is at least one handler matching
     * this event data ( at least one handler's callback function
     * will be invoked if the data is posted. )
     * -Handlers could be will be detached
     * if the event data is posted.
     * 
     */
    isHandled(data: T): boolean;

    /** https://docs.evt.land/api/evt/gethandler */
    getHandlers(): Handler<T, any>[];

    /** 
     * https://docs.evt.land/api/evt/detach
     * 
     * Detach every handlers of the Evt that are bound to the provided context 
     * */
    detach<CtxResult>(ctx: CtxLike<CtxResult>): Handler<T, any, CtxLike<CtxResult>>[];
    /** 
     * https://docs.evt.land/api/evt/detach
     * 
     * (unsafe) Detach every handlers from the Evt 
     * */
    detach(): Handler<T, any>[];

    /** https://docs.evt.land/api/evt/pipe */
    pipe(): Evt<T>;

    pipe<U>(
        op: Operator.fλ<T, U>
    ): Evt<U>;
    pipe<U extends T>(
        op: (data: T) => data is U
    ): Evt<U>;
    pipe(
        op: (data: T) => boolean
    ): Evt<T>;

    pipe(ctx: CtxLike): Evt<T>;

    pipe<U>(
        ctx: CtxLike,
        op: Operator.fλ<T, U>
    ): Evt<U>;
    pipe<U extends T>(
        ctx: CtxLike,
        op: (data: T) => data is U
    ): Evt<U>;
    pipe(
        ctx: CtxLike,
        op: (data: T) => boolean
    ): Evt<T>;

    pipe<B, C>(
        op1: Operator.fλ<T, B>,
        op2: Operator.fλ<B, C>
    ): Evt<C>;
    pipe<B, C extends B>(
        op1: Operator.fλ<T, B>,
        op2: (data: B) => data is C
    ): Evt<C>;
    pipe<B>(
        op1: Operator.fλ<T, B>,
        op2: (data: B) => boolean
    ): Evt<B>;
    pipe<B extends T, C>(
        op1: (data: T) => data is B,
        op2: Operator.fλ<B, C>
    ): Evt<B>;
    pipe<B>(
        op1: (data: T) => boolean,
        op2: Operator.fλ<T, B>
    ): Evt<B>;
    pipe<B extends T, C extends B>(
        op1: (data: T) => data is B,
        op2: (data: B) => data is C
    ): Evt<C>;
    pipe<B extends T>(
        op1: (data: T) => data is B,
        op2: (data: B) => boolean
    ): Evt<B>;
    pipe<B extends T>(
        op1: (data: T) => boolean,
        op2: (data: T) => data is B
    ): Evt<B>;
    pipe<T>(
        op1: (data: T) => boolean,
        op2: (data: T) => boolean
    ): Evt<T>;


    pipe<B, C, D>(
        op1: Operator.fλ<T, B>,
        op2: Operator.fλ<B, C>,
        op3: Operator.fλ<C, D>
    ): Evt<D>;

    pipe<B, C, D, E>(
        op1: Operator.fλ<T, B>,
        op2: Operator.fλ<B, C>,
        op3: Operator.fλ<C, D>,
        op4: Operator.fλ<D, E>
    ): Evt<E>;

    pipe<B, C, D, E>(
        op1: Operator.fλ<T, B>,
        op2: Operator.fλ<B, C>,
        op3: Operator.fλ<C, D>,
        op4: Operator.fλ<D, E>
    ): Evt<E>;

    pipe<B, C, D, E, F>(
        op1: Operator.fλ<T, B>,
        op2: Operator.fλ<B, C>,
        op3: Operator.fλ<C, D>,
        op4: Operator.fλ<D, E>,
        op5: Operator.fλ<E, F>
    ): Evt<F>;


    pipe<B, C>(
        op1: Operator<T, B>,
        op2: Operator<B, C>
    ): Evt<C>;

    pipe<B, C, D>(
        op1: Operator<T, B>,
        op2: Operator<B, C>,
        op3: Operator<C, D>
    ): Evt<D>;

    pipe<B, C, D, E>(
        op1: Operator<T, B>,
        op2: Operator<B, C>,
        op3: Operator<C, D>,
        op4: Operator<D, E>
    ): Evt<E>;

    pipe<B, C, D, E, F>(
        op1: Operator<T, B>,
        op2: Operator<B, C>,
        op3: Operator<C, D>,
        op4: Operator<D, E>,
        op5: Operator<E, F>
    ): Evt<F>;

    pipe(
        ...ops: [
            Operator<T, any>,
            ...Operator<any, any>[]
        ]
    ): Evt<any>;

    pipe<T>(
        ...ops: [
            Operator<T, any>,
            ...Operator<any, any>[]
        ]
    ): Evt<any>;

    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout?
     */
    waitFor<U>(
        op: Operator.fλ.Stateless<T, U>,
        ctx: CtxLike,
        timeout?: number
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout?
     */
    waitFor<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike,
        timeout?: number
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout?
     */
    waitFor(
        op: (data: T) => boolean,
        ctx: CtxLike,
        timeout?: number
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - fλ
     * 
     * timeout?
     */
    waitFor<U>(
        op: Operator.fλ.Stateless<T, U>,
        timeout?: number
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - Type guard
     * 
     * timeout?
     */
    waitFor<Q extends T>(
        op: (data: T) => data is Q,
        timeout?: number
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - Filter
     * 
     * timeout?
     */
    waitFor(
        op: (data: T) => boolean,
        timeout?: number
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * ctx
     * 
     * timeout?
     */
    waitFor(
        ctx: CtxLike,
        timeout?: number
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * timeout?
     */
    waitFor(
        timeout?: number
    ): Promise<T>;







    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attach<U>(
        op: Operator.fλ<T, U>,
        ctx: CtxLike,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attach<U>(
        op: Operator.fλ<T, U>,
        ctx: CtxLike,
        callback: (transformedData: U) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attach<U>(
        op: Operator.fλ<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attach<U>(
        op: Operator.fλ<T, U>,
        callback: (transformedData: U) => void
    ): this;







    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attach() method )
     * 
     */
    attach<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attach() method )
     */
    attach(
        op: (data: T) => boolean,
        ctx: CtxLike,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attach() method )
     */
    attach<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike,
        callback: (data: Q) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attach() method )
     */
    attach(
        op: (data: T) => boolean,
        ctx: CtxLike,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attach() method )
     */
    attach<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attach() method )
     */
    attach(
        op: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    attach(
        ctx: CtxLike,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attach() method )
     */
    attach<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attach() method )
     */
    attach(
        op: (data: T) => boolean,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    attach(
        ctx: CtxLike,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * timeout
     * 
     * callback
     */
    attach(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * callback 
     */
    attach(
        callback: (data: T) => void
    ): this;




    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: $attachOnce() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attachOnce() without the '$' prefix.
     */
    $attachOnce<U>(
        op: Operator.fλ.Stateless<T, U>,
        ctx: CtxLike,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     * 
     * NOTE: $attachOnce() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attachOnce() without the '$' prefix.
     */
    $attachOnce<U>(
        op: Operator.fλ.Stateless<T, U>,
        ctx: CtxLike,
        callback: (transformedData: U) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: $attachOnce() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attachOnce() without the '$' prefix.
     */
    $attachOnce<U>(
        op: Operator.fλ.Stateless<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     * 
     * NOTE: $attachOnce() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attachOnce() without the '$' prefix.
     */
    $attachOnce<U>(
        op: Operator.fλ.Stateless<T, U>,
        callback: (transformedData: U) => void
    ): this;






    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attachOnce() method )
     */
    attachOnce<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attachOnce() method )
     */
    attachOnce(
        op: (data: T) => boolean,
        ctx: CtxLike,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attachOnce() method )
     */
    attachOnce<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike,
        callback: (data: Q) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attachOnce() method )
     */
    attachOnce(
        op: (data: T) => boolean,
        ctx: CtxLike,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attachOnce() method )
     */
    attachOnce<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attachOnce() method )
     */
    attachOnce(
        op: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    attachOnce(
        ctx: CtxLike,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attachOnce() method )
     */
    attachOnce<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * callback
     * 
     * NOTE: If you whish to use a fλ operator ( an operator that do not return a boolean )
     * the '$' prefix should be used ( use the $attachOnce() method )
     */
    attachOnce(
        op: (data: T) => boolean,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    attachOnce(
        ctx: CtxLike,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * timeout
     * 
     * callback
     */
    attachOnce(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * callback
     */
    attachOnce(
        callback: (data: T) => void
    ): this;





    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachExtract<U>(
        op: Operator.fλ<T, U>,
        ctx: CtxLike,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachExtract<U>(
        op: Operator.fλ<T, U>,
        ctx: CtxLike,
        callback: (transformedData: U) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachExtract<U>(
        op: Operator.fλ<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachExtract<U>(
        op: Operator.fλ<T, U>,
        callback: (transformedData: U) => void
    ): this;








    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    attachExtract<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    attachExtract(
        op: (data: T) => boolean,
        ctx: CtxLike,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    attachExtract<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike,
        callback: (data: Q) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    attachExtract(
        op: (data: T) => boolean,
        ctx: CtxLike,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    attachExtract<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    attachExtract(
        op: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     */
    attachExtract(
        ctx: CtxLike,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * callback
     */
    attachExtract<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * callback
     */
    attachExtract(
        op: (data: T) => boolean,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    attachExtract(
        ctx: CtxLike,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * timeout
     * 
     * callback
     */
    attachExtract(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * callback
     */
    attachExtract(
        callback: (data: T) => void
    ): this;











    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachPrepend<U>(
        op: Operator.fλ<T, U>,
        ctx: CtxLike,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachPrepend<U>(
        op: Operator.fλ<T, U>,
        ctx: CtxLike,
        callback: (transformedData: U) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachPrepend<U>(
        op: Operator.fλ<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachPrepend<U>(
        op: Operator.fλ<T, U>,
        callback: (transformedData: U) => void
    ): this;









    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    attachPrepend<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;

    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    attachPrepend(
        op: (data: T) => boolean,
        ctx: CtxLike,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;

    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    attachPrepend<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike,
        callback: (data: Q) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    attachPrepend(
        op: (data: T) => boolean,
        ctx: CtxLike,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    attachPrepend<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    attachPrepend(
        op: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    attachPrepend(
        ctx: CtxLike,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * callback
     */
    attachPrepend<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * callback
     */
    attachPrepend(
        op: (data: T) => boolean,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    attachPrepend(
        ctx: CtxLike,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * timeout
     * 
     * callback
     */
    attachPrepend(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * callback
     */
    attachPrepend(
        callback: (data: T) => void
    ): this;







    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachOncePrepend<U>(
        op: Operator.fλ.Stateless<T, U>,
        ctx: CtxLike,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachOncePrepend<U>(
        op: Operator.fλ.Stateless<T, U>,
        ctx: CtxLike,
        callback: (transformedData: U) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachOncePrepend<U>(
        op: Operator.fλ.Stateless<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachOncePrepend<U>(
        op: Operator.fλ.Stateless<T, U>,
        callback: (transformedData: U) => void
    ): this;









    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    attachOncePrepend<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    attachOncePrepend(
        op: (data: T) => boolean,
        ctx: CtxLike,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    attachOncePrepend<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike,
        callback: (data: Q) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    attachOncePrepend(
        op: (data: T) => boolean,
        ctx: CtxLike,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    attachOncePrepend<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    attachOncePrepend(
        op: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    attachOncePrepend(
        ctx: CtxLike,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * callback
     */
    attachOncePrepend<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * callback
     */
    attachOncePrepend(
        op: (data: T) => boolean,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    attachOncePrepend(
        ctx: CtxLike,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * timeout
     * 
     * callback
     */
    attachOncePrepend(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * callback
     */
    attachOncePrepend(
        callback: (data: T) => void
    ): this;








    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachOnceExtract<U>(
        op: Operator.fλ.Stateless<T, U>,
        ctx: CtxLike,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachOnceExtract<U>(
        op: Operator.fλ.Stateless<T, U>,
        ctx: CtxLike,
        callback: (transformedData: U) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachOnceExtract<U>(
        op: Operator.fλ.Stateless<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     * 
     * NOTE: $attach() with '$' is to use only with fλ operators,
     * if your operator return a boolean use the attach() without the '$' prefix.
     */
    $attachOnceExtract<U>(
        op: Operator.fλ.Stateless<T, U>,
        callback: (transformedData: U) => void
    ): this;








    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    attachOnceExtract<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    attachOnceExtract(
        op: (data: T) => boolean,
        ctx: CtxLike,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    attachOnceExtract<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike,
        callback: (data: Q) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    attachOnceExtract(
        op: (data: T) => boolean,
        ctx: CtxLike,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    attachOnceExtract<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    attachOnceExtract(
        op: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     */
    attachOnceExtract(
        ctx: CtxLike,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * callback
     */
    attachOnceExtract<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * callback
     */
    attachOnceExtract(
        op: (data: T) => boolean,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    attachOnceExtract(
        ctx: CtxLike,
        callback: (data: T) => void
    ): this;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * timeout
     * 
     * callback
     */
    attachOnceExtract(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * callback
     */
    attachOnceExtract(
        callback: (data: T) => void
    ): this;

}



