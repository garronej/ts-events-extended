"use strict";
//NOTE: We want it to work with undefined for user that can't use null (eslint rule)
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var getHandlerPr_1 = require("./getHandlerPr");
var getPromiseAssertionApi_1 = require("../tools/testing/getPromiseAssertionApi");
var mustStayPending = getPromiseAssertionApi_1.getPromiseAssertionApi().mustStayPending;
var evt = new lib_1.Evt();
mustStayPending(getHandlerPr_1.getHandlerPr(evt, function () {
    return evt.$attach(function (data) { return typeof data !== "string" ? undefined : [data]; }, function () { });
}));
mustStayPending(evt.waitFor(function (data) { return typeof data !== "string" ? undefined : [data]; }));
evt.post(["a", "b", "c"]);
evt.post(["a", "b", "c", "d"]);
console.log("PASS");
//# sourceMappingURL=test66.js.map