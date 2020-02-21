import { Evt } from "./Evt";
import { NonPostable } from "./helperTypes/NonPostable";
declare type ChangeDiff<T> = {
    newValue: T;
    previousValue: T;
};
/**
 * https://garronej.github.io/ts-evt/#observert-documentation
 * The interface that should be exposed to users that should
 * have read only access on the observable */
export interface Observable<T> {
    readonly value: T;
    /** when value changed post the new value and the value it previously replaced */
    readonly evtChangeDiff: NonPostable<Evt<ChangeDiff<T>>>;
    /** when value changed post the new value */
    readonly evtChange: NonPostable<Evt<T>>;
}
/** https://garronej.github.io/ts-evt/#observert-documentation */
export declare class ObservableImpl<T> implements Observable<T> {
    private readonly areSame;
    private readonly evtChangeDiff_post;
    readonly evtChangeDiff: Observable<T>["evtChangeDiff"];
    readonly evtChange: Observable<T>["evtChange"];
    readonly value: T;
    constructor(initialValue: T, areSame?: (currentValue: T, newValue: T) => boolean);
    private overwriteReadonlyValue;
    /** Return true if the value have been changed */
    onPotentialChange(newValue: T): boolean;
}
export {};
