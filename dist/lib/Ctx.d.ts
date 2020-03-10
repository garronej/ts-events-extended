import { Handler } from "./types/Handler";
import { Bindable } from "./types/Bindable";
declare type EvtCore<T> = import("./EvtCore").EvtCore<T>;
export declare class Ctx {
    static __CtxForEvtBrand: boolean;
    private static readonly __CTX_FOR_EVT_VERSION;
    private evtDetachedInitialPostCount;
    private evtDetach;
    getEvtDetach(): NonNullable<typeof Ctx.prototype.evtDetach>;
    detach(attachedTo?: EvtCore<any>): Handler.WithEvt<any>[];
    private handlers;
    private evtByHandler;
    getHandlers(): Handler.WithEvt<any>[];
    static __addHandlerToCtxCore<T>(handler: Handler<T, any, Ctx>, evt: EvtCore<T>): void;
    static __removeHandlerFromCtxCore(handler: Handler<any, any, Ctx>): void;
    private static match;
    static matchHandler<T>(handler: Handler<T, any, Bindable>): handler is Handler<T, any, Ctx>;
}
export {};
