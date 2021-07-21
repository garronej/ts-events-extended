"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.every = exports.arrEvery = void 0;
var reduceify_1 = require("./reduceify");
function arrEvery(arr, test) {
    if (test === void 0) { test = function (e) { return !!e; }; }
    return arr
        .map(function (e) { return test(e); })
        .reduce(function (prev, curr) { return curr && prev; }, true);
}
exports.arrEvery = arrEvery;
function every(test) {
    return reduceify_1.toReduceArguments(arrEvery, test);
}
exports.every = every;
//# sourceMappingURL=every.js.map