"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CtxLike = void 0;
var typeGuard_1 = require("tsafe/typeGuard");
var CtxLike;
(function (CtxLike) {
    function match(o) {
        return (typeGuard_1.typeGuard(o, true) &&
            o instanceof Object &&
            typeof o.done === "function" &&
            typeof o.abort === "function" &&
            typeof o.zz__addHandler === "function" &&
            typeof o.zz__removeHandler === "function");
    }
    CtxLike.match = match;
})(CtxLike = exports.CtxLike || (exports.CtxLike = {}));
//# sourceMappingURL=CtxLike.js.map