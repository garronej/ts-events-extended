import type { EvtLike } from "./EvtLike";
import type { SwapEvtType } from "./SwapEvtType";
import type { UnpackEvt } from "./UnpackEvt";
/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export declare type FactorizeEvt<E extends EvtLike<any>> = SwapEvtType<E, UnpackEvt<E>>;
