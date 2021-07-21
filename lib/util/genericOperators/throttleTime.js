"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttleTime = void 0;
var compose_1 = require("../compose");
var throttleTime = function (duration) {
    return compose_1.compose([
        function (data, _a) {
            var lastClick = _a.lastClick;
            var now = Date.now();
            return now - lastClick < duration ?
                null :
                [{ data: data, "lastClick": now }];
        },
        { "lastClick": 0, "data": null }
    ], function (_a) {
        var data = _a.data;
        return [data];
    });
};
exports.throttleTime = throttleTime;
//# sourceMappingURL=throttleTime.js.map