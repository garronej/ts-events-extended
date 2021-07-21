import "https://raw.githubusercontent.com/garronej/minimal_polyfills/v2.2.1/deno_dist/Array.prototype.find.ts";
import { importProxy } from "./importProxy.ts";
import { create } from "./Evt.create.ts";
import { getCtxFactory } from "./Evt.getCtx.ts";
import { factorize } from "./Evt.factorize.ts";
import { merge } from "./Evt.merge.ts";
import { from } from "./Evt.from.ts";
import { asPostable } from "./Evt.asPostable.ts";
import { asyncPipe } from "./Evt.asyncPipe.ts";
import { asNonPostable } from "./Evt.asNonPostable.ts";
import { parsePropsFromArgs, matchAll } from "./Evt.parsePropsFromArgs.ts";
import { newCtx } from "./Evt.newCtx.ts";
import { LazyEvt } from "./LazyEvt.ts";
import { Polyfill as Map, LightMap } from "https://raw.githubusercontent.com/garronej/minimal_polyfills/v2.2.1/deno_dist/Map.ts";
import { Polyfill as WeakMap } from "https://raw.githubusercontent.com/garronej/minimal_polyfills/v2.2.1/deno_dist/WeakMap.ts";
import * as runExclusive from "https://raw.githubusercontent.com/garronej/run_exclusive/v2.2.14/deno_dist/mod.ts";
import { overwriteReadonlyProp } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/lab/overwriteReadonlyProp.ts";
import { typeGuard } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/typeGuard.ts";
import { Deferred } from "../tools/Deferred.ts";
import { loosenType } from "./Evt.loosenType.ts";
import { safeClearTimeout, safeSetTimeout, Timer } from "../tools/safeSetTimeout.ts";
import { isPromiseLike } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/isPromiseLike.ts";
import { DetachedEvtError, TimeoutEvtError } from "./types/EvtError.ts";
import * as nsCtxLike from "./types/interfaces/CtxLike.ts";
import type { Handler, Operator, NonPostableEvt, StatefulEvt, EvtLike, CtxLike } from "./types/index.ts";
import { convertOperatorToStatelessFλ } from "./util/convertOperatorToStatelessFLambda.ts";

const runSideEffect = (sideEffect: () => void) => sideEffect();

// NOTE: For compat with --no-check 
// https://github.com/asos-craigmorten/opine/issues/97#issuecomment-751806014
const { CtxLike: CtxLikeAsValue } = nsCtxLike;

/** https://docs.evt.land/api/evt */
export type Evt<T> = import("./types/interfaces/Evt.ts").Evt<T>;


class EvtImpl<T> implements Evt<T> {

    static readonly create = create;

    static readonly newCtx = newCtx;

    static readonly merge = merge;

    static readonly from = from;

    static readonly getCtx = getCtxFactory();

    static readonly loosenType = loosenType;

    static readonly factorize = factorize;

    static readonly asPostable = asPostable;

    static readonly asyncPipe = asyncPipe;

    static readonly asNonPostable = asNonPostable;

    private static __defaultMaxHandlers = 25;

    static setDefaultMaxHandlers(n: number): void {
        this.__defaultMaxHandlers = isFinite(n) ? n : 0;
    }

    toStateful(p1: any, p2?: CtxLike): StatefulEvt<any> {

        const isP1Ctx = CtxLikeAsValue.match(p1);

        const initialValue: any = isP1Ctx ? undefined : p1;
        const ctx = p2 || (isP1Ctx ? p1 : undefined);

        const out = new importProxy.StatefulEvt<any>(initialValue);

        const callback = (data: T) => out.post(data);

        if (!!ctx) {
            this.attach(ctx, callback);
        } else {
            this.attach(callback);
        }

        return out;

    }

    get evtAttach(): Evt<Handler<T, any>> {
        return this.lazyEvtAttach.evt;
    }

    get evtDetach(): Evt<Handler<T, any>> {
        return this.lazyEvtDetach.evt;
    }

