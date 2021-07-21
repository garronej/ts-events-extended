"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var evt = new lib_1.Evt();
var callback = function () { return assert_1.assert(false); };
evt.$attach(lib_1.to("event1"), callback);
evt.$attach(lib_1.to("event1"), callback);
evt.getHandlers()
    .filter(function (handler) { return (lib_1.to("event1") === handler.op &&
    handler.callback === callback); })
    .forEach(function (_a) {
    var detach = _a.detach;
    return detach();
});
console.log("PASS");
//# sourceMappingURL=test93.js.map