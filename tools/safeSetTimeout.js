"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeClearTimeout = exports.safeSetTimeout = void 0;
var safeSetTimeout = function (callback, ms) { return setTimeout(callback, ms); };
exports.safeSetTimeout = safeSetTimeout;
var safeClearTimeout = function (timer) { return clearTimeout(timer); };
exports.safeClearTimeout = safeClearTimeout;
//# sourceMappingURL=safeSetTimeout.js.map