
type EvtLike<T> = import("./UnpackEvt").EvtLike<T>;
type Postable<T> = import("../interfaces").Postable<T>;

//NOTE: Omit only introduced in 3.5
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type NonPostableEvt<T> = import("../interfaces").NonPostableEvt<T>;
type StatefulNonPostableEvt<T> = import("../interfaces").StatefulNonPostableEvt<T>;

type ToNonPostableEvtBase<T extends EvtLike<any>> =
    T extends StatefulNonPostableEvt<infer U> ? StatefulNonPostableEvt<U> :
    T extends NonPostableEvt<infer U> ? NonPostableEvt<U> :
    Omit<T, keyof Postable<any>>
    ;

type ToNonPostableEvtRecord<T extends { [key: string]: any; }> = {
    [P in keyof T]: T[P] extends EvtLike<any> ? ToNonPostableEvtBase<T[P]> : T[P];
};

export type ToNonPostableEvt<T extends ({ [key: string]: any; } | EvtLike<any>)> =
    T extends EvtLike<any> ? ToNonPostableEvtBase<T> :
    ToNonPostableEvtRecord<T>
    ;

