import type { FactorizeEvt, EvtLike } from "./types/helper";
/** https://docs.evt.land/api/evt/factorize */
export declare function factorize<E extends EvtLike<any>>(evt: E): FactorizeEvt<E>;
