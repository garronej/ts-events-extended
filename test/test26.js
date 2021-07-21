"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
{
    var evt = new lib_1.Evt();
    evt.enableTrace({
        "id": "myEvent",
        "formatter": function (n) { return n.toString(); },
        "log": function (str) { return console.assert(str === "(myEvent) 1 handler, 666"); }
    });
    evt.attachOnce(function (n) { return console.assert(n === 666); });
    evt.post(666);
    var n = 666;
    n;
    var n_ = 666;
    n_;
}
{
    var evt = new lib_1.Evt();
    var str = "ok";
    str;
}
console.log("PASS");
//# sourceMappingURL=test26.js.map