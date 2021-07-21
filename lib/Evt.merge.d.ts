import type { UnpackEvt, Evt, CtxLike } from "./types";
export declare type EvtLike<T> = import("./types/helper").EvtLike<T> & {
    attach(ctx: CtxLike<any>, callback: (data: T) => void): void;
    attach(callback: (data: T) => void): void;
};
export declare function mergeImpl<EvtUnion extends EvtLike<any>>(ctx: CtxLike<any> | undefined, evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
/** https://docs.evt.land/api/evt/merge */
export declare function merge<EvtUnion extends EvtLike<any>>(ctx: CtxLike<any>, evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export declare function merge<EvtUnion extends EvtLike<any>>(evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
