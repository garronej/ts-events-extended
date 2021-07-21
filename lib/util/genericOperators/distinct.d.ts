declare type CtxLike = {
    evtDoneOrAborted: {
        postCount: number;
    };
};
export declare const distinct: <T>(keySelector?: ((value: T) => any) | undefined, ctxFlush?: CtxLike | undefined) => import("../..").Operator.fλ.Stateless<T, T>;
export {};
