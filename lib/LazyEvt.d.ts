import type { Evt } from "./types";
export declare class LazyEvt<T> {
    private initialPostCount;
    get evt(): Evt<T>;
    private __evt;
    private __post;
    post(data: T): number;
    postAndWait(data: T): Promise<void>;
}