    private readonly lazyEvtAttach = new LazyEvt<Handler<T, any>>();
    private readonly lazyEvtDetach = new LazyEvt<Handler<T, any>>();


    private __maxHandlers: undefined | number = undefined;

    setMaxHandlers(n: number): this {
        this.__maxHandlers = isFinite(n) ? n : 0;
        return this;
    }

    readonly postCount: number = 0;

    private traceId: string | null = null;
    private traceFormatter!: (data: T) => string;
    private log!: Exclude<Parameters<NonPostableEvt<any>["enableTrace"]>[0]["log"], false>;

    enableTrace(
        params: {
            id: string,
            formatter?: (data: T) => string,
            log?: ((message?: any, ...optionalParams: any[]) => void) | false
        }
        //NOTE: Not typeof console.log as we don't want to expose types from node
    ): void {

        const { id, formatter, log } = params;

        this.traceId = id;

        this.traceFormatter = formatter || (
            data => {
                try {
                    return JSON.stringify(data, null, 2);
                } catch {
                    return `${data}`;
                }
            }
        );

        this.log =
            log === undefined ?
                ((...inputs) => console.log(...inputs)) :
                log === false ? undefined : log
            ;

    }

    disableTrace(): this {
        this.traceId = null;
        return this;
    }

    private readonly handlers: Handler<T, any>[] = [];

    private readonly handlerTriggers: LightMap<
        Handler<T, any>,
        (opResult: readonly [any]) => PromiseLike<void> | undefined
    > = new Map();


    //NOTE: An async handler ( attached with waitFor ) is only eligible to handle a post if the post
    //occurred after the handler was set. We don't want to waitFor event from the past.
    //private readonly asyncHandlerChronologyMark = new WeakMap<ImplicitParams.Async, number>();
    private get asyncHandlerChronologyMark(): WeakMap<
        Handler.PropsFromMethodName.Async,
        number
    > {
        return ((this as any)["~internal"] ??= {})["asyncHandlerChronologyMark"] ??= new WeakMap<any, any>();
    }

    //NOTE: There is an exception to the above rule, we want to allow async waitFor loop 
    //do so we have to handle the case where multiple event would be posted synchronously.
    private get asyncHandlerChronologyExceptionRange(): WeakMap<
        Handler.PropsFromMethodName.Async,
        { lowerMark: number; upperMark: number; }
    > {
        return ((this as any)["~internal"] ??= {})["asyncHandlerChronologyExceptionRange"] ??= new WeakMap<any, any>();
    }


    private get invocableOpByOp(): WeakMap<
        Operator<T, any>,
        Operator.fλ.Stateless<T, any>
    > {
        return ((this as any)["~internal"] ??= {})["invocableOpByOp"] ??= new WeakMap<any, any>();
    }

    getInvocableOp<U>(op: Operator<T, U>): Operator.fλ.Stateless<T, U> {

        const invocableOp = this.invocableOpByOp.get(op);

        if (invocableOp === undefined) {
            throw new Error([
                "Provided operator isn't the operator of any handler",
                "currently attached to the Evt instance"
            ].join(" "));
        }

        return invocableOp;

    }

    /*
    NOTE: Used as Date.now() would be used to compare if an event is anterior 
    or posterior to an other. We don't use Date.now() because two call within
    less than a ms will return the same value unlike this function.
    */
    private __currentChronologyMark = 0;
    private getChronologyMark() {
        return this.__currentChronologyMark++;
    }


    private asyncHandlerCount: number = 0;

    private detachHandler(
        handler: Handler<T, any>,
        wTimer: [Timer | undefined],
        rejectPr: (error: DetachedEvtError) => void
    ) {

        const index = this.handlers.indexOf(handler);

        if (index < 0) {
            return false;
        }

        if (typeGuard<Handler<T, any, CtxLike<any>>>(handler, !!handler.ctx)) {
            handler.ctx.zz__removeHandler(handler);
        }


        this.handlers.splice(index, 1);

        if (handler.async) {
            this.asyncHandlerCount--;
        }

        this.handlerTriggers.delete(handler);

        if (wTimer[0] !== undefined) {

            safeClearTimeout(wTimer[0]);

            rejectPr(new DetachedEvtError());

        }

        this.lazyEvtDetach.post(handler);

        return true;

    }


