import { Polyfill as WeakMap } from "https://raw.githubusercontent.com/garronej/minimal_polyfills/v2.2.1/deno_dist/WeakMap.ts";
import { importProxy } from "./importProxy.ts";
import type { Ctx } from "./types/index.ts";

/** 
 * https://docs.evt.land/api/evt/getctx
 * 
 * Evt.getCtx(obj) an instance of Ctx<void>, always the same for a given object.
 * No strong reference to the object is created
 * when the object is no longer referenced it's associated Ctx will be freed from memory.
 */
export function getCtxFactory() {

    const ctxByObj = new WeakMap<object, Ctx>();

    function getCtx(obj: object): Ctx {

        let ctx = ctxByObj.get(obj);

        if (ctx === undefined) {

            ctx = (new importProxy.Ctx());

            ctxByObj.set(obj, ctx);

        }

        return ctx;

    }

    return getCtx;

}
