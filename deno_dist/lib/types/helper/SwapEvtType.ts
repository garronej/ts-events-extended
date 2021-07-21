import type { StatefulEvt, StatefulReadonlyEvt, Evt, NonPostableEvt } from "../interfaces/index.ts";
import type { EvtLike } from "./EvtLike.ts";


/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type SwapEvtType<E extends EvtLike<any>, T> =
        E extends StatefulEvt<any> ? StatefulEvt<T> :
        E extends StatefulReadonlyEvt<any> ? StatefulReadonlyEvt<T> :
        E extends Evt<any> ? Evt<T> :
        E extends NonPostableEvt<any> ? NonPostableEvt<T> :
        EvtLike<T>
    ;
