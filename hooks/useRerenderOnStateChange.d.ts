declare type CtxLike<Result = any> = import("evt/lib/types/interfaces/CtxLike").CtxLike<Result>;
interface HandlerLike {
    ctx: CtxLike;
}
declare type Pipe<Cb = () => void> = (ctx: CtxLike, cb?: Cb) => import("evt/lib/Evt.merge").EvtLike<any>;
interface StatefulReadonlyEvtLike {
    evtChange: {
        evtAttach: {
            pipe: Pipe<(handler: HandlerLike) => void>;
        };
        detach(ctx: CtxLike): void;
        toStateless(ctx: CtxLike): {
            attach(cb: () => void): void;
        };
    };
    evtChangeDiff: {
        evtAttach: {
            pipe: Pipe;
        };
    };
    evtDiff: {
        evtAttach: {
            pipe: Pipe;
        };
    };
    evtAttach: {
        pipe: Pipe;
    };
}
/**
 * https://docs.evt.land/api/react-hooks
 *
 * To use StatefulEvt as react component state.
 * */
export declare function useRerenderOnStateChange(...evts: StatefulReadonlyEvtLike[]): void;
export {};
