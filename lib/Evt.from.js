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
Object.defineProperty(exports, "__esModule", { value: true });
exports.from = void 0;
var id_1 = require("tsafe/id");
var assert_1 = require("tsafe/assert");
;
var typeGuard_1 = require("tsafe/typeGuard");
var Evt_merge_1 = require("./Evt.merge");
var importProxy_1 = require("./importProxy");
var nsEventTargetLike = require("./types/EventTargetLike");
var EventTargetLikeAsValue = nsEventTargetLike.EventTargetLike;
function fromImplForTargetEventLike(ctx, target, eventName, options) {
    var matchEventTargetLike = function (target_) {
        return EventTargetLikeAsValue.canBe(target_);
    };
    if (!matchEventTargetLike(target)) {
        if ("then" in target) {
            var evt_1 = new importProxy_1.importProxy.Evt();
            var isCtxDone_1 = (function () {
                var getEvtDonePostCount = function () { return ctx === null || ctx === void 0 ? void 0 : ctx.evtDoneOrAborted.postCount; };
                var n = getEvtDonePostCount();
                return function () { return n !== getEvtDonePostCount(); };
            })();
            target.then(function (data) {
                if (isCtxDone_1()) {
                    return;
                }
                evt_1.post(data);
            });
            return evt_1;
        }
        return Evt_merge_1.mergeImpl(ctx, Array.from(target).map(function (target) { return fromImplForTargetEventLike(ctx, target, eventName, options); }));
    }
    var proxy;
    if (EventTargetLikeAsValue.NodeStyleEventEmitter.match(target)) {
        proxy = {
            "on": function (listener, eventName) { return target.addListener(eventName, listener); },
            "off": function (listener, eventName) { return target.removeListener(eventName, listener); }
        };
    }
    else if (EventTargetLikeAsValue.JQueryStyleEventEmitter.match(target)) {
        proxy = {
            "on": function (listener, eventName) { return target.on(eventName, listener); },
            "off": function (listener, eventName) { return target.off(eventName, listener); }
        };
    }
    else if (EventTargetLikeAsValue.HasEventTargetAddRemove.match(target)) {
        proxy = {
            "on": function (listener, eventName, options) { return target.addEventListener(eventName, listener, options); },
            "off": function (listener, eventName, options) { return target.removeEventListener(eventName, listener, options); }
        };
    }
    else if (EventTargetLikeAsValue.RxJSSubject.match(target)) {
        var subscription_1;
        proxy = {
            "on": function (listener) { return subscription_1 = target.subscribe(function (data) { return listener(data); }); },
            "off": function () { return subscription_1.unsubscribe(); }
        };
    }
    else {
        id_1.id(target);
        assert_1.assert(false);
    }
    var evt = new importProxy_1.importProxy.Evt();
    var listener = function (data) { return evt.post(data); };
    ctx === null || ctx === void 0 ? void 0 : ctx.evtDoneOrAborted.attachOnce(function () { return proxy.off(listener, eventName, options); });
    proxy.on(listener, eventName, options);
    return evt;
}
function fromImplForObserver(ctx, ObserverConstructor, target) {
    var evt = importProxy_1.importProxy.Evt.create();
    var listener = function (_a) {
        var _b = __read(_a, 1), entry = _b[0];
        return evt.post(entry);
    };
    var observer = new ObserverConstructor(listener);
    observer.observe(target);
    ctx === null || ctx === void 0 ? void 0 : ctx.evtDoneOrAborted.attachOnce(function () { return observer.disconnect(); });
    return evt;
}
/*
/^[A-Z]/.test(targetOrEventNameOrObserverConstructorOrObserverTarget.name
    */
function from(ctxOrTargetOrObserverConstructor, targetOrEventNameOrObserverConstructorOrObserverTarget, eventNameOrOptionsOrObserverTarget, options) {
    if ("evtDoneOrAborted" in ctxOrTargetOrObserverConstructor) {
        assert_1.assert(typeGuard_1.typeGuard(targetOrEventNameOrObserverConstructorOrObserverTarget, true) &&
            typeGuard_1.typeGuard(eventNameOrOptionsOrObserverTarget, true) &&
            typeGuard_1.typeGuard(options, true));
        if (typeof targetOrEventNameOrObserverConstructorOrObserverTarget === "function") {
            assert_1.assert(typeGuard_1.typeGuard(eventNameOrOptionsOrObserverTarget, true) &&
                typeGuard_1.typeGuard(options, true));
            return fromImplForObserver(ctxOrTargetOrObserverConstructor, targetOrEventNameOrObserverConstructorOrObserverTarget, eventNameOrOptionsOrObserverTarget);
        }
        else {
            assert_1.assert(typeGuard_1.typeGuard(eventNameOrOptionsOrObserverTarget, true));
            return fromImplForTargetEventLike(ctxOrTargetOrObserverConstructor, targetOrEventNameOrObserverConstructorOrObserverTarget, eventNameOrOptionsOrObserverTarget, options);
        }
    }
    else {
        assert_1.assert(typeGuard_1.typeGuard(ctxOrTargetOrObserverConstructor, true) &&
            typeGuard_1.typeGuard(targetOrEventNameOrObserverConstructorOrObserverTarget, true) &&
            typeGuard_1.typeGuard(eventNameOrOptionsOrObserverTarget, true));
        if (typeof ctxOrTargetOrObserverConstructor === "function") {
            assert_1.assert(typeGuard_1.typeGuard(targetOrEventNameOrObserverConstructorOrObserverTarget, true) &&
                typeGuard_1.typeGuard(eventNameOrOptionsOrObserverTarget, true));
            return fromImplForObserver(undefined, ctxOrTargetOrObserverConstructor, targetOrEventNameOrObserverConstructorOrObserverTarget);
        }
        else {
            assert_1.assert(typeGuard_1.typeGuard(targetOrEventNameOrObserverConstructorOrObserverTarget, true));
            return fromImplForTargetEventLike(undefined, ctxOrTargetOrObserverConstructor, targetOrEventNameOrObserverConstructorOrObserverTarget, eventNameOrOptionsOrObserverTarget);
        }
    }
}
exports.from = from;
//# sourceMappingURL=Evt.from.js.map