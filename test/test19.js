"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var evt = new lib_1.Evt();
var ctx = lib_1.Evt.newCtx();
evt.evtAttach.attachOnce(function (handler) { return console.assert(!handler.once && handler.ctx === ctx); });
evt.attach(ctx, function (_a) {
    var init = _a.init;
    console.assert(init);
    console.log("PASS");
});
evt.evtAttach.attachOnce(function (handler) { return console.assert(handler.once && handler.prepend && !!handler.callback); });
evt.attachOncePrepend(function (wrap) { return wrap.init = true; });
evt.post({ "init": false });
//# sourceMappingURL=test19.js.map