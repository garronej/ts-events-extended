import type { SwapEvtType, UnpackEvt, EvtLike } from "./types";
/**
 * https://docs.evt.land/api/evt/loosenType
 */
export declare function loosenType<E extends EvtLike<any>, SupersetOfT>(evt: E): UnpackEvt<E> extends SupersetOfT ? SwapEvtType<typeof evt, SupersetOfT> : "NOT A SUPERSET";
