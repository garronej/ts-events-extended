(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.evt = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
exports.Ctx = void 0;
var Set_1 = require("minimal-polyfills/Set");
var WeakMap_1 = require("minimal-polyfills/WeakMap");
var assert_1 = require("tsafe/assert");
;
var is_1 = require("tsafe/is");
var LazyEvt_1 = require("./LazyEvt");
var importProxy_1 = require("./importProxy");
var overwriteReadonlyProp_1 = require("tsafe/lab/overwriteReadonlyProp");
var CtxImpl = /** @class */ (function () {
    function CtxImpl() {
        this.lazyEvtAttach = new LazyEvt_1.LazyEvt();
        this.lazyEvtDetach = new LazyEvt_1.LazyEvt();
        this.lazyEvtDoneOrAborted = new LazyEvt_1.LazyEvt();
        this.handlers = new Set_1.Polyfill();
        this.evtByHandler = new WeakMap_1.Polyfill();
    }
    Object.defineProperty(CtxImpl.prototype, "evtDoneOrAborted", {
        get: function () {
            return this.lazyEvtDoneOrAborted.evt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CtxImpl.prototype, "evtAttach", {
        get: function () {
            return this.lazyEvtAttach.evt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CtxImpl.prototype, "evtDetach", {
        get: function () {
            return this.lazyEvtDetach.evt;
        },
        enumerable: false,
        configurable: true
    });
    CtxImpl.prototype.onDoneOrAborted = function (doneEvtData) {
        this.lazyEvtDoneOrAborted.post(doneEvtData);
    };
    CtxImpl.prototype.waitFor = function (timeout) {
        var _this_1 = this;
        return this.evtDoneOrAborted
            .waitFor(timeout)
            .then(function (data) {
            if (data.type === "ABORTED") {
                throw data.error;
            }
            return data.result;
        }, function (timeoutError) {
            _this_1.abort(timeoutError);
            throw timeoutError;
        });
    };
    CtxImpl.prototype.abort = function (error) {
        return this.__done(error);
    };
    CtxImpl.prototype.done = function (result) {
        return this.__done(undefined, result);
    };
    /** Detach all handler bound to this context from theirs respective Evt and post getEvtDone() */
    CtxImpl.prototype.__done = function (error, result) {
        var e_1, _a;
        var handlers = [];
        try {
            for (var _b = __values(this.handlers.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                var evt = this.evtByHandler.get(handler);
                var wasStillAttached = handler.detach();
                //NOTE: It should not be possible
                if (!wasStillAttached) {
                    continue;
                }
                handlers.push({ handler: handler, evt: evt });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.onDoneOrAborted(__assign(__assign({}, (!!error ?
            { type: "ABORTED", error: error } :
            { type: "DONE", "result": result })), { handlers: handlers }));
        return handlers;
    };
    CtxImpl.prototype.getHandlers = function () {
        var _this_1 = this;
        return Array.from(this.handlers.values())
            .map(function (handler) { return ({ handler: handler, "evt": _this_1.evtByHandler.get(handler) }); });
    };
    CtxImpl.prototype.zz__addHandler = function (handler, evt) {
        assert_1.assert(handler.ctx === this);
        assert_1.assert(is_1.is(handler));
        this.handlers.add(handler);
        this.evtByHandler.set(handler, evt);
        this.lazyEvtAttach.post({ handler: handler, evt: evt });
    };
    CtxImpl.prototype.zz__removeHandler = function (handler) {
        assert_1.assert(handler.ctx === this);
        assert_1.assert(is_1.is(handler));
        this.lazyEvtDetach.post({
            handler: handler,
            "evt": this.evtByHandler.get(handler)
        });
        this.handlers.delete(handler);
    };
    return CtxImpl;
}());
exports.Ctx = CtxImpl;
try {
    overwriteReadonlyProp_1.overwriteReadonlyProp(exports.Ctx, "name", "Ctx");
}
catch (_a) { }
importProxy_1.importProxy.Ctx = exports.Ctx;

},{"./LazyEvt":14,"./importProxy":17,"minimal-polyfills/Set":40,"minimal-polyfills/WeakMap":41,"tsafe/assert":43,"tsafe/is":45,"tsafe/lab/overwriteReadonlyProp":47}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asNonPostable = void 0;
/** https://docs.evt.land/api/evt/asnonpostable */
function asNonPostable(evt) {
    return evt;
}
exports.asNonPostable = asNonPostable;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asPostable = void 0;
/**
 * https://docs.evt.land/api/evt/aspostable
 * ⚠ UNSAFE ⚠ - Please refer to documentation before using.
 * */
function asPostable(evt) {
    return evt;
}
exports.asPostable = asPostable;

},{}],4:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncPipe = void 0;
var importProxy_1 = require("./importProxy");
/**
 * NOTE: Workaround until v2.0 where .pipe() will support async operators
 * Usage example: https://stackblitz.com/edit/evt-async-op?file=index.ts
 *
 * When the argument is a StatefulEvt:
 * If, wile asyncOp was running, the state of the source evt
 * have changed then the result will be discarded.
 *
 * If the asyncOp complete synchronously (meaning it does not return
 * a promise) then the result is synchronously transformed. (As with .pipe() )
 *
 * More usage example in src/test/test95.ts
 */
function asyncPipe(evt, asyncOp) {
    var _this_1 = this;
    var out = "state" in evt ?
        importProxy_1.importProxy.Evt.create(undefined) :
        importProxy_1.importProxy.Evt.create();
    var currentCallCount = 0;
    evt.attach(function (data) { return __awaiter(_this_1, void 0, void 0, function () {
        var thisCallCount, prOpResult, opResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentCallCount++;
                    thisCallCount = currentCallCount;
                    prOpResult = asyncOp(data);
                    if (!(prOpResult !== null &&
                        "then" in prOpResult)) return [3 /*break*/, 2];
                    return [4 /*yield*/, prOpResult];
                case 1:
                    opResult = _a.sent();
                    if ("state" in evt &&
                        thisCallCount !== currentCallCount) {
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    opResult = prOpResult;
                    _a.label = 3;
                case 3:
                    if (!opResult) {
                        return [2 /*return*/];
                    }
                    out.post(opResult[0]);
                    return [2 /*return*/];
            }
        });
    }); });
    return out;
}
exports.asyncPipe = asyncPipe;

},{"./importProxy":17}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
var importProxy_1 = require("./importProxy");
function create() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.length === 0 ?
        new importProxy_1.importProxy.Evt() :
        new importProxy_1.importProxy.StatefulEvt(args[0]);
}
exports.create = create;

},{"./importProxy":17}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factorize = void 0;
/** https://docs.evt.land/api/evt/factorize */
function factorize(evt) {
    return evt;
}
exports.factorize = factorize;
/*
import { Evt } from "./Evt";
const x: Evt<boolean> = loosenType(new Evt<true>()); x;
const y: Evt<boolean> = loosenType(new Evt<number>()); y;
*/ 

},{}],7:[function(require,module,exports){
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

},{"./Evt.merge":11,"./importProxy":17,"./types/EventTargetLike":19,"tsafe/assert":43,"tsafe/id":44,"tsafe/typeGuard":48}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCtxFactory = void 0;
var WeakMap_1 = require("minimal-polyfills/WeakMap");
var importProxy_1 = require("./importProxy");
/**
 * https://docs.evt.land/api/evt/getctx
 *
 * Evt.getCtx(obj) an instance of Ctx<void>, always the same for a given object.
 * No strong reference to the object is created
 * when the object is no longer referenced it's associated Ctx will be freed from memory.
 */
function getCtxFactory() {
    var ctxByObj = new WeakMap_1.Polyfill();
    function getCtx(obj) {
        var ctx = ctxByObj.get(obj);
        if (ctx === undefined) {
            ctx = (new importProxy_1.importProxy.Ctx());
            ctxByObj.set(obj, ctx);
        }
        return ctx;
    }
    return getCtx;
}
exports.getCtxFactory = getCtxFactory;

},{"./importProxy":17,"minimal-polyfills/WeakMap":41}],9:[function(require,module,exports){
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

},{"../tools/Deferred":35,"../tools/safeSetTimeout":36,"./Evt.asNonPostable":2,"./Evt.asPostable":3,"./Evt.asyncPipe":4,"./Evt.create":5,"./Evt.factorize":6,"./Evt.from":7,"./Evt.getCtx":8,"./Evt.loosenType":10,"./Evt.merge":11,"./Evt.newCtx":12,"./Evt.parsePropsFromArgs":13,"./LazyEvt":14,"./importProxy":17,"./types/EvtError":20,"./types/interfaces/CtxLike":24,"./util/convertOperatorToStatelessFLambda":28,"minimal-polyfills/Array.prototype.find":37,"minimal-polyfills/Map":38,"minimal-polyfills/WeakMap":41,"run-exclusive":42,"tsafe/isPromiseLike":46,"tsafe/lab/overwriteReadonlyProp":47,"tsafe/typeGuard":48}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loosenType = void 0;
/**
 * https://docs.evt.land/api/evt/loosenType
 */
function loosenType(evt) {
    return evt;
}
exports.loosenType = loosenType;
/*
import { Evt } from "./Evt";
const x: Evt<boolean> = loosenType(new Evt<true>()); x;
const y: Evt<boolean> = loosenType(new Evt<number>()); y;
*/

},{}],11:[function(require,module,exports){
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

},{"./importProxy":17}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCtx = void 0;
var importProxy_1 = require("./importProxy");
/**
 * https://docs.evt.land/api/evt/newctx
 *
 * return a new Ctx instance
 * */
function newCtx() {
    return new importProxy_1.importProxy.Ctx();
}
exports.newCtx = newCtx;

},{"./importProxy":17}],13:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePropsFromArgs = exports.matchAll = void 0;
var id_1 = require("tsafe/id");
var compose_1 = require("./util/compose");
var typeGuard_1 = require("tsafe/typeGuard");
function matchAll() { return true; }
exports.matchAll = matchAll;
var canBeOperator = function (p) {
    return (p !== undefined &&
        typeGuard_1.typeGuard(p, true) &&
        (typeof p === "function" ||
            typeof p[0] === "function"));
};
var defaultParams = {
    "op": matchAll,
    "ctx": undefined,
    "timeout": undefined,
    "callback": undefined
};
function parsePropsFromArgs(inputs, methodName) {
    switch (methodName) {
        case "pipe":
            {
                //[]
                //[undefined] ( not valid but user would expect it to work )
                //[ ctx, ...op[] ]
                //[ ...op[] ]
                var getOpWrap = function (ops) {
                    return ops.length === 0 ?
                        {}
                        :
                            { "op": ops.length === 1 ? ops[0] : compose_1.compose.apply(void 0, __spreadArray([], __read(ops))) };
                };
                if (canBeOperator(inputs[0])) {
                    //[ ...op[] ]
                    return id_1.id(__assign(__assign({}, defaultParams), getOpWrap(inputs)));
                }
                else {
                    //[]
                    //[ ctx, ...Operator.fλ[] ]
                    var _a = __read(inputs), ctx = _a[0], rest = _a.slice(1);
                    return id_1.id(__assign(__assign(__assign({}, defaultParams), (ctx !== undefined ? { ctx: ctx } : {})), getOpWrap(rest)));
                }
            }
            break;
        case "waitFor":
            {
                //[ op, ctx, timeout ]
                //[ op, ctx, undefined ]
                //[ op, ctx ]
                //[ op, timeout ]
                //[ op, undefined ]
                //[ ctx, timeout ]
                //[ ctx, undefined ]
                //[ op ]
                //[ ctx ]
                //[ timeout ]
                //[ undefined ]
                //[ callback ]
                return parsePropsFromArgs(__spreadArray(__spreadArray([], __read(inputs.filter(function (value, index) { return !(index === inputs.length - 1 &&
                    value === undefined); }))), [
                    defaultParams.callback
                ]), "attach*");
            }
            break;
        case "attach*":
            {
                //NOTE: when callback is undefined call has been forward from waitFor.
                //[ op, ctx, timeout, callback ]
                //[ op, ctx, timeout, undefined ]
                //[ op, ctx, callback ]
                //[ op, ctx, undefined ]
                //[ op, timeout, callback ]
                //[ op, timeout, undefined ]
                //[ ctx, timeout, callback ]
                //[ ctx, timeout, undefined ]
                //[ op, callback ]
                //[ op, undefined ]
                //[ ctx, callback ]
                //[ ctx, undefined ]
                //[ timeout, callback ]
                //[ timeout, undefined ]
                //[ callback ]
                //[ undefined ]
                var n = inputs.length;
                switch (n) {
                    case 4: {
                        //[ op, ctx, timeout, callback ]
                        var _b = __read(inputs, 4), p1 = _b[0], p2 = _b[1], p3 = _b[2], p4 = _b[3];
                        return id_1.id(__assign(__assign({}, defaultParams), { "op": p1, "ctx": p2, "timeout": p3, "callback": p4 }));
                    }
                    case 3: {
                        //[ op, ctx, callback ]
                        //[ op, timeout, callback ]
                        //[ ctx, timeout, callback ]
                        var _c = __read(inputs, 3), p1 = _c[0], p2 = _c[1], p3 = _c[2];
                        if (typeof p2 === "number") {
                            //[ op, timeout, callback ]
                            //[ ctx, timeout, callback ]
                            var timeout = p2;
                            var callback = p3;
                            if (canBeOperator(p1)) {
                                //[ op, timeout, callback ]
                                return id_1.id(__assign(__assign({}, defaultParams), { timeout: timeout,
                                    callback: callback, "op": p1 }));
                            }
                            else {
                                //[ ctx, timeout, callback ]
                                return id_1.id(__assign(__assign({}, defaultParams), { timeout: timeout,
                                    callback: callback, "ctx": p1 }));
                            }
                        }
                        else {
                            //[ op, ctx, callback ]
                            return id_1.id(__assign(__assign({}, defaultParams), { "op": p1, "ctx": p2, "callback": p3 }));
                        }
                    }
                    case 2: {
                        //[ op, callback ]
                        //[ ctx, callback ]
                        //[ timeout, callback ]
                        var _d = __read(inputs, 2), p1 = _d[0], p2 = _d[1];
                        if (typeof p1 === "number") {
                            //[ timeout, callback ]
                            return id_1.id(__assign(__assign({}, defaultParams), { "timeout": p1, "callback": p2 }));
                        }
                        else {
                            //[ op, callback ]
                            //[ ctx, callback ]
                            var callback = p2;
                            if (canBeOperator(p1)) {
                                return id_1.id(__assign(__assign({}, defaultParams), { callback: callback, "op": p1 }));
                            }
                            else {
                                return id_1.id(__assign(__assign({}, defaultParams), { callback: callback, "ctx": p1 }));
                            }
                        }
                    }
                    case 1: {
                        //[ callback ]
                        var _e = __read(inputs, 1), p = _e[0];
                        return id_1.id(__assign(__assign({}, defaultParams), { "callback": p }));
                    }
                    case 0: {
                        return id_1.id(__assign({}, defaultParams));
                    }
                }
            }
            break;
    }
}
exports.parsePropsFromArgs = parsePropsFromArgs;

},{"./util/compose":27,"tsafe/id":44,"tsafe/typeGuard":48}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyEvt = void 0;
var overwriteReadonlyProp_1 = require("tsafe/lab/overwriteReadonlyProp");
var importProxy_1 = require("./importProxy");
var LazyEvt = /** @class */ (function () {
    function LazyEvt() {
        this.initialPostCount = 0;
    }
    Object.defineProperty(LazyEvt.prototype, "evt", {
        get: function () {
            if (this.__evt === undefined) {
                this.__evt = new importProxy_1.importProxy.Evt();
                overwriteReadonlyProp_1.overwriteReadonlyProp(this.__evt, "postCount", this.initialPostCount);
            }
            return this.__evt;
        },
        enumerable: false,
        configurable: true
    });
    LazyEvt.prototype.__post = function (data, doWait) {
        if (this.__evt === undefined) {
            return ++this.initialPostCount;
        }
        return this.__evt[doWait ? "postAndWait" : "post"](data);
    };
    LazyEvt.prototype.post = function (data) {
        return this.__post(data, false);
    };
    LazyEvt.prototype.postAndWait = function (data) {
        return this.__post(data, true);
    };
    return LazyEvt;
}());
exports.LazyEvt = LazyEvt;

},{"./importProxy":17,"tsafe/lab/overwriteReadonlyProp":47}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyStatefulEvt = void 0;
var overwriteReadonlyProp_1 = require("tsafe/lab/overwriteReadonlyProp");
var importProxy_1 = require("./importProxy");
var LazyStatefulEvt = /** @class */ (function () {
    function LazyStatefulEvt(initialState) {
        this.initialPostCount = 0;
        this.initialState = initialState;
    }
    Object.defineProperty(LazyStatefulEvt.prototype, "evt", {
        get: function () {
            if (this.__evt === undefined) {
                this.__evt = new importProxy_1.importProxy.StatefulEvt(this.initialState);
                //NOTE: For avoid keeping strong reference
                this.initialState = null;
                overwriteReadonlyProp_1.overwriteReadonlyProp(this.__evt, "postCount", this.initialPostCount);
            }
            return this.__evt;
        },
        enumerable: false,
        configurable: true
    });
    LazyStatefulEvt.prototype.__post = function (data, doWait) {
        if (this.__evt === undefined) {
            this.initialState = data;
            return ++this.initialPostCount;
        }
        return this.__evt[doWait ? "postAndWait" : "post"](data);
    };
    LazyStatefulEvt.prototype.post = function (data) {
        return this.__post(data, false);
    };
    LazyStatefulEvt.prototype.postAndWait = function (data) {
        return this.__post(data, true);
    };
    return LazyStatefulEvt;
}());
exports.LazyStatefulEvt = LazyStatefulEvt;

},{"./importProxy":17,"tsafe/lab/overwriteReadonlyProp":47}],16:[function(require,module,exports){
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
exports.StatefulEvt = void 0;
require("minimal-polyfills/Object.is");
var LazyEvt_1 = require("./LazyEvt");
var LazyStatefulEvt_1 = require("./LazyStatefulEvt");
var importProxy_1 = require("./importProxy");
var Evt_parsePropsFromArgs_1 = require("./Evt.parsePropsFromArgs");
var Evt_2 = require("./Evt");
var runSideEffect = function (sideEffect) { return sideEffect(); };
var StatefulEvtImpl = /** @class */ (function (_super) {
    __extends(StatefulEvtImpl, _super);
    function StatefulEvtImpl(initialState) {
        var _this_1 = _super.call(this) || this;
        _this_1.lazyEvtDiff = new LazyEvt_1.LazyEvt();
        _this_1.lazyEvtChangeDiff = new LazyEvt_1.LazyEvt();
        _this_1.__state = initialState;
        _this_1.lazyEvtChange = new LazyStatefulEvt_1.LazyStatefulEvt(_this_1.__state);
        Evt_2.onAddHandlerByEvt.set(_this_1, function (handler, handlerTrigger) {
            var opResult = _this_1.getInvocableOp(handler.op)(_this_1.__state, runSideEffect);
            if (!opResult) {
                return;
            }
            handlerTrigger(opResult);
        });
        return _this_1;
    }
    Object.defineProperty(StatefulEvtImpl.prototype, "state", {
        get: function () { return this.__state; },
        set: function (value) {
            if (this.state === value)
                return;
            this.post(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StatefulEvtImpl.prototype, "evtDiff", {
        get: function () { return this.lazyEvtDiff.evt; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StatefulEvtImpl.prototype, "evtChange", {
        get: function () { return this.lazyEvtChange.evt; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StatefulEvtImpl.prototype, "evtChangeDiff", {
        get: function () { return this.lazyEvtChangeDiff.evt; },
        enumerable: false,
        configurable: true
    });
    StatefulEvtImpl.prototype.post = function (data) {
        return this.__post(data, false, false);
    };
    StatefulEvtImpl.prototype.postForceChange = function (wData) {
        return this.__post(!!wData ? wData[0] : this.state, true, false);
    };
    StatefulEvtImpl.prototype.postAndWait = function (data) {
        return this.__post(data, false, true);
    };
    StatefulEvtImpl.prototype.__post = function (data, forceChange, doWait) {
        var prevState = this.state;
        this.__state = data;
        var diff = { prevState: prevState, "newState": this.state };
        var postVariantName = doWait ? "postAndWait" : "post";
        var prs = [];
        var r1 = this.lazyEvtDiff[postVariantName](diff);
        if (doWait) {
            prs.push(r1);
        }
        if (forceChange || !Object.is(prevState, this.state)) {
            var r2 = this.lazyEvtChange[postVariantName](this.state);
            var r3 = this.lazyEvtChangeDiff[postVariantName](diff);
            if (doWait) {
                prs.push(r2, r3);
            }
        }
        var r4 = _super.prototype[postVariantName].call(this, data);
        return doWait ?
            (prs.push(r4), Promise.all(prs).then(function () { })) :
            r4;
    };
    StatefulEvtImpl.prototype.pipe = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var evt = _super.prototype.pipe.apply(this, __spreadArray([], __read(args)));
        var opResult = this.getInvocableOp(Evt_parsePropsFromArgs_1.parsePropsFromArgs(args, "pipe").op)(this.__state, runSideEffect);
        if (!opResult) {
            throw new Error([
                "Cannot pipe StatefulEvt because the operator does not match",
                "it's current state. You would end up with evt.state === undefined",
                "Use evt.toStateless([ctx]).pipe(op).toStatic(initialState)",
                "to be sure the StatefulEvt does not have an undefined state"
            ].join(" "));
        }
        return evt.toStateful(opResult[0]);
    };
    StatefulEvtImpl.prototype.toStateless = function (ctx) {
        return !!ctx ? _super.prototype.pipe.call(this, ctx) : _super.prototype.pipe.call(this);
    };
    return StatefulEvtImpl;
}(Evt_2.Evt));
exports.StatefulEvt = StatefulEvtImpl;
importProxy_1.importProxy.StatefulEvt = exports.StatefulEvt;

},{"./Evt":9,"./Evt.parsePropsFromArgs":13,"./LazyEvt":14,"./LazyStatefulEvt":15,"./importProxy":17,"minimal-polyfills/Object.is":39}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importProxy = void 0;
/** Manually handling circular import so React Native does not gives warning. */
exports.importProxy = {};

},{}],18:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatefulEvt = exports.Evt = exports.Ctx = void 0;
__exportStar(require("./types"), exports);
__exportStar(require("./util"), exports);
var Ctx_1 = require("./Ctx");
Object.defineProperty(exports, "Ctx", { enumerable: true, get: function () { return Ctx_1.Ctx; } });
var Evt_2 = require("./Evt");
Object.defineProperty(exports, "Evt", { enumerable: true, get: function () { return Evt_2.Evt; } });
var StatefulEvt_1 = require("./StatefulEvt");
Object.defineProperty(exports, "StatefulEvt", { enumerable: true, get: function () { return StatefulEvt_1.StatefulEvt; } });

},{"./Ctx":1,"./Evt":9,"./StatefulEvt":16,"./types":23,"./util":34}],19:[function(require,module,exports){
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

},{"tsafe/typeGuard":48}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],23:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dom = void 0;
__exportStar(require("./helper"), exports);
__exportStar(require("./interfaces"), exports);
exports.dom = require("./lib.dom");
//NOTE: For support of --no-check, see: https://github.com/asos-craigmorten/opine/issues/97#issuecomment-751806014
__exportStar(require("./EventTargetLike"), exports);
__exportStar(require("./EvtError"), exports);
__exportStar(require("./Operator"), exports);

},{"./EventTargetLike":19,"./EvtError":20,"./Operator":21,"./helper":22,"./interfaces":25,"./lib.dom":26}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CtxLike = void 0;
var typeGuard_1 = require("tsafe/typeGuard");
var CtxLike;
(function (CtxLike) {
    function match(o) {
        return (typeGuard_1.typeGuard(o, true) &&
            o instanceof Object &&
            typeof o.done === "function" &&
            typeof o.abort === "function" &&
            typeof o.zz__addHandler === "function" &&
            typeof o.zz__removeHandler === "function");
    }
    CtxLike.match = match;
})(CtxLike = exports.CtxLike || (exports.CtxLike = {}));

},{"tsafe/typeGuard":48}],25:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./CtxLike"), exports);

},{"./CtxLike":24}],26:[function(require,module,exports){
"use strict";
/*
This is a curated re export of the dom API definitions.

The DOM definitions are available only when "compilerOptions": { "lib": ["DOM"] }}
is present in the tsconfig.json.

We need we re-export those definitions so that we can expose methods that interact with
the DOM ( ex Evt.from ) while not producing type error when
EVT is imported in project that does not use 'lib DOM', typically
projects that targets Node.JS.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.__hack = void 0;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
exports.__hack = "NOT TYPE ONLY";

},{}],27:[function(require,module,exports){
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
exports.compose = void 0;
var convertOperatorToStatelessFLambda_1 = require("./convertOperatorToStatelessFLambda");
var id_1 = require("tsafe/id");
function f_o_g(op1, op2) {
    var opAtoB = convertOperatorToStatelessFLambda_1.convertOperatorToStatelessFλ(op1);
    var opBtoC = convertOperatorToStatelessFLambda_1.convertOperatorToStatelessFλ(op2);
    return id_1.id(function (dataA, registerSideEffect) {
        var resultB = opAtoB(dataA, registerSideEffect);
        if (!resultB) {
            return null;
        }
        var _a = __read(resultB, 1), dataB = _a[0];
        var resultC = opBtoC(dataB, registerSideEffect);
        if (!resultC) {
            return resultC;
        }
        return [resultC[0]];
    });
}
function compose() {
    var ops = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ops[_i] = arguments[_i];
    }
    if (ops.length === 1) {
        var _a = __read(ops, 1), op = _a[0];
        return convertOperatorToStatelessFLambda_1.convertOperatorToStatelessFλ(op);
    }
    var _b = __read(ops), op1 = _b[0], op2 = _b[1], rest = _b.slice(2);
    var op1_o_op2 = f_o_g(op1, op2);
    if (rest.length === 0) {
        return op1_o_op2;
    }
    return compose.apply(void 0, __spreadArray([op1_o_op2], __read(rest)));
}
exports.compose = compose;

},{"./convertOperatorToStatelessFLambda":28,"tsafe/id":44}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertOperatorToStatelessFλ = void 0;
function encapsulateOpState(statefulFλOp) {
    var state = statefulFλOp[1];
    return function (data, registerSideEffect) {
        var opResult = statefulFλOp[0](data, state, registerSideEffect);
        if (opResult !== null) {
            registerSideEffect(function () { return state = opResult[0]; });
        }
        return opResult;
    };
}
function statelessOpToStatelessFλ(op) {
    return function (data, registerSideEffect) {
        /* NOTE: Here, if the user is using TypeScript we should have readonly [U] or boolean
         * but users using vanilla JS can very well provide operators like: text => text.match(/^error/)
         * and expect things to work event if String.prototype.match returns a RegExpMatch array instead
         * of boolean.
         * Long story short we do our best to guess what the user meant with he's operator, if it was
         * intended to be a filter or a fλ.
         */
        var opResult = op(data, registerSideEffect);
        return (opResult instanceof Object &&
            !("input" in opResult) && //exclude String.prototype.match
            opResult.length === 1) ?
            opResult
            :
                !!opResult ? [data] : null;
    };
}
;
function convertOperatorToStatelessFλ(op) {
    return typeof op !== "function" ?
        encapsulateOpState(op) :
        statelessOpToStatelessFλ(op);
}
exports.convertOperatorToStatelessFλ = convertOperatorToStatelessFλ;

},{}],29:[function(require,module,exports){
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
exports.distinct = void 0;
var compose_1 = require("../compose");
var distinct = function (keySelector, ctxFlush) {
    var _a;
    return compose_1.compose(function (data) {
        var _a, _b;
        return [{
                data: data,
                "selectedKey": (_a = keySelector === null || keySelector === void 0 ? void 0 : keySelector(data)) !== null && _a !== void 0 ? _a : data,
                "currentFlushCount": (_b = ctxFlush === null || ctxFlush === void 0 ? void 0 : ctxFlush.evtDoneOrAborted.postCount) !== null && _b !== void 0 ? _b : 0
            }];
    }, [
        function (_a, _b) {
            var data = _a.data, selectedKey = _a.selectedKey, currentFlushCount = _a.currentFlushCount;
            var alreadyPostedData = _b.alreadyPostedData, previousFlushCount = _b.previousFlushCount;
            return [{
                    "boxedData": (currentFlushCount !== previousFlushCount ||
                        !alreadyPostedData.has(selectedKey)) ? [data] : null,
                    "alreadyPostedData": new Set(__spreadArray(__spreadArray([], __read((currentFlushCount !== previousFlushCount ?
                        [] : Array.from(alreadyPostedData)))), [
                        selectedKey
                    ])),
                    "previousFlushCount": currentFlushCount
                }];
        },
        {
            "boxedData": null,
            "alreadyPostedData": new Set(),
            "previousFlushCount": (_a = ctxFlush === null || ctxFlush === void 0 ? void 0 : ctxFlush.evtDoneOrAborted.postCount) !== null && _a !== void 0 ? _a : 0
        }
    ], function (_a) {
        var boxedData = _a.boxedData;
        return boxedData;
    });
};
exports.distinct = distinct;

},{"../compose":27}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distinct = exports.nonNullable = exports.to = exports.throttleTime = void 0;
var throttleTime_1 = require("./throttleTime");
Object.defineProperty(exports, "throttleTime", { enumerable: true, get: function () { return throttleTime_1.throttleTime; } });
var to_1 = require("./to");
Object.defineProperty(exports, "to", { enumerable: true, get: function () { return to_1.to; } });
var nonNullable_1 = require("./nonNullable");
Object.defineProperty(exports, "nonNullable", { enumerable: true, get: function () { return nonNullable_1.nonNullable; } });
var distinct_1 = require("./distinct");
Object.defineProperty(exports, "distinct", { enumerable: true, get: function () { return distinct_1.distinct; } });

},{"./distinct":29,"./nonNullable":31,"./throttleTime":32,"./to":33}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonNullable = void 0;
var isNonNullable = function (arg) {
    return arg !== undefined && arg !== null;
};
var nonNullableImpl = function (data) {
    return !isNonNullable(data) ? null : [data];
};
var nonNullable = function () {
    return nonNullableImpl;
};
exports.nonNullable = nonNullable;

},{}],32:[function(require,module,exports){
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

},{"../compose":27}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose = void 0;
__exportStar(require("./genericOperators"), exports);
var compose_1 = require("./compose");
Object.defineProperty(exports, "compose", { enumerable: true, get: function () { return compose_1.compose; } });

},{"./compose":27,"./genericOperators":30}],35:[function(require,module,exports){
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
exports.VoidDeferred = exports.Deferred = void 0;
var overwriteReadonlyProp_1 = require("tsafe/lab/overwriteReadonlyProp");
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this_1 = this;
        this.isPending = true;
        var resolve;
        var reject;
        this.pr = new Promise(function (resolve_, reject_) {
            resolve = function (value) {
                overwriteReadonlyProp_1.overwriteReadonlyProp(_this_1, "isPending", false);
                resolve_(value);
            };
            reject = function (error) {
                overwriteReadonlyProp_1.overwriteReadonlyProp(_this_1, "isPending", false);
                reject_(error);
            };
        });
        this.resolve = resolve;
        this.reject = reject;
    }
    return Deferred;
}());
exports.Deferred = Deferred;
var VoidDeferred = /** @class */ (function (_super) {
    __extends(VoidDeferred, _super);
    function VoidDeferred() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VoidDeferred;
}(Deferred));
exports.VoidDeferred = VoidDeferred;

},{"tsafe/lab/overwriteReadonlyProp":47}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeClearTimeout = exports.safeSetTimeout = void 0;
var safeSetTimeout = function (callback, ms) { return setTimeout(callback, ms); };
exports.safeSetTimeout = safeSetTimeout;
var safeClearTimeout = function (timer) { return clearTimeout(timer); };
exports.safeClearTimeout = safeClearTimeout;

},{}],37:[function(require,module,exports){
"use strict";
exports.__esModule = true;
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;
            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];
            // 5. Let k be 0.
            var k = 0;
            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }
            // 7. Return undefined.
            return undefined;
        },
        configurable: true,
        writable: true
    });
}

},{}],38:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Polyfill = exports.LightMapImpl = void 0;
var LightMapImpl = /** @class */ (function () {
    function LightMapImpl() {
        this.record = [];
    }
    LightMapImpl.prototype.has = function (key) {
        return this.record
            .map(function (_a) {
            var _key = _a[0];
            return _key;
        })
            .indexOf(key) >= 0;
    };
    LightMapImpl.prototype.get = function (key) {
        var entry = this.record
            .filter(function (_a) {
            var _key = _a[0];
            return _key === key;
        })[0];
        if (entry === undefined) {
            return undefined;
        }
        return entry[1];
    };
    LightMapImpl.prototype.set = function (key, value) {
        var entry = this.record
            .filter(function (_a) {
            var _key = _a[0];
            return _key === key;
        })[0];
        if (entry === undefined) {
            this.record.push([key, value]);
        }
        else {
            entry[1] = value;
        }
        return this;
    };
    LightMapImpl.prototype["delete"] = function (key) {
        var index = this.record.map(function (_a) {
            var key = _a[0];
            return key;
        }).indexOf(key);
        if (index < 0) {
            return false;
        }
        this.record.splice(index, 1);
        return true;
    };
    LightMapImpl.prototype.keys = function () {
        return this.record.map(function (_a) {
            var key = _a[0];
            return key;
        });
    };
    return LightMapImpl;
}());
exports.LightMapImpl = LightMapImpl;
exports.Polyfill = typeof Map !== "undefined" ? Map : LightMapImpl;

},{}],39:[function(require,module,exports){
"use strict";
exports.__esModule = true;
if (!Object.is) {
    Object.is = function (x, y) {
        // SameValue algorithm
        if (x === y) { // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return x !== 0 || 1 / x === 1 / y;
        }
        else {
            // Step 6.a: NaN == NaN
            return x !== x && y !== y;
        }
    };
}

},{}],40:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Polyfill = exports.LightSetImpl = void 0;
var Map_1 = require("./Map");
var LightSetImpl = /** @class */ (function () {
    function LightSetImpl(values) {
        this.map = new Map_1.Polyfill();
        if (values === undefined) {
            return;
        }
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            this.add(value);
        }
    }
    LightSetImpl.prototype.has = function (value) {
        return this.map.has(value);
    };
    LightSetImpl.prototype.add = function (value) {
        this.map.set(value, true);
        return this;
    };
    LightSetImpl.prototype.values = function () {
        return this.map.keys();
    };
    LightSetImpl.prototype["delete"] = function (value) {
        return this.map["delete"](value);
    };
    return LightSetImpl;
}());
exports.LightSetImpl = LightSetImpl;
exports.Polyfill = typeof Set !== "undefined" ? Set : LightSetImpl;

},{"./Map":38}],41:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Polyfill = void 0;
var Map_1 = require("./Map");
exports.Polyfill = typeof WeakMap !== "undefined" ? WeakMap : Map_1.Polyfill;

},{"./Map":38}],42:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.buildMethodCb = exports.buildCb = exports.getPrComplete = exports.isRunning = exports.cancelAllQueuedCalls = exports.getQueuedCallCount = exports.buildMethod = exports.build = exports.createGroupRef = void 0;
var WeakMap_1 = require("minimal-polyfills/WeakMap");
var ExecQueue = /** @class */ (function () {
    function ExecQueue() {
        this.queuedCalls = [];
        this.isRunning = false;
        this.prComplete = Promise.resolve();
    }
    //TODO: move where it is used.
    ExecQueue.prototype.cancelAllQueuedCalls = function () {
        var n;
        this.queuedCalls.splice(0, n = this.queuedCalls.length);
        return n;
    };
    return ExecQueue;
}());
var globalContext = {};
var clusters = new WeakMap_1.Polyfill();
//console.log("Map version");
//export const clusters = new Map<Object, Map<GroupRef,ExecQueue>>();
function getOrCreateExecQueue(context, groupRef) {
    var execQueueByGroup = clusters.get(context);
    if (!execQueueByGroup) {
        execQueueByGroup = new WeakMap_1.Polyfill();
        clusters.set(context, execQueueByGroup);
    }
    var execQueue = execQueueByGroup.get(groupRef);
    if (!execQueue) {
        execQueue = new ExecQueue();
        execQueueByGroup.set(groupRef, execQueue);
    }
    return execQueue;
}
function createGroupRef() {
    return new Array(0);
}
exports.createGroupRef = createGroupRef;
function build() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    switch (inputs.length) {
        case 1: return buildFnPromise(true, createGroupRef(), inputs[0]);
        case 2: return buildFnPromise(true, inputs[0], inputs[1]);
    }
}
exports.build = build;
function buildMethod() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    switch (inputs.length) {
        case 1: return buildFnPromise(false, createGroupRef(), inputs[0]);
        case 2: return buildFnPromise(false, inputs[0], inputs[1]);
    }
}
exports.buildMethod = buildMethod;
/**
 *
 * Get the number of queued call of a run-exclusive function.
 * Note that if you call a runExclusive function and call this
 * directly after it will return 0 as there is one function call
 * execution ongoing but 0 queued.
 *
 * The classInstanceObject parameter is to provide only for the run-exclusive
 * function created with 'buildMethod[Cb].
 *
 * */
