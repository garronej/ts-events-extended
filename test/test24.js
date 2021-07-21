"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var evt = new lib_1.Evt();
evt.attach(function () { });
evt.attachOnce(function () { });
evt.waitFor();
evt.attachPrepend(lib_1.Evt.newCtx(), function () { });
var detachedHandlers = evt.detach();
console.assert(detachedHandlers.length === 4, "m1");
console.assert(!evt.getHandlers().length, "m2");
console.log("PASS");
//# sourceMappingURL=test24.js.map