import type { Evt, StatefulEvt } from "./types";
/**
 * https://docs.evt.land/api/evt/create
 * Return a new Evt<T> instance.
 */
export declare function create<T = void>(): Evt<T>;
/**
 * https://docs.evt.land/api/evt/create
 * Return a new StatefulEvt<T> instance.
 */
export declare function create<T>(initialState: T): StatefulEvt<T>;
