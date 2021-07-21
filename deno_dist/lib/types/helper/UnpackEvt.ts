

import type { EvtLike } from "./EvtLike.ts";

type UnpackEvtBase<T extends EvtLike<any>> = T extends EvtLike<infer U> ? U : never;

type UnpackEvtRecord<T extends { [key: string]: any; }> = {
    [P in keyof T]: T[P] extends EvtLike<any> ? UnpackEvtBase<T[P]> : T[P];
};

/** https://docs.evt.land/api/helpertypes#unpackevt-less-than-e-greater-than */
export type UnpackEvt<T extends ({ [key: string]: any; } | EvtLike<any>)> =
    T extends EvtLike<any> ? UnpackEvtBase<T> :
    UnpackEvtRecord<T>
    ;
