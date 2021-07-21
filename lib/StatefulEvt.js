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
//# sourceMappingURL=StatefulEvt.js.map