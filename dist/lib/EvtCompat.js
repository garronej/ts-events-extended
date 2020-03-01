"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.__esModule = true;
var EvtBase_2 = require("./EvtBase");
var EvtBaseProtected_1 = require("./EvtBaseProtected");
var HandlerGroup = /** @class */ (function (_super) {
    __extends(HandlerGroup, _super);
    function HandlerGroup() {
        var _this_1 = _super.call(this) || this;
        var evtDetached = new EvtCompat();
        _this_1.onDetach = function (handlers) { return evtDetached.post(handlers); };
        _this_1.evtDetached = evtDetached;
        return _this_1;
    }
    return HandlerGroup;
}(EvtBaseProtected_1.HandlerGroupBaseProtected));
var EvtCompat = /** @class */ (function (_super) {
    __extends(EvtCompat, _super);
    function EvtCompat() {
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        /** https://garronej.github.io/ts-evt/#evtevtattach */
        _this_1.evtAttach = new EvtBase_2.EvtBase();
        _this_1.evtDetach = new EvtBase_2.EvtBase();
        return _this_1;
    }
    EvtCompat.createHandlerGroup = function () {
        return new HandlerGroup();
    };
    EvtCompat.prototype.addHandler = function (attachParams, implicitAttachParams) {
        var handler = _super.prototype.addHandler.call(this, attachParams, implicitAttachParams);
        this.evtAttach.post(handler);
        return handler;
    };
    EvtCompat.prototype.onHandlerDetached = function (handler) {
        _super.prototype.onHandlerDetached.call(this, handler);
        this.evtDetach.post(handler);
    };
    EvtCompat.prototype.postAsyncOnceHandled = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.__postOnceHandled({ data: data, "isSync": false })];
            });
        });
    };
    EvtCompat.prototype.postSyncOnceHandled = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.__postOnceHandled({ data: data, "isSync": true })];
            });
        });
    };
    EvtCompat.prototype.__postOnceHandled = function (_a) {
        var _this_1 = this;
        var data = _a.data, isSync = _a.isSync;
        if (this.isHandled(data)) {
            return this.post(data);
        }
        var resolvePr;
        var pr = new Promise(function (resolve) { return resolvePr = resolve; });
        var resolvePrAndPost = function (data) { return resolvePr(_this_1.post(data)); };
        this.evtAttach.attachOnce(function (_a) {
            var matcher = _a.matcher;
            return !!_this_1.invokeMatcher(matcher, data);
        }, function () { return isSync ?
            resolvePrAndPost(data) :
            Promise.resolve().then(function () { return resolvePrAndPost(data); }); });
        return pr;
    };
    EvtCompat.prototype.__createDelegate = function (matcher, boundTo) {
        var evtDelegate = new EvtCompat();
        this.$attach(matcher, boundTo, function (transformedData) { return evtDelegate.post(transformedData); });
        return evtDelegate;
    };
    EvtCompat.prototype.createDelegate = function () {
        var _this_1 = this;
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        var _a = this.parseOverloadParams(inputs, "createDelegate"), matcher = _a.matcher, boundTo = _a.boundTo;
        return this.__createDelegate(typeof matcher === "function" ?
            (function (data) { return _this_1.invokeMatcher(matcher, data); })
            :
                matcher, boundTo);
    };
    return EvtCompat;
}(EvtBase_2.EvtBase));
exports.EvtCompat = EvtCompat;
/** https://garronej.github.io/ts-evt/#voidevt */
var VoidEvtCompat = /** @class */ (function (_super) {
    __extends(VoidEvtCompat, _super);
    function VoidEvtCompat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VoidEvtCompat.prototype.post = function () {
        return _super.prototype.post.call(this, undefined);
    };
    VoidEvtCompat.prototype.postAsyncOnceHandled = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _super.prototype.postAsyncOnceHandled.call(this, undefined)];
            });
        });
    };
    VoidEvtCompat.prototype.postSyncOnceHandled = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _super.prototype.postSyncOnceHandled.call(this, undefined)];
            });
        });
    };
    return VoidEvtCompat;
}(EvtCompat));
exports.VoidEvtCompat = VoidEvtCompat;
//# sourceMappingURL=EvtCompat.js.map