"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTargetLike = void 0;
var typeGuard_1 = require("tsafe/typeGuard");
var EventTargetLike;
(function (EventTargetLike) {
    var RxJSSubject;
    (function (RxJSSubject) {
        function match(eventTarget) {
            return (typeGuard_1.typeGuard(eventTarget, true) &&
                eventTarget instanceof Object &&
                typeof eventTarget.subscribe === "function");
        }
        RxJSSubject.match = match;
    })(RxJSSubject = EventTargetLike.RxJSSubject || (EventTargetLike.RxJSSubject = {}));
    var NodeStyleEventEmitter;
    (function (NodeStyleEventEmitter) {
        ;
        function match(eventTarget) {
            return (typeGuard_1.typeGuard(eventTarget, true) &&
                eventTarget instanceof Object &&
                typeof eventTarget.addListener === "function" &&
                typeof eventTarget.removeListener === "function");
        }
        NodeStyleEventEmitter.match = match;
    })(NodeStyleEventEmitter = EventTargetLike.NodeStyleEventEmitter || (EventTargetLike.NodeStyleEventEmitter = {}));
    var JQueryStyleEventEmitter;
    (function (JQueryStyleEventEmitter) {
        function match(eventTarget) {
            return (typeGuard_1.typeGuard(eventTarget, true) &&
                eventTarget instanceof Object &&
                typeof eventTarget.on === "function" &&
                typeof eventTarget.off === "function");
        }
        JQueryStyleEventEmitter.match = match;
    })(JQueryStyleEventEmitter = EventTargetLike.JQueryStyleEventEmitter || (EventTargetLike.JQueryStyleEventEmitter = {}));
    var HasEventTargetAddRemove;
    (function (HasEventTargetAddRemove) {
        function match(eventTarget) {
            return (typeGuard_1.typeGuard(eventTarget, true) &&
                eventTarget instanceof Object &&
                typeof eventTarget.addEventListener === "function" &&
                typeof eventTarget.removeEventListener === "function");
        }
        HasEventTargetAddRemove.match = match;
    })(HasEventTargetAddRemove = EventTargetLike.HasEventTargetAddRemove || (EventTargetLike.HasEventTargetAddRemove = {}));
    /* Return true if o can be a EventTargetLike */
    function canBe(o) {
        try {
            return (HasEventTargetAddRemove.match(o) ||
                NodeStyleEventEmitter.match(o) ||
                JQueryStyleEventEmitter.match(o) ||
                RxJSSubject.match(o));
        }
        catch (_a) {
            return false;
        }
    }
    EventTargetLike.canBe = canBe;
})(EventTargetLike = exports.EventTargetLike || (exports.EventTargetLike = {}));
//# sourceMappingURL=EventTargetLike.js.map