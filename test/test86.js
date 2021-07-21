"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
;
var std_out = "";
lib_1.Evt.create()
    .attach(function () { return std_out += "tick "; })
    .attach(function () { return std_out += "tick "; })
    .attach(function () { return std_out += "tick "; })
    .post();
assert_1.assert(std_out === "tick tick tick ");
std_out = "";
lib_1.Evt.create(0)
    .attach(function (data) { return std_out += data; })
    .attach(function (data) { return std_out += data; })
    .attach(function (data) { return std_out += data; })
    .state++;
assert_1.assert(std_out === "000111");
std_out = "";
lib_1.Evt.create()
    .attach(function (data) { return std_out += data; })
    .attach(function (data) { return std_out += data; })
    .attach(function (data) { return std_out += data; })
    .post(3);
assert_1.assert(std_out === "333");
console.log("PASS");
//# sourceMappingURL=test86.js.map