import type { Operator } from "./Operator";
import type { EvtLike } from "../types/helper";
import type { CtxLike } from "../types/interfaces";
/** https://docs.evt.land/api/handler */
export declare type Handler<T, U, CtxProp extends CtxLike<any> | undefined = CtxLike<any> | undefined> = Handler.PropsFromArgs<T, U, CtxProp> & Handler.PropsFromMethodName & Readonly<{
    detach(): boolean;
    promise: Promise<U>;
}>;
export declare namespace Handler {
    /** Handlers params that come from the arguments passed to the method invoked */
    type PropsFromArgs<T, U, CtxProp extends CtxLike<any> | undefined = CtxLike<any> | undefined> = {
        ctx: CtxProp;
        timeout: number | undefined;
        op: Operator<T, U>;
        callback: ((transformedData: U) => void) | undefined;
    };
    /**
     * Handlers params that are implicitly specified by the method used:
     * attachOnce => once
     * attachOncePrepend => once + prepend
     * waitFor => once + async
     * ...
     */
    type PropsFromMethodName = PropsFromMethodName.Sync | PropsFromMethodName.Async;
    namespace PropsFromMethodName {
        type Common = Readonly<{
            prepend: true;
            extract: true;
        } | {
            prepend: boolean;
            extract: false;
        }>;
        export type Sync = Common & Readonly<{
            async: false;
            once: boolean;
        }>;
        export type Async = Common & Readonly<{
            async: true;
            once: true;
        }>;
        export {};
    }
    type WithEvt<T, CtxResult> = {
        handler: Handler<T, any, CtxLike<CtxResult>>;
        evt: EvtLike<T>;
    };
}
