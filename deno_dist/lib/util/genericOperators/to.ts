import type { Operator } from "../../types/index.ts";
/*
NOTE: Here we allow a tiny memory leak to be able to emulate
the EventEmitter.removeListener(event, callback) method easily.

evt.getHandlers()
    .filter(handler => (
        handler.callback === callback && 
        handler.op === to("event1")
    ))
    .forEach(handler => handler.detach());
*/
const map = new Map<string, ReturnType<typeof to>>();

/** 
 * Operator that helps emulate an EventEmitter with EVT
 * See https://stackblitz.com/edit/evt-honvv3?file=index.ts 
 * or https://docs.evt.land/extending_evt
 * */
export const to = <T extends readonly [string, any], K extends T[0]>(
    eventName: K
): Operator.fλ.Stateless<T, (Extract<T, readonly [K, any]> extends never ? T : Extract<T, readonly [K, any]>)[1]> =>
    map.get(eventName) ?? (
        map.set(
            eventName,
            data => data[0] !== eventName ? null : [data[1]]
        ),
        to(eventName)
    )
    ;
