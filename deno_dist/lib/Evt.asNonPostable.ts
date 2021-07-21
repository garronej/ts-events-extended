
import type { ToNonPostableEvt, EvtLike } from "./types/index.ts";

/** https://docs.evt.land/api/evt/asnonpostable */
export function asNonPostable<E extends EvtLike<any>>(evt: E): ToNonPostableEvt<E>{
    return evt as any;
}