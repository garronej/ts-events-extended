"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCtx = void 0;
var importProxy_1 = require("./importProxy");
/**
 * https://docs.evt.land/api/evt/newctx
 *
 * return a new Ctx instance
 * */
function newCtx() {
    return new importProxy_1.importProxy.Ctx();
}
exports.newCtx = newCtx;
//# sourceMappingURL=Evt.newCtx.js.map