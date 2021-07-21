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
exports.DetachedEvtError = exports.TimeoutEvtError = void 0;
var TimeoutEvtError = /** @class */ (function (_super) {
    __extends(TimeoutEvtError, _super);
    function TimeoutEvtError(timeout) {
        var _newTarget = this.constructor;
        var _this_1 = _super.call(this, "Evt timeout after " + timeout + "ms") || this;
        _this_1.timeout = timeout;
        Object.setPrototypeOf(_this_1, _newTarget.prototype);
        return _this_1;
    }
    return TimeoutEvtError;
}(Error));
exports.TimeoutEvtError = TimeoutEvtError;
var DetachedEvtError = /** @class */ (function (_super) {
    __extends(DetachedEvtError, _super);
    function DetachedEvtError() {
        var _newTarget = this.constructor;
        var _this_1 = _super.call(this, "Evt handler detached") || this;
        Object.setPrototypeOf(_this_1, _newTarget.prototype);
        return _this_1;
    }
    return DetachedEvtError;
}(Error));
exports.DetachedEvtError = DetachedEvtError;
//# sourceMappingURL=EvtError.js.map