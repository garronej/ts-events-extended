"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var events_1 = require("events");
var success = 0;
(function () {
    var e = new events_1.EventEmitter();
    var evt = new lib_1.Evt();
    e.on("click", function (str) { return evt.post(str); });
    evt.waitFor(200).then(function (str) {
        console.assert(str === "foo");
        success++;
    });
    e.emit("click", "foo");
})();
(function () {
    var e = new events_1.EventEmitter();
    var evt = new lib_1.Evt();
    e.on("click", function (a, b) { return evt.post(a + b); });
    evt.waitFor(200).then(function (str) {
        console.assert(str === "foobar", "m");
        success++;
    });
    e.emit("click", "foo", "bar");
})();
setTimeout(function () {
    console.assert(success === 2);
    console.log("PASS");
}, 2000);
//# sourceMappingURL=test23.js.map