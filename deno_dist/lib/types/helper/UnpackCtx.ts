

export interface CtxLike<Result = any> {
    done(result: Result): void;
}

/** Analog to UnpackEvt<E> Unpack the type argument of a Ctx */
export type UnpackCtx<Ctx extends CtxLike<any>> = 
    Ctx extends CtxLike<infer U> ? U : never
    ;

