import type { StatefulEvt } from "./types";
export declare class LazyStatefulEvt<T> {
    private initialPostCount;
    private initialState;
    get evt(): StatefulEvt<T>;
    private __evt;
    constructor(initialState: T);
    private __post;
    post(data: T): number;
    postAndWait(data: T): Promise<void>;
}
