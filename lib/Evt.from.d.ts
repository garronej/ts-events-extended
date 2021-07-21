import type { dom, Evt, EvtLike } from "./types";
import type { EventTargetLike } from "./types";
import type { ObserverConstructor } from "./types/Observer";
declare type OneOrMany<T> = T | ArrayLike<T>;
declare type CtxLike<Result> = import("./types").CtxLike<Result> & {
    evtDoneOrAborted: EvtLike<unknown> & {
        postCount: number;
        attachOnce(callback: () => void): void;
    };
};
/** https://docs.evt.land/api/evt/from */
export declare function from<K extends keyof dom.HTMLElementEventMap>(ctx: CtxLike<any>, target: EventTargetLike.HTMLElement, eventName: K, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.HTMLElementEventMap[K]>;
export declare function from<K extends keyof dom.WindowEventMap>(ctx: CtxLike<any>, target: EventTargetLike.Window, eventName: K, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.WindowEventMap[K]>;
export declare function from<K extends keyof dom.DocumentEventMap>(ctx: CtxLike<any>, target: EventTargetLike.Document, eventName: K, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.DocumentEventMap[K]>;
export declare function from<T>(ctx: CtxLike<any>, target: OneOrMany<EventTargetLike.NodeStyleEventEmitter | EventTargetLike.JQueryStyleEventEmitter>, eventName: string): Evt<T>;
export declare function from<T>(ctx: CtxLike<any>, target: OneOrMany<EventTargetLike.HasEventTargetAddRemove<T>>, eventName: string, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<T>;
export declare function from<T>(ctx: CtxLike<any>, target: OneOrMany<EventTargetLike.RxJSSubject<T>>): Evt<T>;
export declare function from<T>(ctx: CtxLike<any>, target: PromiseLike<T>): Evt<T>;
export declare function from<Target, Entry>(ctx: CtxLike<any>, ObserverConstructor: ObserverConstructor<Target, Entry>, target: Target): Evt<Entry>;
export declare function from<K extends keyof dom.HTMLElementEventMap>(target: EventTargetLike.HTMLElement, eventName: K, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.HTMLElementEventMap[K]>;
export declare function from<K extends keyof dom.WindowEventMap>(target: EventTargetLike.Window, eventName: K, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.WindowEventMap[K]>;
export declare function from<K extends keyof dom.DocumentEventMap>(target: EventTargetLike.Document, eventName: K, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.DocumentEventMap[K]>;
export declare function from<T>(target: OneOrMany<EventTargetLike.NodeStyleEventEmitter | EventTargetLike.JQueryStyleEventEmitter>, eventName: string): Evt<T>;
export declare function from<T>(target: OneOrMany<EventTargetLike.HasEventTargetAddRemove<T>>, eventName: string, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<T>;
export declare function from<T>(target: OneOrMany<EventTargetLike.RxJSSubject<T>>): Evt<T>;
export declare function from<T>(target: PromiseLike<T>): Evt<T>;
export declare function from<Target, Entry>(ObserverConstructor: ObserverConstructor<Target, Entry>, target: Target): Evt<Entry>;
export {};
