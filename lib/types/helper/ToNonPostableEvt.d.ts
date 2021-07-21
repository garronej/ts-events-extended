import type { EvtLike } from "./EvtLike";
import type { StatefulPostable, NonPostableEvt, StatefulReadonlyEvt } from "../interfaces";
declare type ToNonPostableEvtBase<E extends EvtLike<any>> = E extends StatefulReadonlyEvt<infer U> ? StatefulReadonlyEvt<U> : E extends NonPostableEvt<infer U> ? NonPostableEvt<U> : Omit<E, Exclude<keyof StatefulPostable<any>, "state">>;
declare type ToNonPostableEvtRecord<R extends {
    [key: string]: any;
}> = {
    [P in keyof R]: R[P] extends EvtLike<any> ? ToNonPostableEvtBase<R[P]> : R[P];
};
/** https://docs.evt.land/api/helpertypes#tononpostableevt-less-than-e-greater-than */
export declare type ToNonPostableEvt<E extends ({
    [key: string]: any;
} | EvtLike<any>)> = E extends EvtLike<any> ? ToNonPostableEvtBase<E> : ToNonPostableEvtRecord<E>;
export {};
