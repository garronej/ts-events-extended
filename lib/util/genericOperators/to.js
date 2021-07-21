"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to = void 0;
/*
NOTE: Here we allow a tiny memory leak to be able to emulate
the EventEmitter.removeListener(event, callback) method easily.

evt.getHandlers()
    .filter(handler => (
        handler.callback === callback &&
        handler.op === to("event1")
    ))
    .forEach(handler => handler.detach());
*/
var map = new Map();
/**
 * Operator that helps emulate an EventEmitter with EVT
 * See https://stackblitz.com/edit/evt-honvv3?file=index.ts
 * or https://docs.evt.land/extending_evt
 * */
var to = function (eventName) {
    var _a;
    return (_a = map.get(eventName)) !== null && _a !== void 0 ? _a : (map.set(eventName, function (data) { return data[0] !== eventName ? null : [data[1]]; }),
        exports.to(eventName));
};
exports.to = to;
//# sourceMappingURL=to.js.map