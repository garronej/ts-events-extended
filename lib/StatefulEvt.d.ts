import "minimal-polyfills/Object.is";
/** https://docs.evt.land/api/statefulevt */
export declare type StatefulEvt<T> = import("./types/interfaces").StatefulEvt<T>;
export declare const StatefulEvt: {
    new <T>(initialState: T): StatefulEvt<T>;
    readonly prototype: StatefulEvt<any>;
};
