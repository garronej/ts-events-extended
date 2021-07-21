"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidDeferred = exports.Deferred = void 0;
var overwriteReadonlyProp_1 = require("tsafe/lab/overwriteReadonlyProp");
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this_1 = this;
        this.isPending = true;
        var resolve;
        var reject;
        this.pr = new Promise(function (resolve_, reject_) {
            resolve = function (value) {
                overwriteReadonlyProp_1.overwriteReadonlyProp(_this_1, "isPending", false);
                resolve_(value);
            };
            reject = function (error) {
                overwriteReadonlyProp_1.overwriteReadonlyProp(_this_1, "isPending", false);
                reject_(error);
            };
        });
        this.resolve = resolve;
        this.reject = reject;
    }
    return Deferred;
}());
exports.Deferred = Deferred;
var VoidDeferred = /** @class */ (function (_super) {
    __extends(VoidDeferred, _super);
    function VoidDeferred() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VoidDeferred;
}(Deferred));
exports.VoidDeferred = VoidDeferred;
//# sourceMappingURL=Deferred.js.map