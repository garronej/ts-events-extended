"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evt = exports.onAddHandlerByEvt = void 0;
require("minimal-polyfills/Array.prototype.find");
var importProxy_1 = require("./importProxy");
var Evt_create_1 = require("./Evt.create");
var Evt_getCtx_1 = require("./Evt.getCtx");
var Evt_factorize_1 = require("./Evt.factorize");
var Evt_merge_1 = require("./Evt.merge");
var Evt_from_1 = require("./Evt.from");
var Evt_asPostable_1 = require("./Evt.asPostable");
var Evt_asyncPipe_1 = require("./Evt.asyncPipe");
var Evt_asNonPostable_1 = require("./Evt.asNonPostable");
var Evt_parsePropsFromArgs_1 = require("./Evt.parsePropsFromArgs");
var Evt_newCtx_1 = require("./Evt.newCtx");
var LazyEvt_1 = require("./LazyEvt");
var Map_1 = require("minimal-polyfills/Map");
var WeakMap_1 = require("minimal-polyfills/WeakMap");
var runExclusive = require("run-exclusive");
var overwriteReadonlyProp_1 = require("tsafe/lab/overwriteReadonlyProp");
var typeGuard_1 = require("tsafe/typeGuard");
var Deferred_1 = require("../tools/Deferred");
var Evt_loosenType_1 = require("./Evt.loosenType");
var safeSetTimeout_1 = require("../tools/safeSetTimeout");
var isPromiseLike_1 = require("tsafe/isPromiseLike");
var EvtError_1 = require("./types/EvtError");
var nsCtxLike = require("./types/interfaces/CtxLike");
var convertOperatorToStatelessFLambda_1 = require("./util/convertOperatorToStatelessFLambda");
var runSideEffect = function (sideEffect) { return sideEffect(); };
// NOTE: For compat with --no-check 
// https://github.com/asos-craigmorten/opine/issues/97#issuecomment-751806014
var CtxLikeAsValue = nsCtxLike.CtxLike;
var EvtImpl = /** @class */ (function () {
    function EvtImpl() {
        this.lazyEvtAttach = new LazyEvt_1.LazyEvt();
        this.lazyEvtDetach = new LazyEvt_1.LazyEvt();
        this.__maxHandlers = undefined;
        this.postCount = 0;
        this.traceId = null;
        this.handlers = [];
        this.handlerTriggers = new Map_1.Polyfill();
        /*
        NOTE: Used as Date.now() would be used to compare if an event is anterior
        or posterior to an other. We don't use Date.now() because two call within
        less than a ms will return the same value unlike this function.
        */
        this.__currentChronologyMark = 0;
        this.asyncHandlerCount = 0;
    }
    EvtImpl.setDefaultMaxHandlers = function (n) {
        this.__defaultMaxHandlers = isFinite(n) ? n : 0;
    };
    EvtImpl.prototype.toStateful = function (p1, p2) {
        var isP1Ctx = CtxLikeAsValue.match(p1);
        var initialValue = isP1Ctx ? undefined : p1;
        var ctx = p2 || (isP1Ctx ? p1 : undefined);
        var out = new importProxy_1.importProxy.StatefulEvt(initialValue);
        var callback = function (data) { return out.post(data); };
        if (!!ctx) {
            this.attach(ctx, callback);
        }
        else {
            this.attach(callback);
        }
        return out;
    };
    Object.defineProperty(EvtImpl.prototype, "evtAttach", {
        get: function () {
            return this.lazyEvtAttach.evt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvtImpl.prototype, "evtDetach", {
        get: function () {
            return this.lazyEvtDetach.evt;
        },
        enumerable: false,
        configurable: true
    });
    EvtImpl.prototype.setMaxHandlers = function (n) {
        this.__maxHandlers = isFinite(n) ? n : 0;
        return this;
    };
    EvtImpl.prototype.enableTrace = function (params
    //NOTE: Not typeof console.log as we don't want to expose types from node
    ) {
        var id = params.id, formatter = params.formatter, log = params.log;
        this.traceId = id;
        this.traceFormatter = formatter || (function (data) {
            try {
                return JSON.stringify(data, null, 2);
            }
            catch (_a) {
                return "" + data;
            }
        });
        this.log =
            log === undefined ?
                (function () {
                    var inputs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        inputs[_i] = arguments[_i];
                    }
                    return console.log.apply(console, __spreadArray([], __read(inputs)));
                }) :
                log === false ? undefined : log;
    };
    EvtImpl.prototype.disableTrace = function () {
        this.traceId = null;
        return this;
    };
    Object.defineProperty(EvtImpl.prototype, "asyncHandlerChronologyMark", {
        //NOTE: An async handler ( attached with waitFor ) is only eligible to handle a post if the post
        //occurred after the handler was set. We don't want to waitFor event from the past.
        //private readonly asyncHandlerChronologyMark = new WeakMap<ImplicitParams.Async, number>();
        get: function () {
            var _a, _b;
            var _c, _d;
            return (_b = (_d = ((_a = (_c = this)["~internal"]) !== null && _a !== void 0 ? _a : (_c["~internal"] = {})))["asyncHandlerChronologyMark"]) !== null && _b !== void 0 ? _b : (_d["asyncHandlerChronologyMark"] = new WeakMap_1.Polyfill());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvtImpl.prototype, "asyncHandlerChronologyExceptionRange", {
        //NOTE: There is an exception to the above rule, we want to allow async waitFor loop 
        //do so we have to handle the case where multiple event would be posted synchronously.
        get: function () {
            var _a, _b;
            var _c, _d;
            return (_b = (_d = ((_a = (_c = this)["~internal"]) !== null && _a !== void 0 ? _a : (_c["~internal"] = {})))["asyncHandlerChronologyExceptionRange"]) !== null && _b !== void 0 ? _b : (_d["asyncHandlerChronologyExceptionRange"] = new WeakMap_1.Polyfill());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvtImpl.prototype, "invocableOpByOp", {
        get: function () {
            var _a, _b;
            var _c, _d;
            return (_b = (_d = ((_a = (_c = this)["~internal"]) !== null && _a !== void 0 ? _a : (_c["~internal"] = {})))["invocableOpByOp"]) !== null && _b !== void 0 ? _b : (_d["invocableOpByOp"] = new WeakMap_1.Polyfill());
        },
        enumerable: false,
        configurable: true
    });
    EvtImpl.prototype.getInvocableOp = function (op) {
        var invocableOp = this.invocableOpByOp.get(op);
        if (invocableOp === undefined) {
            throw new Error([
                "Provided operator isn't the operator of any handler",
                "currently attached to the Evt instance"
            ].join(" "));
        }
        return invocableOp;
    };
    EvtImpl.prototype.getChronologyMark = function () {
        return this.__currentChronologyMark++;
    };
    EvtImpl.prototype.detachHandler = function (handler, wTimer, rejectPr) {
        var index = this.handlers.indexOf(handler);
        if (index < 0) {
            return false;
        }
        if (typeGuard_1.typeGuard(handler, !!handler.ctx)) {
            handler.ctx.zz__removeHandler(handler);
        }
        this.handlers.splice(index, 1);
        if (handler.async) {
            this.asyncHandlerCount--;
        }
        this.handlerTriggers.delete(handler);
        if (wTimer[0] !== undefined) {
            safeSetTimeout_1.safeClearTimeout(wTimer[0]);
            rejectPr(new EvtError_1.DetachedEvtError());
        }
        this.lazyEvtDetach.post(handler);
        return true;
    };
    EvtImpl.prototype.triggerHandler = function (handler, wTimer, resolvePr, opResult //TODO: Or readonly [ any ] ?? 
    ) {
        var callback = handler.callback, once = handler.once;
        if (wTimer[0] !== undefined) {
            safeSetTimeout_1.safeClearTimeout(wTimer[0]);
            wTimer[0] = undefined;
        }
        if (once) {
            handler.detach();
        }
        var _a = __read(opResult, 1), transformedData = _a[0];
        var prOrValue = callback === null || callback === void 0 ? void 0 : callback.call(this, transformedData);
        resolvePr === null || resolvePr === void 0 ? void 0 : resolvePr(transformedData);
        return isPromiseLike_1.isPromiseLike(prOrValue) ? prOrValue : undefined;
    };
    EvtImpl.prototype.addHandler = function (propsFromArgs, propsFromMethodName) {
        var _this_1 = this;
        var _a;
        this.invocableOpByOp.set(propsFromArgs.op, convertOperatorToStatelessFLambda_1.convertOperatorToStatelessFλ(propsFromArgs.op));
        var d = new Deferred_1.Deferred();
        var wTimer = [undefined];
        var handler = __assign(__assign(__assign({}, propsFromArgs), propsFromMethodName), { "detach": function () { return _this_1.detachHandler(handler, wTimer, d.reject); }, "promise": d.pr });
        if (typeof handler.timeout === "number") {
            wTimer[0] = safeSetTimeout_1.safeSetTimeout(function () {
                wTimer[0] = undefined;
                handler.detach();
                d.reject(new EvtError_1.TimeoutEvtError(handler.timeout));
            }, handler.timeout);
        }
        var handlerTrigger = function (opResult) { return _this_1.triggerHandler(handler, wTimer, d.isPending ? d.resolve : undefined, opResult); };
        this.handlerTriggers.set(handler, handlerTrigger);
        if (handler.async) {
            this.asyncHandlerChronologyMark.set(handler, this.getChronologyMark());
        }
        if (handler.prepend) {
            var i = void 0;
            for (i = 0; i < this.handlers.length; i++) {
                if (this.handlers[i].extract) {
                    continue;
                }
                break;
            }
            this.handlers.splice(i, 0, handler);
        }
        else {
            this.handlers.push(handler);
        }
        if (handler.async) {
            this.asyncHandlerCount++;
        }
        this.checkForPotentialMemoryLeak();
        if (typeGuard_1.typeGuard(handler, !!handler.ctx)) {
            handler.ctx.zz__addHandler(handler, this);
        }
        (_a = exports.onAddHandlerByEvt.get(this)) === null || _a === void 0 ? void 0 : _a(handler, handlerTrigger);
        //NOTE: Can happen for example if this is a StatefulEvt 
        //and the handler is "once" and the matcher match the state 
        //We don't want to post an attach if the handler is already detached.
        if (this.handlerTriggers.has(handler)) {
            this.lazyEvtAttach.post(handler);
        }
        return handler;
    };
    EvtImpl.prototype.checkForPotentialMemoryLeak = function () {
        var maxHandlers = this.__maxHandlers !== undefined ?
            this.__maxHandlers :
            EvtImpl.__defaultMaxHandlers;
        if (maxHandlers === 0 ||
            this.handlers.length % (maxHandlers + 1) !== 0) {
            return;
        }
        var message = [
            "MaxHandlersExceededWarning: Possible Evt memory leak detected.",
            this.handlers.length + " handlers attached" + (this.traceId ? " to \"" + this.traceId + "\"" : "") + ".\n",
            "Use Evt.prototype.setMaxHandlers(n) to increase limit on a specific Evt.\n",
            "Use Evt.setDefaultMaxHandlers(n) to change the default limit currently set to " + EvtImpl.__defaultMaxHandlers + ".\n",
        ].join("");
        var map = new Map_1.Polyfill();
        this.getHandlers()
            .map(function (_a) {
            var ctx = _a.ctx, async = _a.async, once = _a.once, prepend = _a.prepend, extract = _a.extract, op = _a.op, callback = _a.callback;
            return (__assign(__assign({ "hasCtx": !!ctx, once: once,
                prepend: prepend,
                extract: extract, "isWaitFor": async }, (op === Evt_parsePropsFromArgs_1.matchAll ? {} : { "op": op.toString() })), (!callback ? {} : { "callback": callback.toString() })));
        })
            .map(function (obj) {
            return "{\n" + Object.keys(obj)
                .map(function (key) { return "  " + key + ": " + obj[key]; })
                .join(",\n") + "\n}";
        })
            .forEach(function (str) { return map.set(str, (map.has(str) ? map.get(str) : 0) + 1); });
        message += "\n" + Array.from(map.keys())
            .map(function (str) { return map.get(str) + " handler" + (map.get(str) === 1 ? "" : "s") + " like:\n" + str; })
            .join("\n") + "\n";
        if (this.traceId === null) {
            message += "\n" + [
                "To validate the identify of the Evt instance that is triggering this warning you can call",
                "Evt.prototype.enableTrace({ \"id\": \"My evt id\", \"log\": false }) on the Evt that you suspect.\n"
            ].join(" ");
        }
        try {
            console.warn(message);
        }
        catch (_a) {
        }
    };
    EvtImpl.prototype.isHandledByOp = function (op, data) {
        var hasSideEffect = false;
        var invocableOp;
        try {
            invocableOp = this.getInvocableOp(op);
        }
        catch (_a) {
            return false;
        }
        var opResult = invocableOp(data, function () { return hasSideEffect = true; });
        return opResult !== null || hasSideEffect;
    };
    EvtImpl.prototype.trace = function (data) {
        var _this_1 = this;
        var _a;
        if (this.traceId === null) {
            return;
        }
        var message = "(" + this.traceId + ") ";
        var isExtracted = !!this.handlers.find(function (_a) {
            var extract = _a.extract, op = _a.op;
            return (extract &&
                _this_1.isHandledByOp(op, data));
        });
        if (isExtracted) {
            message += "extracted ";
        }
        else {
            var handlerCount = this.handlers
                .filter(function (_a) {
                var extract = _a.extract, op = _a.op;
                return !extract &&
                    _this_1.isHandledByOp(op, data);
            })
                .length;
            message += handlerCount + " handler" + ((handlerCount > 1) ? "s" : "") + ", ";
        }
        (_a = this.log) === null || _a === void 0 ? void 0 : _a.call(this, message + this.traceFormatter(data));
    };
    /** Return [ isExtracted, prAllHandlerCallbacksResolved ] */
    EvtImpl.prototype.postSync = function (data) {
        var e_1, _a;
        var prAllHandlerCallbacksResolved = [];
        var getReturnValue = function (isExtracted) { return [
            isExtracted,
            Promise.all(prAllHandlerCallbacksResolved).then(function () { })
        ]; };
        try {
            for (var _b = __values(__spreadArray([], __read(this.handlers))), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                var async = handler.async, op = handler.op, extract = handler.extract;
                if (async) {
                    continue;
                }
                //NOTE: If detached while executing the operator
                //we still want to trigger the handler.
                var handlerTrigger = this.handlerTriggers.get(handler);
                var opResult = this.getInvocableOp(op)(data, runSideEffect);
                if (opResult === null) {
                    continue;
                }
                //NOTE: Possible if detached while in the loop.
                if (!handlerTrigger) {
                    continue;
                }
                var prOrUndefined = handlerTrigger(opResult);
                if (prOrUndefined !== undefined) {
                    prAllHandlerCallbacksResolved.push(prOrUndefined);
                }
                if (extract) {
                    return getReturnValue(true);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return getReturnValue(false);
    };
    EvtImpl.prototype.postAsyncFactory = function () {
        var _this_1 = this;
        return runExclusive.buildMethodCb(function (data, postChronologyMark, releaseLock) {
            var e_2, _a;
            if (_this_1.asyncHandlerCount === 0) {
                releaseLock();
                return;
            }
            var promises = [];
            var chronologyMarkStartResolveTick;
            //NOTE: Must be before handlerTrigger call.
            Promise.resolve().then(function () { return chronologyMarkStartResolveTick = _this_1.getChronologyMark(); });
            var _loop_1 = function (handler) {
                if (!handler.async) {
                    return "continue";
                }
                var opResult = _this_1.getInvocableOp(handler.op)(data, runSideEffect);
                if (opResult === null) {
                    return "continue";
                }
                var handlerTrigger = _this_1.handlerTriggers.get(handler);
                if (!handlerTrigger) {
                    return "continue";
                }
                var shouldCallHandlerTrigger = (function () {
                    var handlerMark = _this_1.asyncHandlerChronologyMark.get(handler);
                    if (postChronologyMark > handlerMark) {
                        return true;
                    }
                    var exceptionRange = _this_1.asyncHandlerChronologyExceptionRange.get(handler);
                    return (exceptionRange !== undefined &&
                        exceptionRange.lowerMark < postChronologyMark &&
                        postChronologyMark < exceptionRange.upperMark &&
                        handlerMark > exceptionRange.upperMark);
                })();
                if (!shouldCallHandlerTrigger) {
                    return "continue";
                }
                promises.push(new Promise(function (resolve) { return handler.promise
                    .then(function () { return resolve(); })
                    .catch(function () { return resolve(); }); }));
                handlerTrigger(opResult);
            };
            try {
                for (var _b = __values(__spreadArray([], __read(_this_1.handlers))), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var handler = _c.value;
                    _loop_1(handler);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (promises.length === 0) {
                releaseLock();
                return;
            }
            var handlersDump = __spreadArray([], __read(_this_1.handlers));
            Promise.all(promises).then(function () {
                var e_3, _a;
                try {
                    for (var _b = __values(_this_1.handlers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var handler = _c.value;
                        if (!handler.async) {
                            continue;
                        }
                        if (handlersDump.indexOf(handler) >= 0) {
                            continue;
                        }
                        _this_1.asyncHandlerChronologyExceptionRange.set(handler, {
                            "lowerMark": postChronologyMark,
                            "upperMark": chronologyMarkStartResolveTick
                        });
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                releaseLock();
            });
        });
    };
    EvtImpl.prototype.isHandled = function (data) {
        var _this_1 = this;
        return !!this.getHandlers()
            .find(function (_a) {
            var op = _a.op;
            return _this_1.isHandledByOp(op, data);
        });
    };
    EvtImpl.prototype.getHandlers = function () {
        return __spreadArray([], __read(this.handlers));
    };
    EvtImpl.prototype.detach = function (ctx) {
        var e_4, _a;
        var detachedHandlers = [];
        try {
            for (var _b = __values(this.getHandlers()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                if (ctx !== undefined && handler.ctx !== ctx) {
                    continue;
                }
                var wasStillAttached = handler.detach();
                //NOTE: It should not be possible.
                if (!wasStillAttached) {
                    continue;
                }
                detachedHandlers.push(handler);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return detachedHandlers;
    };
    EvtImpl.prototype.pipe = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var evtDelegate = new EvtImpl();
        this.addHandler(__assign(__assign({}, Evt_parsePropsFromArgs_1.parsePropsFromArgs(args, "pipe")), { "callback": function (transformedData) { return evtDelegate.post(transformedData); } }), EvtImpl.propsFormMethodNames.attach);
        return evtDelegate;
    };
    EvtImpl.prototype.waitFor = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.addHandler(Evt_parsePropsFromArgs_1.parsePropsFromArgs(args, "waitFor"), EvtImpl.propsFormMethodNames.waitFor).promise;
    };
    EvtImpl.prototype.$attach = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.attach.apply(this, __spreadArray([], __read(args)));
    };
    EvtImpl.prototype.attach = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__attachX(args, "attach");
    };
    EvtImpl.prototype.$attachOnce = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.attachOnce.apply(this, __spreadArray([], __read(args)));
    };
    EvtImpl.prototype.attachOnce = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__attachX(args, "attachOnce");
    };
    EvtImpl.prototype.$attachExtract = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.attachExtract.apply(this, __spreadArray([], __read(args)));
    };
    EvtImpl.prototype.attachExtract = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__attachX(args, "attachExtract");
    };
    EvtImpl.prototype.$attachPrepend = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.attachPrepend.apply(this, __spreadArray([], __read(args)));
    };
    EvtImpl.prototype.attachPrepend = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__attachX(args, "attachPrepend");
    };
    EvtImpl.prototype.$attachOncePrepend = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.attachOncePrepend.apply(this, __spreadArray([], __read(args)));
    };
    EvtImpl.prototype.attachOncePrepend = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__attachX(args, "attachOncePrepend");
    };
    EvtImpl.prototype.$attachOnceExtract = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.attachOnceExtract.apply(this, __spreadArray([], __read(args)));
    };
    EvtImpl.prototype.attachOnceExtract = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__attachX(args, "attachOnceExtract");
    };
    EvtImpl.prototype.__attachX = function (args, methodName) {
        var propsFromArgs = Evt_parsePropsFromArgs_1.parsePropsFromArgs(args, "attach*");
        var handler = this.addHandler(propsFromArgs, EvtImpl.propsFormMethodNames[methodName]);
        return propsFromArgs.timeout === undefined ?
            this :
            handler.promise;
    };
    EvtImpl.prototype.postAsyncOnceHandled = function (data) {
        var _this_1 = this;
        if (this.isHandled(data)) {
            return this.post(data);
        }
        var d = new Deferred_1.Deferred();
        this.evtAttach.attachOnce(function (_a) {
            var op = _a.op;
            return _this_1.isHandledByOp(op, data);
        }, function () { return Promise.resolve().then(function () { return d.resolve(_this_1.post(data)); }); });
        return d.pr;
    };
    EvtImpl.prototype.postOrPostAndWait = function (data, wait) {
        var _this_1 = this;
        this.trace(data);
        overwriteReadonlyProp_1.overwriteReadonlyProp(this, "postCount", this.postCount + 1);
        //NOTE: Must be before postSync.
        var postChronologyMark = this.getChronologyMark();
        var _a = __read(this.postSync(data), 2), isExtracted = _a[0], prAllHandlerCallbacksResolved = _a[1];
        var getReturnValue = wait ?
            function () { return prAllHandlerCallbacksResolved; } :
            function () { return _this_1.postCount; };
        if (isExtracted) {
            return getReturnValue();
        }
        if (this.postAsync === undefined) {
            if (this.asyncHandlerCount === 0) {
                return getReturnValue();
            }
            this.postAsync = this.postAsyncFactory();
        }
        this.postAsync(data, postChronologyMark);
        return getReturnValue();
    };
    EvtImpl.prototype.post = function (data) {
        return this.postOrPostAndWait(data, false);
    };
    EvtImpl.prototype.postAndWait = function (data) {
        return this.postOrPostAndWait(data, true);
    };
    EvtImpl.create = Evt_create_1.create;
    EvtImpl.newCtx = Evt_newCtx_1.newCtx;
    EvtImpl.merge = Evt_merge_1.merge;
    EvtImpl.from = Evt_from_1.from;
    EvtImpl.getCtx = Evt_getCtx_1.getCtxFactory();
    EvtImpl.loosenType = Evt_loosenType_1.loosenType;
    EvtImpl.factorize = Evt_factorize_1.factorize;
    EvtImpl.asPostable = Evt_asPostable_1.asPostable;
    EvtImpl.asyncPipe = Evt_asyncPipe_1.asyncPipe;
    EvtImpl.asNonPostable = Evt_asNonPostable_1.asNonPostable;
    EvtImpl.__defaultMaxHandlers = 25;
    EvtImpl.propsFormMethodNames = {
        "waitFor": { "async": true, "extract": false, "once": true, "prepend": false },
        "attach": { "async": false, "extract": false, "once": false, "prepend": false },
        "attachExtract": { "async": false, "extract": true, "once": false, "prepend": true },
        "attachPrepend": { "async": false, "extract": false, "once": false, "prepend": true },
        "attachOnce": { "async": false, "extract": false, "once": true, "prepend": false },
        "attachOncePrepend": { "async": false, "extract": false, "once": true, "prepend": true },
        "attachOnceExtract": { "async": false, "extract": true, "once": true, "prepend": true }
    };
    return EvtImpl;
}());
/**
 * Can be seen as a protected method that can be
 * optionally be implemented by class extending Evt.
 *
 * Should only be accessible from within the module.
 * Basically it is for allowing StatefulEvt to execute
 * the callback on attach.
 */
exports.onAddHandlerByEvt = new WeakMap_1.Polyfill();
exports.Evt = EvtImpl;
try {
    overwriteReadonlyProp_1.overwriteReadonlyProp(exports.Evt, "name", "Evt");
}
catch (_a) { }
importProxy_1.importProxy.Evt = exports.Evt;
//# sourceMappingURL=Evt.js.map