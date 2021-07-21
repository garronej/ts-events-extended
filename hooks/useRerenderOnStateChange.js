"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRerenderOnStateChange = void 0;
var WeakSet_1 = require("minimal-polyfills/WeakSet");
var evt_1 = require("evt");
var hooks_1 = require("evt/hooks");
var React = require("react");
var useReducer = React.useReducer;
;
;
var ctxs = new WeakSet_1.Polyfill();
/**
 * https://docs.evt.land/api/react-hooks
 *
 * To use StatefulEvt as react component state.
 * */
function useRerenderOnStateChange() {
    var evts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        evts[_i] = arguments[_i];
    }
    var _a = __read(useReducer(function (x) { return x + 1; }, 0), 2), forceUpdate = _a[1];
    hooks_1.useEvt(function (ctx) {
        ctxs.add(ctx);
        evts.forEach(function (evt) {
            var attach = function () { return evt.evtChange.toStateless(ctx).attach(function () { return forceUpdate(); }); };
            attach();
            //NOTE: We do all this funny business because we want to ensure that the handler
            //that triggers the re-render is always the last handler to be invoked.
            //What we do is we detach our handler when an other is added and synchronously re-attach it
            //Using the ctxs WeakMap we avoid infinite loop, each handler of useRerenderOnStateChange
            //trying to be the first. (happens when useRerenderOnStateChange is called multiple time on
            //an event)
            evt_1.Evt.merge(__spreadArray([
                evt.evtChange.evtAttach.pipe(ctx, function (handler) { return !ctxs.has(handler.ctx); })
            ], __read([
                evt,
                evt.evtChangeDiff,
                evt.evtDiff
            ].map(function (evt) { return evt.evtAttach.pipe(ctx); })))).attach(function () {
                evt.evtChange.detach(ctx);
                attach();
            });
        });
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    evts);
}
exports.useRerenderOnStateChange = useRerenderOnStateChange;
//# sourceMappingURL=useRerenderOnStateChange.js.map