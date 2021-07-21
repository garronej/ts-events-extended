
import type { EvtLike } from "./EvtLike.ts";
import type { SwapEvtType } from "./SwapEvtType.ts";
import type { UnpackEvt } from "./UnpackEvt.ts";

/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type FactorizeEvt<E extends EvtLike<any>> = SwapEvtType<E, UnpackEvt<E>>;

