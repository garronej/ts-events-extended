import type { Postable } from "./Postable";
import type { NonPostableEvt } from "./NonPostableEvt";
export interface Evt<T> extends Postable<T>, NonPostableEvt<T> {
}
