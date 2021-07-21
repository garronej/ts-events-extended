import type { Operator } from "../../types";
/**
 * Operator that helps emulate an EventEmitter with EVT
 * See https://stackblitz.com/edit/evt-honvv3?file=index.ts
 * or https://docs.evt.land/extending_evt
 * */
export declare const to: <T extends readonly [string, any], K extends T[0]>(eventName: K) => Operator.fλ.Stateless<T, (Extract<T, readonly [K, any]> extends never ? T : Extract<T, readonly [K, any]>)[1]>;
