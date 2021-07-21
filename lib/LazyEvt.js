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
//# sourceMappingURL=LazyEvt.js.map