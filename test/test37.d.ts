declare type Resolve<T> = (value: T) => void;
export declare class Deferred<T> {
    readonly pr: Promise<T>;
    /** NOTE: Does not need to be called bound to instance*/
    readonly resolve: Resolve<T>;
    constructor();
    _hasResolved: boolean;
}
export {};
