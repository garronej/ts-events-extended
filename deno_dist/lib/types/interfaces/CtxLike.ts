
import { typeGuard } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/typeGuard.ts";
import type { EvtLike  } from "../helper/index.ts";
import type { Handler } from "../Handler.ts";

/** 
 * Minimal interface that an object must implement to be a valid context argument 
 * ( for interop between mismatching EVT versions )
 * */
export interface CtxLike<Result = any> {
    done(result: Result): void;
    abort(error: Error): void;
    zz__addHandler<T>(handler: Handler<T, any, CtxLike<Result>>, evt: EvtLike<T>): void;
    zz__removeHandler<T>(handler: Handler<T, any, CtxLike<Result>>): void;
}

export namespace CtxLike {

    export function match<T=any>(o: any): o is CtxLike<T> {
        return (
            typeGuard<CtxLike>(o, true) &&
            o instanceof Object &&
            typeof o.done === "function" &&
            typeof o.abort === "function" &&
            typeof o.zz__addHandler === "function" &&
            typeof o.zz__removeHandler === "function"
        );
    }

}
