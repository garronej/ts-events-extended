/** Minimal interface that an object have to implement
 * to be considered as being most certainly an Evt instance */
export interface EvtLike<T> {
    isHandled(data?: T): void;
}
