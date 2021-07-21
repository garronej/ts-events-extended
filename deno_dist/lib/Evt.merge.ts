
import { importProxy } from "./importProxy.ts";
import type { UnpackEvt, Evt, CtxLike } from "./types/index.ts";


export type EvtLike<T> = import("./types/helper/index.ts").EvtLike<T> & {
    attach(ctx: CtxLike<any>, callback: (data: T) => void): void;
    attach(callback: (data: T) => void): void;
};

export function mergeImpl<EvtUnion extends EvtLike<any>>(
    ctx: CtxLike<any> | undefined,
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>> {

    const evtUnion = new importProxy.Evt<UnpackEvt<EvtUnion>>();

    const callback = (data: UnpackEvt<typeof evtUnion>) => evtUnion.post(data)

    evts.forEach(
        evt => {

            if (ctx === undefined) {
                evt.attach(callback);
            } else {
                evt.attach(ctx, callback);
            }

        }
    );

    return evtUnion;

}



/** https://docs.evt.land/api/evt/merge */
export function merge<EvtUnion extends EvtLike<any>>(
    ctx: CtxLike<any>,
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>>;
export function merge<EvtUnion extends EvtLike<any>>(
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>>;
export function merge<EvtUnion extends EvtLike<any>>(
    p1: CtxLike<any> | readonly EvtUnion[],
    p2?: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>> {

    return "length" in p1 ?
        mergeImpl(undefined, p1) :
        mergeImpl(p1, p2!)
        ;


}