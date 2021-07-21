"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPromiseAssertionApi = void 0;
var assert_1 = require("tsafe/assert");
var same_1 = require("../inDepth/same");
function getPromiseAssertionApi(params) {
    var is = !!params ? same_1.sameFactory(params).same : (function (o1, o2) { return o1 === o2; });
    function mustResolve(params) {
        var timer = setTimeout(function () { return assert_1.assert(false, "did not resolve in time"); }, params.delay !== undefined ? params.delay : 0);
        return params.promise.then(function (data) {
            clearTimeout(timer);
            if (!("expectedData" in params)) {
                return data;
            }
            assert_1.assert(is(data, params.expectedData), "Not equals expected value");
            return data;
        });
    }
    /** Must reject within delay ms*/
    function mustReject(params) {
        var timer = setTimeout(function () { return assert_1.assert(false, "did not reject in time"); }, params.delay !== undefined ? params.delay : 0);
        return params.promise.then(function () { return assert_1.assert(false, "resolved"); }, function (error) {
            clearTimeout(timer);
            if ("expectedRejectedValue" in params) {
                assert_1.assert(is(error, params.expectedRejectedValue));
            }
        });
    }
    function mustStayPending(p) {
        p
            .then(function () { return assert_1.assert(false, "Has fulfilled"); }, function () { return assert_1.assert(false, "has rejected"); });
    }
    return { mustResolve: mustResolve, mustReject: mustReject, mustStayPending: mustStayPending };
}
exports.getPromiseAssertionApi = getPromiseAssertionApi;
//# sourceMappingURL=getPromiseAssertionApi.js.map