    private triggerHandler<U>(
        handler: Handler<T, U>,
        wTimer: [Timer | undefined],
        resolvePr: ((transformedData: any) => void) | undefined,
        opResult: readonly [U] //TODO: Or readonly [ any ] ?? 
    ): PromiseLike<void> | undefined {

        const { callback, once } = handler;

        if (wTimer[0] !== undefined) {
            safeClearTimeout(wTimer[0]);
            wTimer[0] = undefined;
        }

        if (once) {
            handler.detach();
        }

        const [transformedData] = opResult;

        const prOrValue = callback?.call(
            this,
            transformedData
        );

        resolvePr?.(transformedData);

        return isPromiseLike(prOrValue) ? prOrValue : undefined;

    }

    private addHandler<U>(
        propsFromArgs: Handler.PropsFromArgs<T, U>,
        propsFromMethodName: Handler.PropsFromMethodName
    ): Handler<T, U> {

        this.invocableOpByOp.set(
            propsFromArgs.op,
            convertOperatorToStatelessFλ(propsFromArgs.op)
        );

        const d = new Deferred<U>();

        const wTimer: [Timer | undefined] = [undefined];

        const handler: Handler<T, U> = {
            ...propsFromArgs,
            ...propsFromMethodName,
            "detach": () => this.detachHandler(handler, wTimer, d.reject),
            "promise": d.pr
        };

        if (typeof handler.timeout === "number") {

            wTimer[0] = safeSetTimeout(() => {

                wTimer[0] = undefined;

                handler.detach();

                d.reject(new TimeoutEvtError(handler.timeout!));

            }, handler.timeout);

        }

        const handlerTrigger: (opResult: readonly [U]) => PromiseLike<void> | undefined
            = opResult => this.triggerHandler(
                handler,
                wTimer,
                d.isPending ? d.resolve : undefined,
                opResult
            );

        this.handlerTriggers.set(
            handler,
            handlerTrigger
        );

        if (handler.async) {

            this.asyncHandlerChronologyMark.set(
                handler,
                this.getChronologyMark()
            );

        }

        if (handler.prepend) {

            let i: number;

            for (i = 0; i < this.handlers.length; i++) {

                if (this.handlers[i].extract) {
                    continue;
                }

                break;

            }

            this.handlers.splice(i, 0, handler);

        } else {

            this.handlers.push(handler);

        }

        if (handler.async) {
            this.asyncHandlerCount++;
        }

        this.checkForPotentialMemoryLeak();

        if (typeGuard<Handler<T, U, CtxLike<any>>>(handler, !!handler.ctx)) {
            handler.ctx.zz__addHandler(handler, this);
        }

        onAddHandlerByEvt.get(this)?.(handler, handlerTrigger);

        //NOTE: Can happen for example if this is a StatefulEvt 
        //and the handler is "once" and the matcher match the state 
        //We don't want to post an attach if the handler is already detached.
        if (this.handlerTriggers.has(handler)) {

            this.lazyEvtAttach.post(handler);

        }

        return handler;

    }



