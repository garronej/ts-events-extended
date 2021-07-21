"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCtxFactory = void 0;
var WeakMap_1 = require("minimal-polyfills/WeakMap");
var importProxy_1 = require("./importProxy");
/**
 * https://docs.evt.land/api/evt/getctx
 *
 * Evt.getCtx(obj) an instance of Ctx<void>, always the same for a given object.
 * No strong reference to the object is created
 * when the object is no longer referenced it's associated Ctx will be freed from memory.
 */
function getCtxFactory() {
    var ctxByObj = new WeakMap_1.Polyfill();
    function getCtx(obj) {
        var ctx = ctxByObj.get(obj);
        if (ctx === undefined) {
            ctx = (new importProxy_1.importProxy.Ctx());
            ctxByObj.set(obj, ctx);
        }
        return ctx;
    }
    return getCtx;
}
exports.getCtxFactory = getCtxFactory;
//# sourceMappingURL=Evt.getCtx.js.map