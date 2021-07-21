export declare type EventTargetLike<T> = EventTargetLike.HasEventTargetAddRemove<T> | EventTargetLike.NodeStyleEventEmitter | EventTargetLike.JQueryStyleEventEmitter | EventTargetLike.RxJSSubject<T>;
export declare namespace EventTargetLike {
    type HTMLElement = HasEventTargetAddRemove<any> & {
        innerText: string;
    };
    type Window = HasEventTargetAddRemove<any> & {
        document: EventTargetLike.Document;
    };
    type Document = HasEventTargetAddRemove<any> & {
        URL: string;
    };
    type RxJSSubject<T> = {
        subscribe: (next: (data: T) => void) => RxJSSubject.Subscription;
    };
    namespace RxJSSubject {
        type Subscription = {
            unsubscribe(): void;
        };
        function match<T>(eventTarget: EventTargetLike<T>): eventTarget is RxJSSubject<T>;
    }
    type NodeStyleEventEmitter = NodeStyleEventEmitter.Compat | NodeStyleEventEmitter.Regular;
    namespace NodeStyleEventEmitter {
        interface Regular {
            addListener: (eventName: string | symbol, handler: NodeEventHandler) => this;
            removeListener: (eventName: string | symbol, handler: NodeEventHandler) => this;
        }
        interface Compat {
            addListener: (eventName: string, handler: NodeEventHandler) => void | {};
            removeListener: (eventName: string, handler: NodeEventHandler) => void | {};
        }
        type NodeEventHandler = (...args: any[]) => void;
        function match<T>(eventTarget: EventTargetLike<T>): eventTarget is NodeStyleEventEmitter;
    }
    interface JQueryStyleEventEmitter {
        on: (eventName: string, handler: Function) => void;
        off: (eventName: string, handler: Function) => void;
    }
    namespace JQueryStyleEventEmitter {
        function match<T>(eventTarget: EventTargetLike<T>): eventTarget is JQueryStyleEventEmitter;
    }
    interface HasEventTargetAddRemove<E> {
        addEventListener(type: string, listener: ((evt: E) => void) | null, options?: boolean | HasEventTargetAddRemove.Options): void;
        removeEventListener(type: string, listener?: ((evt: E) => void) | null, options?: HasEventTargetAddRemove.Options | boolean): void;
    }
    namespace HasEventTargetAddRemove {
        interface Options {
            capture?: boolean;
            passive?: boolean;
            once?: boolean;
        }
        function match<T>(eventTarget: EventTargetLike<T>): eventTarget is HasEventTargetAddRemove<T>;
    }
    function canBe(o: any): boolean;
}