function getQueuedCallCount(runExclusiveFunction, classInstanceObject) {
    var execQueue = getExecQueueByFunctionAndContext(runExclusiveFunction, classInstanceObject);
    return execQueue ? execQueue.queuedCalls.length : 0;
}
exports.getQueuedCallCount = getQueuedCallCount;
/**
 *
 * Cancel all queued calls of a run-exclusive function.
 * Note that the current running call will not be cancelled.
 *
 * The classInstanceObject parameter is to provide only for the run-exclusive
 * function created with 'buildMethod[Cb].
 *
 */
function cancelAllQueuedCalls(runExclusiveFunction, classInstanceObject) {
    var execQueue = getExecQueueByFunctionAndContext(runExclusiveFunction, classInstanceObject);
    return execQueue ? execQueue.cancelAllQueuedCalls() : 0;
}
exports.cancelAllQueuedCalls = cancelAllQueuedCalls;
/**
 * Tell if a run-exclusive function has an instance of it's call currently being
 * performed.
 *
 * The classInstanceObject parameter is to provide only for the run-exclusive
 * function created with 'buildMethod[Cb].
 */
function isRunning(runExclusiveFunction, classInstanceObject) {
    var execQueue = getExecQueueByFunctionAndContext(runExclusiveFunction, classInstanceObject);
    return execQueue ? execQueue.isRunning : false;
}
exports.isRunning = isRunning;
/**
 * Return a promise that resolve when all the current queued call of a runExclusive functions
 * have completed.
 *
 * The classInstanceObject parameter is to provide only for the run-exclusive
 * function created with 'buildMethod[Cb].
 */
