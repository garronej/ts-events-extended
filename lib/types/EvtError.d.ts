export declare class TimeoutEvtError extends Error {
    readonly timeout: number;
    constructor(timeout: number);
}
export declare class DetachedEvtError extends Error {
    constructor();
}
