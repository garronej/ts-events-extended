"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var evt = new lib_1.Evt();
var text_ = "";
evt.$attach(lib_1.to("text"), function (text) { return text_ = text; });
var time_ = NaN;
evt.$attachOnce(lib_1.to("time"), function (time) { return time_ = time; });
evt.post(["text", "hi!"]);
evt.post(["time", 123]);
evt.post(["time", 1234]);
assert_1.assert(text_ === "hi!");
assert_1.assert(time_ === 123);
if (1 === 1 + 1) {
    var evtBtnClick2 = lib_1.Evt.merge([
        lib_1.Evt.from(document, "click").pipe(function (event) { return [["CLOSE", event]]; }),
        lib_1.Evt.from(document, "MSGestureChange").pipe(function (event) { return [["SUBMIT", event]]; })
    ]);
    evtBtnClick2.$attach(lib_1.to("CLOSE"), function (event) { return event.screenY; });
    evtBtnClick2.$attach(lib_1.to("SUBMIT"), function (event) { return event.defaultPrevented; });
    var evtBtnClick = lib_1.Evt.merge(["close", "submit"]
        .map(function (id) { return lib_1.Evt.from(document.getElementById(id), "click")
        .pipe(function (event) { return [[id, event]]; }); }));
    evtBtnClick.$attach(lib_1.to("close"), function (event) { return event.movementX; });
    var evt3 = lib_1.Evt.merge(["wheel", "click"]
        .map(function (id) { return lib_1.Evt.from(document, id).pipe(function (event) { return [[id, event]]; }); }));
    evt3.$attach(lib_1.to("wheel"), function (event) { return "movementX" in event ? event.movementX : null; });
}
console.log("PASS");
//# sourceMappingURL=test59.js.map