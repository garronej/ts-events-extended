import { importProxy } from "./importProxy.ts";
import type { Ctx } from "./Ctx.ts";

/** 
 * https://docs.evt.land/api/evt/newctx
 * 
 * return a new Ctx instance
 * */
export function newCtx<T = void>(): Ctx<T>{
    return new importProxy.Ctx();
}