    private checkForPotentialMemoryLeak(): void {

        const maxHandlers = this.__maxHandlers !== undefined ?
            this.__maxHandlers :
            EvtImpl.__defaultMaxHandlers
            ;


        if (
            maxHandlers === 0 ||
            this.handlers.length % (maxHandlers + 1) !== 0) {
            return;
        }

        let message = [
            `MaxHandlersExceededWarning: Possible Evt memory leak detected.`,
            `${this.handlers.length} handlers attached${this.traceId ? ` to "${this.traceId}"` : ""}.\n`,
            `Use Evt.prototype.setMaxHandlers(n) to increase limit on a specific Evt.\n`,
            `Use Evt.setDefaultMaxHandlers(n) to change the default limit currently set to ${EvtImpl.__defaultMaxHandlers}.\n`,
        ].join("");

        const map = new Map<string, number>();

        this.getHandlers()
            .map(({ ctx, async, once, prepend, extract, op, callback }) => ({
                "hasCtx": !!ctx,
                once,
                prepend,
                extract,
                "isWaitFor": async,
                ...(op === matchAll ? {} : { "op": op.toString() }),
                ...(!callback ? {} : { "callback": callback.toString() })
            }))
            .map(obj =>
                "{\n" + Object.keys(obj)
                    .map(key => `  ${key}: ${(obj as any)[key]}`)
                    .join(",\n") + "\n}"
            )
            .forEach(str => map.set(str, (map.has(str) ? map.get(str)! : 0) + 1))
            ;

        message += "\n" + Array.from(map.keys())
            .map(str => `${map.get(str)} handler${map.get(str) === 1 ? "" : "s"} like:\n${str}`)
            .join("\n") + "\n";

        if (this.traceId === null) {

            message += "\n" + [
                `To validate the identify of the Evt instance that is triggering this warning you can call`,
                `Evt.prototype.enableTrace({ "id": "My evt id", "log": false }) on the Evt that you suspect.\n`
            ].join(" ");

        }

        try {
            console.warn(message);
        } catch {
        }

    }

    isHandledByOp<U>(op: Operator<T, U>, data: T): boolean {

        let hasSideEffect = false;

        let invocableOp: Operator.fλ.Stateless<T, U>;

        try {

            invocableOp = this.getInvocableOp(op);

        } catch {

            return false;

        }

        const opResult = invocableOp(
            data,
            () => hasSideEffect = true
        );

        return opResult !== null || hasSideEffect;

    }


    private trace(data: T) {

        if (this.traceId === null) {
            return;
        }

        let message = `(${this.traceId}) `;

        const isExtracted = !!this.handlers.find(
            ({ extract, op }) => (
                extract &&
                this.isHandledByOp(op, data)
            )
        );

        if (isExtracted) {

            message += "extracted ";

        } else {

            const handlerCount = this.handlers
                .filter(
                    ({ extract, op }) => !extract &&
                        this.isHandledByOp(op, data)
                )
                .length;

            message += `${handlerCount} handler${(handlerCount > 1) ? "s" : ""}, `;

        }

        this.log?.(message + this.traceFormatter(data));

    }

    /** Return [ isExtracted, prAllHandlerCallbacksResolved ] */
    private postSync(data: T): readonly [boolean, Promise<void>] {

        const prAllHandlerCallbacksResolved: PromiseLike<void>[] = [];

        const getReturnValue = (isExtracted: boolean) => [
            isExtracted,
            Promise.all(prAllHandlerCallbacksResolved).then(() => { })
        ] as const;


        for (const handler of [...this.handlers]) {

            const { async, op, extract } = handler;

            if (async) {
                continue;
            }

            //NOTE: If detached while executing the operator
            //we still want to trigger the handler.
            const handlerTrigger = this.handlerTriggers.get(handler);

            const opResult = this.getInvocableOp(op)(
                data,
                runSideEffect
            );

            if (opResult === null) {
                continue;
            }

            //NOTE: Possible if detached while in the loop.
            if (!handlerTrigger) {
                continue;
            }

            const prOrUndefined = handlerTrigger(opResult);

            if (prOrUndefined !== undefined) {
                prAllHandlerCallbacksResolved.push(prOrUndefined);
            }

            if (extract) {
                return getReturnValue(true);
            }

        }

        return getReturnValue(false);

    }

