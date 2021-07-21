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
//# sourceMappingURL=LazyStatefulEvt.js.map