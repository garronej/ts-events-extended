
import type { Postable } from "./Postable.ts";
import type { NonPostableEvt } from "./NonPostableEvt.ts";

export interface Evt<T> extends Postable<T>, NonPostableEvt<T> { }