    private postAsyncFactory() {
        return runExclusive.buildMethodCb(
            (data: T, postChronologyMark: number, releaseLock?) => {

                if (this.asyncHandlerCount === 0) {
                    releaseLock();
                    return;
                }

                const promises: Promise<void>[] = [];

                let chronologyMarkStartResolveTick: number;

                //NOTE: Must be before handlerTrigger call.
                Promise.resolve().then(
                    () => chronologyMarkStartResolveTick = this.getChronologyMark()
                );


                for (const handler of [...this.handlers]) {

                    if (!handler.async) {
                        continue;
                    }

                    const opResult = this.getInvocableOp(handler.op)(
                        data,
                        runSideEffect
                    );

                    if (opResult === null) {
                        continue;
                    }

                    const handlerTrigger = this.handlerTriggers.get(handler);

                    if (!handlerTrigger) {
                        continue;
                    }

                    const shouldCallHandlerTrigger = (() => {

                        const handlerMark = this.asyncHandlerChronologyMark.get(handler)!;

                        if (postChronologyMark > handlerMark) {
                            return true;
                        }

                        const exceptionRange = this.asyncHandlerChronologyExceptionRange.get(handler);

                        return (
                            exceptionRange !== undefined &&
                            exceptionRange.lowerMark < postChronologyMark &&
                            postChronologyMark < exceptionRange.upperMark &&
                            handlerMark > exceptionRange.upperMark
                        );

                    })();

                    if (!shouldCallHandlerTrigger) {
                        continue;
                    }

                    promises.push(
                        new Promise<void>(
                            resolve => handler.promise
                                .then(() => resolve())
                                .catch(() => resolve())
                        )
                    );

                    handlerTrigger(opResult);


                }

                if (promises.length === 0) {
                    releaseLock();
                    return;
                }

                const handlersDump = [...this.handlers];

                Promise.all(promises).then(() => {

                    for (const handler of this.handlers) {

                        if (!handler.async) {
                            continue;
                        }

                        if (handlersDump.indexOf(handler) >= 0) {
                            continue;
                        }

                        this.asyncHandlerChronologyExceptionRange.set(
                            handler,
                            {
                                "lowerMark": postChronologyMark,
                                "upperMark": chronologyMarkStartResolveTick
                            }
                        );

                    }

                    releaseLock();

                });

            }
        );
    }

    declare private postAsync: (
        (
            data: T,
            postChronologyMark: number
        ) => void
    ) | undefined;

    private static readonly propsFormMethodNames: Record<
        "waitFor" | "attach" | "attachExtract" | "attachPrepend" | "attachOnce" |
        "attachOncePrepend" | "attachOnceExtract"
        ,
        Handler.PropsFromMethodName
    > = {
            "waitFor": { "async": true, "extract": false, "once": true, "prepend": false },
            "attach": { "async": false, "extract": false, "once": false, "prepend": false },
            "attachExtract": { "async": false, "extract": true, "once": false, "prepend": true },
            "attachPrepend": { "async": false, "extract": false, "once": false, "prepend": true },
            "attachOnce": { "async": false, "extract": false, "once": true, "prepend": false },
            "attachOncePrepend": { "async": false, "extract": false, "once": true, "prepend": true },
            "attachOnceExtract": { "async": false, "extract": true, "once": true, "prepend": true }
        };

    isHandled(data: T): boolean {
        return !!this.getHandlers()
            .find(({ op }) => this.isHandledByOp(op, data))
            ;
    }

    getHandlers(): Handler<T, any>[] {
        return [...this.handlers];
    }

    detach(ctx?: CtxLike<any>): Handler<T, any, any>[] {

        const detachedHandlers: Handler<T, any>[] = [];

        for (const handler of this.getHandlers()) {

            if (ctx !== undefined && handler.ctx !== ctx) {
                continue;
            }

            const wasStillAttached = handler.detach();

            //NOTE: It should not be possible.
            if (!wasStillAttached) {
                continue;
            }

            detachedHandlers.push(handler);

        }

        return detachedHandlers;

    }

    pipe(...args: any[]): Evt<any> {

        const evtDelegate = new EvtImpl<any>();

        this.addHandler(
            {
                ...parsePropsFromArgs<T>(args, "pipe"),
                "callback": (transformedData: any) => evtDelegate.post(transformedData)
            },
            EvtImpl.propsFormMethodNames.attach
        );

        return evtDelegate;

    }

