import "minimal-polyfills/Array.prototype.find";
import { create } from "./Evt.create";
import { getCtxFactory } from "./Evt.getCtx";
import { factorize } from "./Evt.factorize";
import { merge } from "./Evt.merge";
import { from } from "./Evt.from";
import { asPostable } from "./Evt.asPostable";
import { asyncPipe } from "./Evt.asyncPipe";
import { asNonPostable } from "./Evt.asNonPostable";
import { newCtx } from "./Evt.newCtx";
import { loosenType } from "./Evt.loosenType";
import type { Handler, EvtLike } from "./types";
/** https://docs.evt.land/api/evt */
export declare type Evt<T> = import("./types/interfaces/Evt").Evt<T>;
/**
 * Can be seen as a protected method that can be
 * optionally be implemented by class extending Evt.
 *
 * Should only be accessible from within the module.
 * Basically it is for allowing StatefulEvt to execute
 * the callback on attach.
 */
export declare const onAddHandlerByEvt: WeakMap<EvtLike<any>, (handler: Handler<any, any>, handlerTrigger: (opResult: readonly [any]) => PromiseLike<void> | undefined) => void>;
export declare const Evt: {
    new <T>(): Evt<T>;
    readonly prototype: Evt<any>;
    readonly create: typeof create;
    readonly newCtx: typeof newCtx;
    readonly merge: typeof merge;
    readonly from: typeof from;
    readonly getCtx: ReturnType<typeof getCtxFactory>;
    readonly loosenType: typeof loosenType;
    readonly factorize: typeof factorize;
    readonly asPostable: typeof asPostable;
    readonly asyncPipe: typeof asyncPipe;
    readonly asNonPostable: typeof asNonPostable;
    /** https://docs.evt.land/api/evt/setdefaultmaxhandlers */
    setDefaultMaxHandlers(n: number): void;
};
