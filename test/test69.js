"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//NOTE: Only test type
var lib_1 = require("../lib");
var ctx = lib_1.Evt.newCtx();
ctx.done();
var ctxBool = lib_1.Evt.newCtx();
ctxBool.done(true);
ctxBool.done(false);
console.log("PASS");
//# sourceMappingURL=test69.js.map