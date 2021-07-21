import type { StatefulEvt, StatefulReadonlyEvt, Evt, NonPostableEvt } from "../interfaces";
import type { EvtLike } from "./EvtLike";
/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export declare type SwapEvtType<E extends EvtLike<any>, T> = E extends StatefulEvt<any> ? StatefulEvt<T> : E extends StatefulReadonlyEvt<any> ? StatefulReadonlyEvt<T> : E extends Evt<any> ? Evt<T> : E extends NonPostableEvt<any> ? NonPostableEvt<T> : EvtLike<T>;
