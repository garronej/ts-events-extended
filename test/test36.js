"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var evt = lib_1.Evt.create();
evt.waitFor(0);
evt.post();
evt.post();
evt.waitFor(0)
    .then(function () { return console.assert(false); }, function () { });
setTimeout(function () { return console.log("PASS"); }, 100);
//# sourceMappingURL=test36.js.map