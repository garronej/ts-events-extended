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
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var id_1 = require("tsafe/id");
var reducers_1 = require("../tools/reducers");
var getPromiseAssertionApi_1 = require("../tools/testing/getPromiseAssertionApi");
var concatUint8Array_1 = require("../tools/concatUint8Array");
//const { mustReject, mustResolve } = getPromiseAssertionApi();
var _a = getPromiseAssertionApi_1.getPromiseAssertionApi({ "takeIntoAccountArraysOrdering": true }), mustResolve = _a.mustResolve, mustReject = _a.mustReject;
//import { Operator } from "../lib/types/Operator";
var MESSAGE_TOO_MUCH_BYTES = "Received to much data";
var MESSAGE_CANCEL = "Download canceled by user";
function downloadFile(_a) {
    var fileSize = _a.fileSize, evtChunk = _a.evtChunk, evtBtnCancelClick = _a.evtBtnCancelClick, evtSocketError = _a.evtSocketError, timeout = _a.timeout;
    var ctxDl = lib_1.Evt.newCtx();
    evtSocketError.attachOnce(ctxDl, function (error) { return ctxDl.abort(error); });
    evtBtnCancelClick.attachOnce(ctxDl, function () { return ctxDl.abort(new Error(MESSAGE_CANCEL)); });
    evtChunk
        .pipe(ctxDl)
        .pipe([
        function (chunk, _a) {
            var byteLength = _a.byteLength, chunks = _a.chunks;
            return [{
                    "byteLength": byteLength + chunk.length,
                    "chunks": __spreadArray(__spreadArray([], __read(chunks)), [chunk])
                }];
        },
        {
            "byteLength": 0,
            "chunks": id_1.id([])
        }
    ])
        .pipe(function (_a) {
        var byteLength = _a.byteLength;
        return byteLength >= fileSize;
    })
        .pipe(function (_a, registerSideEffect) {
        var byteLength = _a.byteLength, chunks = _a.chunks;
        return (byteLength > fileSize ?
            (registerSideEffect(function () { return ctxDl.abort(new Error(MESSAGE_TOO_MUCH_BYTES)); }), null) :
            [chunks]);
    })
        .pipe(function (chunks) { return [concatUint8Array_1.concatUint8Array(chunks, fileSize)]; })
        .attach(function (rawFile) { return ctxDl.done(rawFile); });
    return ctxDl.waitFor(timeout);
}
var evtChunk = new lib_1.Evt();
var evtBtnCancelClick = lib_1.Evt.create();
var evtSocketError = new lib_1.Evt();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                    var prDl;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                prDl = downloadFile({
                                    evtChunk: evtChunk,
                                    evtBtnCancelClick: evtBtnCancelClick,
                                    evtSocketError: evtSocketError,
                                    "fileSize": 9,
                                    "timeout": 100
                                });
                                evtChunk.post(new Uint8Array([1, 2, 3]));
                                evtChunk.post(new Uint8Array([4, 5, 6]));
                                evtChunk.post(new Uint8Array([7, 0, 1]));
                                assert_1.assert((_a = [
                                    evtChunk,
                                    evtBtnCancelClick,
                                    evtSocketError
                                ]).reduce.apply(_a, __spreadArray([], __read(reducers_1.every(function (evt) { return evt.getHandlers().length === 0; })))));
                                return [4 /*yield*/, mustResolve({
                                        "promise": prDl,
                                        "expectedData": new Uint8Array([1, 2, 3, 4, 5, 6, 7, 0, 1])
                                    })];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })()];
            case 1:
                _a.sent();
                return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                        var prDl;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    prDl = downloadFile({
                                        evtChunk: evtChunk,
                                        evtBtnCancelClick: evtBtnCancelClick,
                                        evtSocketError: evtSocketError,
                                        "fileSize": 7,
                                        "timeout": 100
                                    });
                                    evtChunk.post(new Uint8Array([1, 2, 3]));
                                    evtChunk.post(new Uint8Array([4, 5, 6]));
                                    evtChunk.post(new Uint8Array([7, 0, 1]));
                                    assert_1.assert((_a = [
                                        evtChunk,
                                        evtBtnCancelClick,
                                        evtSocketError
                                    ]).reduce.apply(_a, __spreadArray([], __read(reducers_1.every(function (evt) { return evt.getHandlers().length === 0; })))));
                                    return [4 /*yield*/, mustReject({
                                            "promise": prDl.catch(function (error) { throw error.message; }),
                                            "expectedRejectedValue": MESSAGE_TOO_MUCH_BYTES
                                        })];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })()];
            case 2:
                _a.sent();
                return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                        var prDl;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    prDl = downloadFile({
                                        evtChunk: evtChunk,
                                        evtBtnCancelClick: evtBtnCancelClick,
                                        evtSocketError: evtSocketError,
                                        "fileSize": 9,
                                        "timeout": 100
                                    });
                                    evtChunk.post(new Uint8Array([1, 2, 3]));
                                    evtChunk.post(new Uint8Array([4, 5, 6]));
                                    evtBtnCancelClick.post();
                                    assert_1.assert((_a = [
                                        evtChunk,
                                        evtBtnCancelClick,
                                        evtSocketError
                                    ]).reduce.apply(_a, __spreadArray([], __read(reducers_1.every(function (evt) { return evt.getHandlers().length === 0; })))));
                                    return [4 /*yield*/, mustReject({
                                            "promise": prDl.catch(function (error) { throw error.message; }),
                                            "expectedRejectedValue": MESSAGE_CANCEL
                                        })];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })()];
            case 3:
                _a.sent();
                return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                        var prDl, m;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    prDl = downloadFile({
                                        evtChunk: evtChunk,
                                        evtBtnCancelClick: evtBtnCancelClick,
                                        evtSocketError: evtSocketError,
                                        "fileSize": 9,
                                        "timeout": 100
                                    });
                                    evtChunk.post(new Uint8Array([1, 2, 3]));
                                    evtChunk.post(new Uint8Array([4, 5, 6]));
                                    m = "socket error";
                                    evtSocketError.post(new Error(m));
                                    assert_1.assert((_a = [
                                        evtChunk,
                                        evtBtnCancelClick,
                                        evtSocketError
                                    ]).reduce.apply(_a, __spreadArray([], __read(reducers_1.every(function (evt) { return evt.getHandlers().length === 0; })))));
                                    return [4 /*yield*/, mustReject({
                                            "promise": prDl.catch(function (error) { throw error.message; }),
                                            "expectedRejectedValue": m
                                        })];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })()];
            case 4:
                _a.sent();
                return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                        var prDl;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    prDl = downloadFile({
                                        evtChunk: evtChunk,
                                        evtBtnCancelClick: evtBtnCancelClick,
                                        evtSocketError: evtSocketError,
                                        "fileSize": 9,
                                        "timeout": 100
                                    });
                                    evtChunk.post(new Uint8Array([1, 2, 3]));
                                    evtChunk.post(new Uint8Array([4, 5, 6]));
                                    return [4 /*yield*/, mustReject({
                                            "promise": prDl.catch(function (error) {
                                                assert_1.assert(error instanceof lib_1.TimeoutEvtError);
                                                throw "";
                                            }),
                                            "expectedRejectedValue": "",
                                            "delay": 150
                                        })];
                                case 1:
                                    _b.sent();
                                    assert_1.assert((_a = [
                                        evtChunk,
                                        evtBtnCancelClick,
                                        evtSocketError
                                    ]).reduce.apply(_a, __spreadArray([], __read(reducers_1.every(function (evt) { return evt.getHandlers().length === 0; })))));
                                    return [2 /*return*/];
                            }
                        });
                    }); })()];
            case 5:
                _a.sent();
                console.log("PASS");
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=test62.js.map