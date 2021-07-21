import { id } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/id.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";;
import { typeGuard } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/typeGuard.ts";
import { mergeImpl } from "./Evt.merge.ts";
import { importProxy } from "./importProxy.ts";
import type { dom, Evt, EvtLike } from "./types/index.ts";
import type { EventTargetLike } from "./types/index.ts";
import * as nsEventTargetLike from "./types/EventTargetLike.ts";
const { EventTargetLike: EventTargetLikeAsValue } = nsEventTargetLike;
import type { ObserverConstructor } from "./types/Observer.ts";

type OneOrMany<T> = T | ArrayLike<T>;
type CtxLike<Result> = import("./types/index.ts").CtxLike<Result> & {
    evtDoneOrAborted: EvtLike<unknown> & { postCount: number; attachOnce(callback: () => void): void; };
};

function fromImplForTargetEventLike<T>(
    ctx: CtxLike<any> | undefined,
    target: OneOrMany<EventTargetLike<T>> | PromiseLike<T>,
    eventName?: string,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T> {

    const matchEventTargetLike =
        (target_: typeof target): target_ is EventTargetLike<T> =>
            EventTargetLikeAsValue.canBe(target_);

    if (!matchEventTargetLike(target)) {

        if ("then" in target) {

            const evt = new importProxy.Evt<T>();

            const isCtxDone = (() => {

                const getEvtDonePostCount = () => ctx?.evtDoneOrAborted.postCount;

                const n = getEvtDonePostCount();

                return () => n !== getEvtDonePostCount();

            })();

            target.then(data => {

                if (isCtxDone()) {
                    return;
                }

                evt.post(data);

            });

            return evt;

        }

        return mergeImpl<Evt<T>>(
            ctx,
            Array.from(target).map(
                target => fromImplForTargetEventLike<T>(ctx, target, eventName, options)
            )
        );

    }

    type ProxyMethod<T> = (
        listener: (data: T) => void,
        eventName: string,
        options?: EventTargetLike.HasEventTargetAddRemove.Options
    ) => void;

    let proxy: {
        on: ProxyMethod<T>;
        off: ProxyMethod<T>;
    };

    if (EventTargetLikeAsValue.NodeStyleEventEmitter.match(target)) {
        proxy = {
            "on": (listener, eventName) => target.addListener(eventName, listener),
            "off": (listener, eventName) => target.removeListener(eventName, listener)
        };
    } else if (EventTargetLikeAsValue.JQueryStyleEventEmitter.match(target)) {
        proxy = {
            "on": (listener, eventName) => target.on(eventName, listener),
            "off": (listener, eventName) => target.off(eventName, listener)
        };
    } else if (EventTargetLikeAsValue.HasEventTargetAddRemove.match(target)) {
        proxy = {
            "on": (listener, eventName, options) => target.addEventListener(eventName, listener, options),
            "off": (listener, eventName, options) => target.removeEventListener(eventName, listener, options)
        };
    } else if (EventTargetLikeAsValue.RxJSSubject.match(target)) {

        let subscription: EventTargetLike.RxJSSubject.Subscription;

        proxy = {
            "on": listener => subscription = target.subscribe(data => listener(data)),
            "off": () => subscription.unsubscribe()
        };

    } else {

        id<never>(target);
        assert(false);

    }

    const evt = new importProxy.Evt<T>();

    const listener = (data: T) => evt.post(data);

    ctx?.evtDoneOrAborted.attachOnce(
        () => proxy.off(
            listener,
            eventName!,
            options
        )
    );

    proxy.on(listener, eventName!, options);

    return evt;

}

function fromImplForObserver<Target, Entry>(
    ctx: CtxLike<any> | undefined,
    ObserverConstructor: ObserverConstructor<Target, Entry>,
    target: Target
): Evt<Entry> {

    const evt = importProxy.Evt.create<Entry>();

    const listener = ([entry]: Entry[]) => evt.post(entry);

    const observer = new ObserverConstructor(listener);

    observer.observe(target);

    ctx?.evtDoneOrAborted.attachOnce(
        () => observer.disconnect()
    );

    return evt;

}

/** https://docs.evt.land/api/evt/from */
export function from<K extends keyof dom.HTMLElementEventMap>(
    ctx: CtxLike<any>,
    target: EventTargetLike.HTMLElement,
    eventName: K,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.HTMLElementEventMap[K]>;

export function from<K extends keyof dom.WindowEventMap>(
    ctx: CtxLike<any>,
    target: EventTargetLike.Window,
    eventName: K,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.WindowEventMap[K]>;

export function from<K extends keyof dom.DocumentEventMap>(
    ctx: CtxLike<any>,
    target: EventTargetLike.Document,
    eventName: K,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.DocumentEventMap[K]>;

export function from<T>(
    ctx: CtxLike<any>,
    target: OneOrMany<
        EventTargetLike.NodeStyleEventEmitter |
        EventTargetLike.JQueryStyleEventEmitter
    >,
    eventName: string
): Evt<T>;
export function from<T>(
    ctx: CtxLike<any>,
    target: OneOrMany<
        EventTargetLike.HasEventTargetAddRemove<T>
    >,
    eventName: string,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T>;
export function from<T>(
    ctx: CtxLike<any>,
    target: OneOrMany<EventTargetLike.RxJSSubject<T>>
): Evt<T>;

export function from<T>(
    ctx: CtxLike<any>,
    target: PromiseLike<T>
): Evt<T>;

export function from<Target, Entry>(
    ctx: CtxLike<any>,
    ObserverConstructor: ObserverConstructor<Target, Entry>,
    target: Target
): Evt<Entry>;


export function from<K extends keyof dom.HTMLElementEventMap>(
    target: EventTargetLike.HTMLElement,
    eventName: K,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.HTMLElementEventMap[K]>;
export function from<K extends keyof dom.WindowEventMap>(
    target: EventTargetLike.Window,
    eventName: K,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.WindowEventMap[K]>;
export function from<K extends keyof dom.DocumentEventMap>(
    target: EventTargetLike.Document,
    eventName: K,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.DocumentEventMap[K]>;
export function from<T>(
    target: OneOrMany<
        EventTargetLike.NodeStyleEventEmitter |
        EventTargetLike.JQueryStyleEventEmitter
    >,
    eventName: string
): Evt<T>;
export function from<T>(
    target: OneOrMany<
        EventTargetLike.HasEventTargetAddRemove<T>
    >,
    eventName: string,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T>;
export function from<T>(
    target: OneOrMany<EventTargetLike.RxJSSubject<T>>
): Evt<T>;
export function from<T>(
    target: PromiseLike<T>
): Evt<T>;

export function from<Target, Entry>(
    ObserverConstructor: ObserverConstructor<Target, Entry>,
    target: Target
): Evt<Entry>;
/*
/^[A-Z]/.test(targetOrEventNameOrObserverConstructorOrObserverTarget.name
    */

export function from<T, ObserverTarget = never>(
    ctxOrTargetOrObserverConstructor: CtxLike<any> | OneOrMany<EventTargetLike<T>> | PromiseLike<T> | ObserverConstructor<ObserverTarget, T>,
    targetOrEventNameOrObserverConstructorOrObserverTarget?: OneOrMany<EventTargetLike<T>> | string | PromiseLike<T> | ObserverConstructor<ObserverTarget, T> | ObserverTarget,
    eventNameOrOptionsOrObserverTarget?: string | EventTargetLike.HasEventTargetAddRemove.Options | ObserverTarget,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T> {

    if ("evtDoneOrAborted" in ctxOrTargetOrObserverConstructor) {

        assert(
            typeGuard<OneOrMany<EventTargetLike<T>> | PromiseLike<T> | ObserverConstructor<ObserverTarget, T>>(targetOrEventNameOrObserverConstructorOrObserverTarget, true) &&
            typeGuard<string | undefined | ObserverTarget>(eventNameOrOptionsOrObserverTarget, true) &&
            typeGuard<EventTargetLike.HasEventTargetAddRemove.Options | undefined>(options, true)
        );

        if (typeof targetOrEventNameOrObserverConstructorOrObserverTarget === "function") {

            assert(
                typeGuard<ObserverTarget>(eventNameOrOptionsOrObserverTarget, true) &&
                typeGuard<undefined>(options, true)
            );

            return fromImplForObserver(
                ctxOrTargetOrObserverConstructor,
                targetOrEventNameOrObserverConstructorOrObserverTarget,
                eventNameOrOptionsOrObserverTarget
            );

        } else {

            assert(
                typeGuard<Exclude<typeof eventNameOrOptionsOrObserverTarget, ObserverTarget>>(eventNameOrOptionsOrObserverTarget, true)
            );

            return fromImplForTargetEventLike(
                ctxOrTargetOrObserverConstructor,
                targetOrEventNameOrObserverConstructorOrObserverTarget,
                eventNameOrOptionsOrObserverTarget,
                options
            );

        }


    } else {

        assert(
            typeGuard<Exclude<typeof ctxOrTargetOrObserverConstructor, CtxLike<any>>>(ctxOrTargetOrObserverConstructor, true) &&
            typeGuard<string | undefined | ObserverTarget>(targetOrEventNameOrObserverConstructorOrObserverTarget, true) &&
            typeGuard<EventTargetLike.HasEventTargetAddRemove.Options | undefined>(eventNameOrOptionsOrObserverTarget, true)
        );

        if (typeof ctxOrTargetOrObserverConstructor === "function") {

            assert(
                typeGuard<ObserverTarget>(targetOrEventNameOrObserverConstructorOrObserverTarget, true) &&
                typeGuard<undefined>(eventNameOrOptionsOrObserverTarget, true)
            );

            return fromImplForObserver(
                undefined,
                ctxOrTargetOrObserverConstructor,
                targetOrEventNameOrObserverConstructorOrObserverTarget
            );


        } else {

            assert(
                typeGuard<Exclude<typeof targetOrEventNameOrObserverConstructorOrObserverTarget, ObserverTarget>>(
                    targetOrEventNameOrObserverConstructorOrObserverTarget, true
                )
            );

            return fromImplForTargetEventLike(
                undefined,
                ctxOrTargetOrObserverConstructor,
                targetOrEventNameOrObserverConstructorOrObserverTarget,
                eventNameOrOptionsOrObserverTarget
            );

        }



    }

}
