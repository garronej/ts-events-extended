"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var evtText = new lib_1.Evt();
var acc = "";
var ctx = lib_1.Evt.newCtx();
evtText.$attach(function (text, registerSideEffect) { return (text === "END" && registerSideEffect(function () { return ctx.done(); }), [text]); }, ctx, function (text) { return acc += " " + text; });
evtText.post("TICK");
evtText.post("TICK");
evtText.post("END");
evtText.post("TICK");
console.assert(acc === " TICK TICK END");
console.log("PASS");
//# sourceMappingURL=test44.js.map