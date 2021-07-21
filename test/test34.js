"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exclude_1 = require("tsafe/exclude");
var inDepth_1 = require("../tools/inDepth");
var assert_1 = require("tsafe/assert");
{
    var d = ["p1", "p2", "p3"]
        .filter(exclude_1.exclude(["p1", "p2"]));
    assert_1.assert(inDepth_1.same(d, ["p3"]));
}
{
    var d = ["p1", "p2", "p3"]
        .filter(exclude_1.exclude("p1"));
    assert_1.assert(inDepth_1.same(d, ["p2", "p3"]));
}
{
    var d = ["p1", "p2", "p3", null]
        .filter(exclude_1.exclude(null));
    assert_1.assert(inDepth_1.same(d, ["p1", "p2", "p3"]));
}
{
    var d = ["p1", "p2", "p3", null, false]
        .filter(exclude_1.exclude([null, false]));
    assert_1.assert(inDepth_1.same(d, ["p1", "p2", "p3"]));
}
console.log("PASS");
//# sourceMappingURL=test34.js.map