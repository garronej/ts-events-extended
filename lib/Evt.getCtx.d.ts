import type { Ctx } from "./types";
/**
 * https://docs.evt.land/api/evt/getctx
 *
 * Evt.getCtx(obj) an instance of Ctx<void>, always the same for a given object.
 * No strong reference to the object is created
 * when the object is no longer referenced it's associated Ctx will be freed from memory.
 */
export declare function getCtxFactory(): (obj: object) => Ctx;
