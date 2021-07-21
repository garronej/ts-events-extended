
import { typeGuard } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/typeGuard.ts";

export type EventTargetLike<T> =
    EventTargetLike.HasEventTargetAddRemove<T> |
    EventTargetLike.NodeStyleEventEmitter |
    EventTargetLike.JQueryStyleEventEmitter |
    EventTargetLike.RxJSSubject<T>
    ;

export namespace EventTargetLike {

    export type HTMLElement = HasEventTargetAddRemove<any> & {
        innerText: string;
    };

    export type Window = HasEventTargetAddRemove<any> & {
        document: EventTargetLike.Document;
    };

    export type Document = HasEventTargetAddRemove<any> & {
        URL: string;
    };

    export type RxJSSubject<T> = {
        subscribe: (next: (data: T) => void) => RxJSSubject.Subscription;
    };

    export namespace RxJSSubject {

        export type Subscription = {
            unsubscribe(): void;
        };

        export function match<T>(eventTarget: EventTargetLike<T>): eventTarget is RxJSSubject<T> {
            return (
                typeGuard<RxJSSubject<T>>(eventTarget, true) &&
                eventTarget instanceof Object &&
                typeof eventTarget.subscribe === "function"
            );
        }


    }


    export type NodeStyleEventEmitter =
        NodeStyleEventEmitter.Compat |
        NodeStyleEventEmitter.Regular
        ;

    export namespace NodeStyleEventEmitter {

        export interface Regular {
            addListener: (eventName: string | symbol, handler: NodeEventHandler) => this;
            removeListener: (eventName: string | symbol, handler: NodeEventHandler) => this;
        };

        export interface Compat {
            addListener: (eventName: string, handler: NodeEventHandler) => void | {};
            removeListener: (eventName: string, handler: NodeEventHandler) => void | {};
        }

        export declare type NodeEventHandler = (...args: any[]) => void;

        export function match<T>(eventTarget: EventTargetLike<T>): eventTarget is NodeStyleEventEmitter {
            return (
                typeGuard<NodeStyleEventEmitter>(eventTarget, true) &&
                eventTarget instanceof Object &&
                typeof eventTarget.addListener === "function" &&
                typeof eventTarget.removeListener === "function"
            );
        }

    }

    export interface JQueryStyleEventEmitter {
        on: (eventName: string, handler: Function) => void;
        off: (eventName: string, handler: Function) => void;
    }

    export namespace JQueryStyleEventEmitter {

        export function match<T>(eventTarget: EventTargetLike<T>): eventTarget is JQueryStyleEventEmitter {
            return (
                typeGuard<JQueryStyleEventEmitter>(eventTarget, true) &&
                eventTarget instanceof Object &&
                typeof eventTarget.on === "function" &&
                typeof eventTarget.off === "function"
            );
        }

    }

    export interface HasEventTargetAddRemove<E> {
        addEventListener(type: string, listener: ((evt: E) => void) | null, options?: boolean | HasEventTargetAddRemove.Options): void;
        removeEventListener(type: string, listener?: ((evt: E) => void) | null, options?: HasEventTargetAddRemove.Options | boolean): void;
    }

    export namespace HasEventTargetAddRemove {

        export interface Options {
            capture?: boolean;
            passive?: boolean;
            once?: boolean;
        }

        export function match<T>(eventTarget: EventTargetLike<T>): eventTarget is HasEventTargetAddRemove<T> {
            return (
                typeGuard<HasEventTargetAddRemove<T>>(eventTarget, true) &&
                eventTarget instanceof Object &&
                typeof eventTarget.addEventListener === "function" &&
                typeof eventTarget.removeEventListener === "function"
            );
        }

    }


    /* Return true if o can be a EventTargetLike */
    export function canBe(o: any): boolean {

        try{

            return (
                HasEventTargetAddRemove.match(o) ||
                NodeStyleEventEmitter.match(o) ||
                JQueryStyleEventEmitter.match(o) ||
                RxJSSubject.match(o)
            );

        }catch{

            return false;

        }

    }


}
