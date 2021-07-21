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
var lib_1 = require("../lib");
var testing_1 = require("../tools/testing");
var getHandlerPr_1 = require("./getHandlerPr");
var _a = testing_1.getPromiseAssertionApi(), mustResolve = _a.mustResolve, mustReject = _a.mustReject;
var op = function (object) { return object instanceof Array; };
var boundTo = lib_1.Evt.newCtx();
var timeout = 10;
function mkCb(expect) {
    expect = __spreadArray([], __read(expect));
    var timer = setTimeout(function () { return console.assert(!expect.length); }, 2000);
    return function (object) {
        console.assert(expect.shift() === object);
        clearTimeout(timer);
    };
}
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = posts.filter(op);
    mustResolve({
        "promise": evt.attach(op, boundTo, timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = posts.filter(op);
    mustResolve({
        "promise": evt.attach(op, timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = posts.filter(op);
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evt, function () { return evt.attach(op, mkCb(expect)); }),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evt, function () { return evt.attach(mkCb(expect)); }),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": evt.attach(timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evt, function () { return evt.attach(boundTo, mkCb(expect)); }),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": evt.attach(boundTo, timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    mustReject({ "promise": evt.attach(op, timeout, function () { }), "delay": 3000 });
    posts.filter(function (object) { return !op(object); }).forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    mustReject({ "promise": evt.attach(op, boundTo, timeout, function () { }), "delay": 2000 });
    posts.filter(function (object) { return !op(object); }).forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    mustReject({ "promise": evt.attach(boundTo, timeout, function () { }), "delay": 2000 });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = posts.filter(op);
    mustResolve({
        "promise": evt.attachPrepend(op, boundTo, timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = posts.filter(op);
    mustResolve({
        "promise": evt.attachPrepend(op, timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = posts.filter(op);
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evt, function () { return evt.attachPrepend(op, mkCb(expect)); }),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evt, function () { return evt.attachPrepend(mkCb(expect)); }),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": evt.attachPrepend(timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evt, function () { return evt.attachPrepend(boundTo, mkCb(expect)); }),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": evt.attachPrepend(boundTo, timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    mustReject({
        "promise": evt.attachPrepend(op, timeout, function () { }),
        "delay": 2000
    });
    posts.filter(function (object) { return !op(object); }).forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    mustReject({ "promise": evt.attachPrepend(op, boundTo, timeout, function () { }), "delay": 2000 });
    posts.filter(function (object) { return !op(object); }).forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    mustReject({ "promise": evt.attachPrepend(boundTo, timeout, function () { }), "delay": 2000 });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = posts.filter(op);
    mustResolve({
        "promise": evt.attachOnce(op, boundTo, timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = posts.filter(op);
    mustResolve({
        "promise": evt.attachOnce(op, timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = posts.filter(op);
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evt, function () { return evt.attachOnce(op, mkCb([expect[0]])); }),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evt, function () { return evt.attachOnce(mkCb([expect[0]])); }),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": evt.attachOnce(timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evt, function () { return evt.attachOnce(boundTo, mkCb([expect[0]])); }),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": evt.attachOnce(boundTo, timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    mustReject({
        "promise": evt.attachOnce(op, timeout, function () { }),
        "delay": 2000
    });
    posts.filter(function (object) { return !op(object); }).forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    mustReject({ "promise": evt.attachOnce(op, boundTo, timeout, function () { }), "delay": 2000 });
    posts.filter(function (object) { return !op(object); }).forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    mustReject({ "promise": evt.attachOnce(boundTo, timeout, function () { }), "delay": 2000 });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = posts.filter(op);
    mustResolve({
        "promise": evt.attachOnce(op, boundTo, timeout, mkCb([expect[1]])),
        "expectedData": expect[1],
        "delay": 2000
    });
    mustResolve({
        "promise": evt.attachOnceExtract(op, boundTo, timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = posts.filter(op);
    mustResolve({
        "promise": evt.attachOnce(op, timeout, mkCb([expect[1]])),
        "expectedData": expect[1],
        "delay": 2000
    });
    mustResolve({
        "promise": evt.attachOnceExtract(op, timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = posts.filter(op);
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evt, function () { return evt.attachOnce(op, mkCb([expect[1]])); }),
        "expectedData": expect[1],
        "delay": 2000
    });
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evt, function () { return evt.attachOnceExtract(op, mkCb([expect[0]])); }),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evt, function () { return evt.attachOnce(mkCb([expect[1]])); }),
        "expectedData": expect[1],
        "delay": 2000
    });
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evt, function () { return evt.attachOnceExtract(mkCb([expect[0]])); }),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": evt.attachOnce(timeout, mkCb([expect[1]])),
        "expectedData": expect[1],
        "delay": 2000
    });
    mustResolve({
        "promise": evt.attachOnceExtract(timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evt, function () { return evt.attachOnce(boundTo, mkCb([expect[1]])); }),
        "expectedData": expect[1],
        "delay": 2000
    });
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evt, function () { return evt.attachOnceExtract(boundTo, mkCb([expect[0]])); }),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    var expect = __spreadArray([], __read(posts));
    mustResolve({
        "promise": evt.attachOnce(boundTo, timeout, mkCb([expect[1]])),
        "expectedData": expect[1],
        "delay": 2000
    });
    mustResolve({
        "promise": evt.attachOnceExtract(boundTo, timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });
    posts.forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    mustReject({
        "promise": evt.attachOnceExtract(op, timeout, function () { }),
        "delay": 2000
    });
    posts.filter(function (object) { return !op(object); }).forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    var posts = [[], [], [], "foo", {}, []];
    mustReject({ "promise": evt.attachOnceExtract(op, boundTo, timeout, function () { }), "delay": 2000 });
    posts.filter(function (object) { return !op(object); }).forEach(function (object) { return evt.post(object); });
})();
(function () {
    var evt = new lib_1.Evt();
    //evt.enableTrace("evt");
    mustReject({ "promise": evt.attachOnceExtract(boundTo, timeout, function () { }), "delay": 2000 });
})();
setTimeout(function () {
    console.log("PASS");
}, 2100);
//# sourceMappingURL=test22.js.map