    waitFor(...args: any[]): Promise<any> {
        return this.addHandler(
            parsePropsFromArgs<T>(args, "waitFor"),
            EvtImpl.propsFormMethodNames.waitFor
        ).promise;
    }

    $attach(...args: any[]) {
        return this.attach(...args);
    }

    attach(...args: any[]) {
        return this.__attachX(args, "attach");
    }

    $attachOnce(...args: any[]) {
        return this.attachOnce(...args);
    }

    attachOnce(...args: any[]) {
        return this.__attachX(args, "attachOnce");
    }

    $attachExtract(...args: any[]) {
        return this.attachExtract(...args);
    }

    attachExtract(...args: any[]) {
        return this.__attachX(args, "attachExtract");
    }

    $attachPrepend(...args: any[]) {
        return (this.attachPrepend as any)(...args);
    }

    attachPrepend(...args: any[]) {
        return this.__attachX(args, "attachPrepend");
    }

    $attachOncePrepend(...args: any[]) {
        return this.attachOncePrepend(...args);
    }

    attachOncePrepend(...args: any[]) {
        return this.__attachX(args, "attachOncePrepend");
    }

    $attachOnceExtract(...args: any[]) {
        return this.attachOnceExtract(...args);
    }

    attachOnceExtract(...args: any[]) {
        return this.__attachX(args, "attachOnceExtract");
    }

    private __attachX(
        args: any[],
        methodName: keyof typeof EvtImpl.propsFormMethodNames
    ): any {

        const propsFromArgs = parsePropsFromArgs<T>(args, "attach*");

        const handler = this.addHandler(
            propsFromArgs,
            EvtImpl.propsFormMethodNames[methodName]
        );

        return propsFromArgs.timeout === undefined ?
            this :
            handler.promise
            ;

    }

    postAsyncOnceHandled(data: T): number | Promise<number> {

        if (this.isHandled(data)) {
            return this.post(data);
        }

        const d = new Deferred<number>();

        this.evtAttach.attachOnce(
            ({ op }) => this.isHandledByOp(op, data),
            () => Promise.resolve().then(() => d.resolve(this.post(data)))
        );

        return d.pr;

    }

    private postOrPostAndWait(data: T, wait: false): number;
    private postOrPostAndWait(data: T, wait: true): Promise<void>;
    private postOrPostAndWait(data: T, wait: boolean): number | Promise<void> {

        this.trace(data);

        overwriteReadonlyProp(this, "postCount", this.postCount + 1);

        //NOTE: Must be before postSync.
        const postChronologyMark = this.getChronologyMark();

        const [isExtracted, prAllHandlerCallbacksResolved] = this.postSync(data);

        const getReturnValue = wait ?
            () => prAllHandlerCallbacksResolved :
            () => this.postCount;

        if (isExtracted) {
            return getReturnValue();
        }

        if (this.postAsync === undefined) {

            if (this.asyncHandlerCount === 0) {
                return getReturnValue();
            }

            this.postAsync = this.postAsyncFactory();

        }

        this.postAsync(data, postChronologyMark);

        return getReturnValue();

    }

    post(data: T) {
        return this.postOrPostAndWait(data, false);
    }

    postAndWait(data: T) {
        return this.postOrPostAndWait(data, true);
    }

}

/** 
 * Can be seen as a protected method that can be 
 * optionally be implemented by class extending Evt.
 * 
 * Should only be accessible from within the module.
 * Basically it is for allowing StatefulEvt to execute
 * the callback on attach.
 */
export const onAddHandlerByEvt = new WeakMap<
    EvtLike<any>,
    (
        handler: Handler<any, any>,
        handlerTrigger: (opResult: readonly [any]) => PromiseLike<void> | undefined
    ) => void>();


export const Evt: {
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

} = EvtImpl;

try { overwriteReadonlyProp(Evt as any, "name", "Evt"); } catch { }

importProxy.Evt = Evt;

