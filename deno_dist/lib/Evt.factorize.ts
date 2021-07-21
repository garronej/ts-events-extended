import type { FactorizeEvt, EvtLike } from "./types/helper/index.ts";

/** https://docs.evt.land/api/evt/factorize */
export function factorize<E extends EvtLike<any>>(
    evt: E
): FactorizeEvt<E> {
    return evt as any;
}

/*
import { Evt } from "./Evt.ts";
const x: Evt<boolean> = loosenType(new Evt<true>()); x;
const y: Evt<boolean> = loosenType(new Evt<number>()); y;
*/