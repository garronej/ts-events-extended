"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var events_1 = require("events");
var assert_1 = require("tsafe/assert");
var log = global.console.log;
var console = { "log": function (str) { return console.stdOut += "" + str; }, "stdOut": "" };
var ctx = lib_1.Evt.newCtx();
var evtText = new lib_1.Evt();
var evtTime = new lib_1.Evt();
evtText.$attach(function (text) { return [text.length]; }, ctx, function (count) { return console.log("1: " + count); });
evtTime.waitFor(function (time) { return time < 0; }, ctx).then(function (time) { return console.log("2: " + time); });
evtText
    .pipe(ctx)
    .pipe(function (text) { return [text.toUpperCase()]; })
    .attach(function (upperCaseText) { return console.log("3: " + upperCaseText); });
lib_1.Evt.merge(ctx, [evtText, evtTime])
    .attach(function (textOrTime) { return console.log("4: " + textOrTime); });
var ee = new events_1.EventEmitter();
lib_1.Evt.from(ctx, ee, "text")
    .attach(function (text) { return console.log("5: " + text); });
evtText.post("foo"); //Prints "1: 3" "3: FOO" "4: foo"
assert_1.assert(console.stdOut
    ===
        [
            "1: 3",
            "3: FOO",
            "4: foo"
        ].join(""));
console.stdOut = "";
ee.emit("text", "bar"); //Prints "5: bar"
assert_1.assert(console.stdOut === "5: bar");
console.stdOut = "";
console.log(evtText.getHandlers().length); //Prints "3"
assert_1.assert(console.stdOut === "3");
console.stdOut = "";
console.log(evtTime.getHandlers().length); //Prints "2"
assert_1.assert(console.stdOut === "2");
console.stdOut = "";
console.log(ee.listenerCount("text")); //Print "1"
assert_1.assert(console.stdOut === "1");
console.stdOut = "";
ctx.evtDoneOrAborted.attachOnce(function (_a) {
    var handlers = _a.handlers;
    console.log(handlers.filter(function (_a) {
        var evt = _a.evt;
        return evt === evtText;
    }).length +
        " handlers detached from evtText");
    console.log(handlers.filter(function (_a) {
        var evt = _a.evt;
        return evt === evtTime;
    }).length +
        " handlers detached from evtTime");
    console.log(handlers.length + " handlers detached total");
});
//Prints:
//"3 handlers detached from evtText"
//"2 handlers detached from evtTime"
//"5 handlers detached total"
ctx.done();
assert_1.assert(console.stdOut
    ===
        [
            "3 handlers detached from evtText",
            "2 handlers detached from evtTime",
            "5 handlers detached total"
        ].join(""));
console.stdOut = "";
console.log(evtText.getHandlers().length); //Prints "0"
assert_1.assert(console.stdOut === "0");
console.stdOut = "";
console.log(evtTime.getHandlers().length); //Prints "0"
assert_1.assert(console.stdOut === "0");
console.stdOut = "";
console.log(ee.listenerCount("text")); //Print "0"
assert_1.assert(console.stdOut === "0");
console.stdOut = "";
evtText.post("foo"); //Prints nothing
assert_1.assert(console.stdOut === "");
ee.emit("text", "bar"); //Prints nothing
assert_1.assert(console.stdOut === "");
log("PASS");
//# sourceMappingURL=test63.js.map