function getPrComplete(runExclusiveFunction, classInstanceObject) {
    var execQueue = getExecQueueByFunctionAndContext(runExclusiveFunction, classInstanceObject);
    return execQueue ? execQueue.prComplete : Promise.resolve();
}
exports.getPrComplete = getPrComplete;
var groupByRunExclusiveFunction = new WeakMap_1.Polyfill();
function getExecQueueByFunctionAndContext(runExclusiveFunction, context) {
    if (context === void 0) { context = globalContext; }
    var groupRef = groupByRunExclusiveFunction.get(runExclusiveFunction);
    if (!groupRef) {
        throw Error("Not a run exclusiveFunction");
    }
    var execQueueByGroup = clusters.get(context);
    if (!execQueueByGroup) {
        return undefined;
    }
    return execQueueByGroup.get(groupRef);
}
function buildFnPromise(isGlobal, groupRef, fun) {
    var execQueue;
    var runExclusiveFunction = (function () {
        var _this = this;
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        if (!isGlobal) {
            if (!(this instanceof Object)) {
                throw new Error("Run exclusive, <this> should be an object");
            }
            execQueue = getOrCreateExecQueue(this, groupRef);
        }
        return new Promise(function (resolve, reject) {
            var onPrCompleteResolve;
            execQueue.prComplete = new Promise(function (resolve) {
                return onPrCompleteResolve = function () { return resolve(); };
            });
            var onComplete = function (result) {
                onPrCompleteResolve();
                execQueue.isRunning = false;
                if (execQueue.queuedCalls.length) {
                    execQueue.queuedCalls.shift()();
                }
                if ("data" in result) {
                    resolve(result.data);
                }
                else {
                    reject(result.reason);
                }
            };
            (function callee() {
                var _this = this;
                var inputs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    inputs[_i] = arguments[_i];
                }
                if (execQueue.isRunning) {
                    execQueue.queuedCalls.push(function () { return callee.apply(_this, inputs); });
                    return;
                }
                execQueue.isRunning = true;
                try {
                    fun.apply(this, inputs)
                        .then(function (data) { return onComplete({ data: data }); })["catch"](function (reason) { return onComplete({ reason: reason }); });
                }
                catch (error) {
                    onComplete({ "reason": error });
                }
            }).apply(_this, inputs);
        });
    });
    if (isGlobal) {
        execQueue = getOrCreateExecQueue(globalContext, groupRef);
    }
    groupByRunExclusiveFunction.set(runExclusiveFunction, groupRef);
    return runExclusiveFunction;
}
function buildCb() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    switch (inputs.length) {
        case 1: return buildFnCallback(true, createGroupRef(), inputs[0]);
        case 2: return buildFnCallback(true, inputs[0], inputs[1]);
    }
}
exports.buildCb = buildCb;
function buildMethodCb() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    switch (inputs.length) {
        case 1: return buildFnCallback(false, createGroupRef(), inputs[0]);
        case 2: return buildFnCallback(false, inputs[0], inputs[1]);
    }
}
exports.buildMethodCb = buildMethodCb;
function buildFnCallback(isGlobal, groupRef, fun) {
    var execQueue;
    var runExclusiveFunction = (function () {
        var _this = this;
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        if (!isGlobal) {
            if (!(this instanceof Object)) {
                throw new Error("Run exclusive, <this> should be an object");
            }
            execQueue = getOrCreateExecQueue(this, groupRef);
        }
        var callback = undefined;
        if (inputs.length && typeof inputs[inputs.length - 1] === "function") {
            callback = inputs.pop();
        }
        var onPrCompleteResolve;
        execQueue.prComplete = new Promise(function (resolve) {
            return onPrCompleteResolve = function () { return resolve(); };
        });
        var onComplete = function () {
            var inputs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                inputs[_i] = arguments[_i];
            }
            onPrCompleteResolve();
            execQueue.isRunning = false;
            if (execQueue.queuedCalls.length) {
                execQueue.queuedCalls.shift()();
            }
            if (callback) {
                callback.apply(_this, inputs);
            }
        };
        onComplete.hasCallback = !!callback;
        (function callee() {
            var _this = this;
            var inputs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                inputs[_i] = arguments[_i];
            }
            if (execQueue.isRunning) {
                execQueue.queuedCalls.push(function () { return callee.apply(_this, inputs); });
                return;
            }
            execQueue.isRunning = true;
            try {
                fun.apply(this, __spreadArrays(inputs, [onComplete]));
            }
            catch (error) {
                error.message += " ( This exception should not have been thrown, miss use of run-exclusive buildCb )";
                throw error;
            }
        }).apply(this, inputs);
    });
    if (isGlobal) {
        execQueue = getOrCreateExecQueue(globalContext, groupRef);
    }
    groupByRunExclusiveFunction.set(runExclusiveFunction, groupRef);
    return runExclusiveFunction;
}

},{"minimal-polyfills/WeakMap":41}],43:[function(require,module,exports){
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
exports.assert = exports.AssertionError = void 0;
var overwriteReadonlyProp_1 = require("./lab/overwriteReadonlyProp");
var assertIsRefWrapper_1 = require("./zz_internal/assertIsRefWrapper");
/** @see <https://docs.tsafe.dev/assert#error-thrown> */
var AssertionError = /** @class */ (function (_super) {
    __extends(AssertionError, _super);
    function AssertionError(msg) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, "Wrong assertion encountered" + (!msg ? "" : ": \"" + msg + "\"")) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        if (!_this.stack) {
            return _this;
        }
        try {
            overwriteReadonlyProp_1.overwriteReadonlyProp(_this, "stack", _this.stack
                .split("\n")
                .filter(function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var _b = __read(_a, 2), i = _b[1];
                return i !== 1 && i !== 2;
            })
                .join("\n"));
            // eslint-disable-next-line no-empty
        }
        catch (_a) { }
        return _this;
    }
    return AssertionError;
}(Error));
exports.AssertionError = AssertionError;
/** https://docs.tsafe.dev/assert */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function assert(condition, msg) {
    if (assertIsRefWrapper_1.assertIsRefWrapper.ref !== undefined) {
        assertIsRefWrapper_1.assertIsRefWrapper.ref = undefined;
        return;
    }
    if (!condition) {
        throw new AssertionError(msg);
    }
}
exports.assert = assert;

},{"./lab/overwriteReadonlyProp":47,"./zz_internal/assertIsRefWrapper":49}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = void 0;
/** https://docs.tsafe.dev/id  */
var id = function (x) { return x; };
exports.id = id;

},{}],45:[function(require,module,exports){
"use strict";
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.is = void 0;
var assertIsRefWrapper_1 = require("./zz_internal/assertIsRefWrapper");
var errorMessage = [
    "Wrong usage of the " + is.name + " function refer to",
    "https://docs.tsafe.dev/" + is.name.toLowerCase(),
].join(" ");
function is(_value) {
    var ref = {};
    if (assertIsRefWrapper_1.assertIsRefWrapper.ref !== undefined) {
        assertIsRefWrapper_1.assertIsRefWrapper.ref = undefined;
        throw new Error(errorMessage);
    }
    assertIsRefWrapper_1.assertIsRefWrapper.ref = ref;
    Promise.resolve().then(function () {
        if (assertIsRefWrapper_1.assertIsRefWrapper.ref === ref) {
            throw new Error(errorMessage);
        }
    });
    return null;
}
exports.is = is;

},{"./zz_internal/assertIsRefWrapper":49}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPromiseLike = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isPromiseLike(o) {
    return typeof (o === null || o === void 0 ? void 0 : o.then) === "function";
}
exports.isPromiseLike = isPromiseLike;

},{}],47:[function(require,module,exports){
"use strict";
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.overwriteReadonlyProp = void 0;
/**
 * Assign a value to a property even if the object is freezed or if the property is not writable
 * Throw if the assignation fail ( for example if the property is non configurable write: false )
 * */
var overwriteReadonlyProp = function (obj, propertyName, value) {
    try {
        obj[propertyName] = value;
    }
    catch (_a) { }
    if (obj[propertyName] === value) {
        return value;
    }
    var errorDefineProperty = undefined;
    var propertyDescriptor = Object.getOwnPropertyDescriptor(obj, propertyName) || {
        "enumerable": true,
        "configurable": true,
    };
    if (!!propertyDescriptor.get) {
        throw new Error("Probably a wrong ides to overwrite " + propertyName + " getter");
    }
    try {
        Object.defineProperty(obj, propertyName, __assign(__assign({}, propertyDescriptor), { value: value }));
    }
    catch (error) {
        errorDefineProperty = error;
    }
    if (obj[propertyName] !== value) {
        throw errorDefineProperty || new Error("Can't assign");
    }
    return value;
};
exports.overwriteReadonlyProp = overwriteReadonlyProp;

},{}],48:[function(require,module,exports){
"use strict";
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeGuard = void 0;
/** https://docs.tsafe.dev/typeguard */
function typeGuard(_value, isMatched) {
    return isMatched;
}
exports.typeGuard = typeGuard;

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertIsRefWrapper = void 0;
var id_1 = require("../id");
exports.assertIsRefWrapper = {
    "ref": id_1.id(undefined),
};

},{"../id":44}]},{},[18])(18)
});
//# sourceMappingURL=bundle.js.map
