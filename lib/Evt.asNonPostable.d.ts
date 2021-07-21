import type { ToNonPostableEvt, EvtLike } from "./types";
/** https://docs.evt.land/api/evt/asnonpostable */
export declare function asNonPostable<E extends EvtLike<any>>(evt: E): ToNonPostableEvt<E>;
