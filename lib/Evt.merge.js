"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = exports.mergeImpl = void 0;
var importProxy_1 = require("./importProxy");
function mergeImpl(ctx, evts) {
    var evtUnion = new importProxy_1.importProxy.Evt();
    var callback = function (data) { return evtUnion.post(data); };
    evts.forEach(function (evt) {
        if (ctx === undefined) {
            evt.attach(callback);
        }
        else {
            evt.attach(ctx, callback);
        }
    });
    return evtUnion;
}
exports.mergeImpl = mergeImpl;
function merge(p1, p2) {
    return "length" in p1 ?
        mergeImpl(undefined, p1) :
        mergeImpl(p1, p2);
}
exports.merge = merge;
//# sourceMappingURL=Evt.merge.js.map