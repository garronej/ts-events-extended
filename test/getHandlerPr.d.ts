declare type NonPostableEvt<T> = import("../lib").NonPostableEvt<T>;
/** For tests that used the legacy attach returned Promise */
export declare function getHandlerPr(evt: NonPostableEvt<any>, run: () => void): Promise<any>;
export {};
