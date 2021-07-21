"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonNullable = void 0;
var isNonNullable = function (arg) {
    return arg !== undefined && arg !== null;
};
var nonNullableImpl = function (data) {
    return !isNonNullable(data) ? null : [data];
};
var nonNullable = function () {
    return nonNullableImpl;
};
exports.nonNullable = nonNullable;
//# sourceMappingURL=nonNullable.js.map