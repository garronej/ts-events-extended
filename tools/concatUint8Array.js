"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatUint8Array = void 0;
var concatUint8Array = function (chunks, byteLength) {
    byteLength = byteLength !== undefined ?
        byteLength :
        chunks.reduce(function (prev, _a) {
            var byteLength = _a.byteLength;
            return prev + byteLength;
        }, 0);
    return chunks.reduce(function (_a, chunk) {
        var out = _a.out, n = _a.n;
        out.set(chunk.slice(0, Math.min(chunk.byteLength, byteLength - n)), n);
        return {
            out: out,
            "n": n + chunk.length
        };
    }, { "out": new Uint8Array(byteLength), "n": 0 }).out;
};
exports.concatUint8Array = concatUint8Array;
//# sourceMappingURL=concatUint8Array.js.map